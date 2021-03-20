import useCuisineApi from "../spoonacular.js";
import useYoutubeApi from "../youtubeApi.js";
Vue.component('app', {
    template: `<div id="app">
                    <div class="col s12">
                      <ul class="tabs">
                        <li class="tab col s3"><a class="active" href="#recettes">Recettes</a></li>
                        <li class="tab col s3"><a href="#historique">Historique</a></li>
                      </ul>
                    </div>
                    <div id="recettes" class="col s12">
                        <div id="search-case">
                            <search @search-event="searchIsOver" > </search>
                        </div>
                        <div id="result">
                            <div id="recettes-apercu" class="grid-recettes">
                                <recette v-if="recettes" v-for="recette in recettes" v-bind:key="recette.id" v-bind:recette="recette" @showMore-event="showMore"> </recette>
                            </div>

                            <div id="details">
                                <detail v-bind:recette="recetteSelected" :wine="wine" :urlVideo="urlVideo" 
                                :recetteSimilaire="recetteSimilaire" :widgetEquipment="widgetEquipment"
                                @showMorebyId-event="showMorebyId"> </detail>
                            </div>
                        </div>
                    </div>
                    <div id="historique" class="col s12">
                        <historique v-if="historiqueRecette" v-bind:historique="historiqueRecette"></historique>
                    </div>
               </div>`,
    data : function () {
        return {
            recettes : [],
            recetteSelected : "",
            historiqueRecette : [],
            wine : "",
            urlVideo : "",
            recetteSimilaire : [],
            widgetEquipment : "",
        }},

    mounted: function() { // Sur le chargement de la page
        this.init()       // On lance l'init
    },

    methods: {
        init : function () { // Cet init permet d'afficher au chargement des recettes au hasard
            useCuisineApi.getRandom()
                .then(recettesRandom => {
                this.recettes = recettesRandom.recipes;
            })
                .catch(error => console.log(error));
            if(localStorage.getItem("historique") != null) {
                this.historiqueRecette = JSON.parse(localStorage.getItem('historique'))
            }
        },

        searchIsOver : function (recettes) { // La recherche est finie
            this.recettes = recettes.results; // On met a jour l'affichage des recettes
        },

        searchWine : function (recette) { // Cherche un vin
            useCuisineApi.getWinePairing(recette)
                .then(r => {this.wine = r})
                .catch(error => console.log("ERROR : search wine : ", error));
        },
        searchVideo : function (recette) { // Cherche une video
            let query = recette.title.split(" "); // On récupère le titre de la recette, mot par mot dans un array
            useYoutubeApi.searchOnMichelDumasChannel(query).then(id => { // On cherche une vidéo correspondante
                this.urlVideo = "https://www.youtube.com/embed/" + id // Le lien pour l'iframe
            }).catch(err => console.log("ERROR : search video : ", err))
        },
        searchWidget : function (recetteID) { // Cherche les ustensiles
            useCuisineApi.getWidgetEquipment(recetteID)
                .then(response => {
                    this.widgetEquipment = response;
                })
                .catch(error => console.log({"ERROR : search Widget":error}))
        },
        searchMoreRecipe : function (recetteID) {// Cherche les recettes similaires
            useCuisineApi.searchSimilarRecipe(recetteID)
                .then(response => {
                    this.recetteSimilaire = response
                })
                .catch(error => console.log({"ERROR : search Widget":error}))

        },

        /**
         * Au clic sur showMore du recette, les data sont mise a jour par rapport a la recette selectionnée
         * La fonction est async pour attendre l'appel aasyn de getRecipeById
         * @param recette : recette selectionnée
         * @returns {Promise<void>}
         */
        showMore : async function (recette) {

            // On reset les caractéristique pour être sûr
            this.wine = [];
            this.urlVideo = "";
            this.widgetEquipment = "";
            this.recetteSimilaire = "";

            if (recette.analyzedInstructions === undefined) {
                await useCuisineApi.getRecipeById(recette.id)   // On va donc cherche l'objet complet avec la méthode
                    .then(recette => this.recetteSelected = this.getRecettePropre(recette))
                    .catch(error => console.log({"ERROR : showMore":error}));
            } else {
                this.recetteSelected = this.getRecettePropre(recette)
            }

            if (this.recetteSelected !== null) {
                let histoID = this.historiqueRecette.map(recette => recette.id)
                if (histoID.find(id => id === this.recetteSelected.id) === undefined) {
                    this.historiqueRecette.push(this.recetteSelected);
                    let json = JSON.stringify(this.historiqueRecette);
                    localStorage.setItem("historique", json)
                }
                // On cherche les infos complémentaires des api grace a la recette courante
                //this.historiqueStorage(this.recetteSelected);
                this.searchWine(this.recetteSelected);
                this.searchVideo(this.recetteSelected);
                this.searchWidget(this.recetteSelected.id);
                this.searchMoreRecipe(this.recetteSelected.id);
            }
            },

        /**
         * Ouverture des détail d'une recette à partir du click sur une recette similaire dans détail
         * @param recetteID : l'id de la recette
         */
        showMorebyId : async function (recetteID) {
            await useCuisineApi.getRecipeById(recetteID)
                .then(recette => {
                    this.recetteSelected = this.getRecettePropre(recette);
                })
                .catch(error => console.log({"ERROR : showMorebyId":error}));
            if (this.recetteSelected !== null) {
                let histoID = this.historiqueRecette.map(recette => recette.id)
                if (histoID.find(id => id === this.recetteSelected.id) === undefined) {
                    this.historiqueRecette.push(this.recetteSelected);
                    let json = JSON.stringify(this.historiqueRecette);
                    localStorage.setItem("historique", json)
                }
                // On cherche les infos complémentaires des api grace a la recette courante
                this.searchWine(this.recetteSelected);
                this.searchVideo(this.recetteSelected);
                this.searchWidget(this.recetteSelected.id);
                this.searchMoreRecipe(this.recetteSelected.id);
            }
        },
        /**
         * Cette fonction retourne une version simplifié de la recette obtenu par l'API, on ne garde en mémoire que les éléments qui nous intéresse pour éviter de surcharger l'application
         * et enregistrer des informations inutiles dans le tableau de recette stocké dans localStorage
         * @param recette
         * @returns {{image: *, veryHealthy, glutenFree, veryPopular, vegan, extendedIngredients, cheap, title: *, aggregateLikes, cuisines, vegetarian, weightWatcherSmartPoints, id}}
         */
        getRecettePropre : function (recette) {
            let recettePropre = "";
            recettePropre = { //Ici on récupère uniquement les attributs qui nous intéresse pour notre application
                id:recette.id,
                image:recette.image,
                cuisines:recette.cuisines,
                extendedIngredients:recette.extendedIngredients,
                cheap:recette.cheap,
                glutenFree:recette.glutenFree,
                veryPopular:recette.veryPopular,
                veryHealthy:recette.veryHealthy,
                vegetarian:recette.vegetarian,
                vegan:recette.vegan,
                title:recette.title,
                aggregateLikes:recette.aggregateLikes,
                weightWatcherSmartPoints:recette.weightWatcherSmartPoints,
            }
            if (recette.analyzedInstructions.length === 0) {
                recettePropre.instructions = null;
            } else {
                recettePropre.instructions = recette.analyzedInstructions[0].steps;
            }

            return recettePropre;
        }
    }
})
