import useCuisineApi from "../spoonacular.js";
import useYoutubeApi from "../youtubeApi.js";
Vue.component('app', {
    template: `<div id="app">
                    <div id="search-case">
                        <search @search-event="searchIsOver" > </search>
                    </div>
                    <div id="result">
                    
                        <div id="recettes-apercu" class="grid-recettes">
                            <recette v-if="recettes" v-for="recette in recettes" v-bind:key="recette.id" v-bind:recette="recette" @showMore-event="showMore"> </recette>
                        </div>
                        
                        <div id="details">
                            <detail v-bind:recette="recetteSelected" :wine="wine" :urlVideo="urlVideo" 
                            :instructions="instructionRecettes" :recetteSimilaire="recetteSimilaire" :widgetEquipment="widgetEquipment"
                            @showMorebyId-event="showMorebyId"> </detail>
                        </div>
                        
                    </div>
               </div>`,
    data : function () {
        return {
            recettes : [],
            recetteSelected : "",
            wine : "",
            urlVideo : "",
            instructionRecettes : "",
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

            this.recetteSelected = recette; // La recette qu'on selectionne grâce au showMore

            // Si la recette est selectionée suite à une recherche, l'objet ne comporte pas d'instruction de réalisation de la recette
            if (recette.analyzedInstructions === undefined) {
                await useCuisineApi.getRecipeById(recette.id)   // On va donc cherche l'objet complet avec la méthode
                    .then(recette => this.recetteSelected = recette)
                    .catch(error => console.log({"ERROR : showMore":error}));
            }
            console.log("Recette courante : ", this.recetteSelected)

            // Les instruction sont stockée a part du l'objet recetteSelected car l'objet est mal fait (array analyzedInstructions)
            this.instructionRecettes = this.recetteSelected.analyzedInstructions[0].steps;
            if (this.recetteSelected.analyzedInstructions.length !== 0) { // dans le cas où la recette ne possède pas de liste d'instruction
                this.instructionRecettes = this.recetteSelected.analyzedInstructions[0].steps; // Ses instruction
            } else {
                this.instructionRecettes = null
            }
            // On cherche les infos complémentaires des api grace a la recette courante
            this.searchWine(this.recetteSelected);
            this.searchVideo(this.recetteSelected);
            this.searchWidget(this.recetteSelected.id);
            this.searchMoreRecipe(this.recetteSelected.id);
        },

        /**
         * Ouverture des détail d'une recette à partir du click sur une recette similaire dans détail
         * @param recetteID : l'id de la recette
         */
        showMorebyId : function (recetteID) {

            useCuisineApi.getRecipeById(recetteID)
                .then(recette => {
                    this.recetteSelected = recette;
                    console.log("Recette courante : ", this.recetteSelected)
                    this.instructionRecettes = recette.analyzedInstructions[0].steps; // Ses instructions

                    // On cherche les infos complémentaires des api grace a la recette courante
                    this.searchWine(this.recetteSelected);
                    this.searchVideo(this.recetteSelected);
                    this.searchWidget(this.recetteSelected.id);
                    this.searchMoreRecipe(this.recetteSelected.id);

                })
                .catch(error => console.log({"ERROR : getRecipeById":error}))
        }
    }
})
