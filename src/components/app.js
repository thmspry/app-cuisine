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
                            :instructions="instructionRecettes" :recetteSimilaire="recetteSimilaire" :widgetEquipment="widgetEquipment"> </detail>
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

        searchIsOver : function (recettes) { // La recherche pest finie
            this.recettes = recettes.results; // On met a jour l'affichage des recettes
            //this.noResults = recettes.results.length <= 0;

        },

        searchWine : function (recette) { // Cherche un vin
            useCuisineApi.getWinePairing(recette)
                .then(r => {this.wine = r})
                .catch(error => console.log("ERROR : search wine : ", error));
        },
        searchVideo : function (recette) { // Cherche une video
            let query = recette.title.split(" "); // On récupère le titre de la recette, mot par mot dans un array
            useYoutubeApi.searchOnMichelDumasChannel(query).then(r => { // On cherche une vidéo correspondante
                this.urlVideo = "https://www.youtube.com/embed/" + r.items[0].id.videoId; // Le lien pour l'iframe
            }).catch(err => console.log("ERROR : search video : ", err))
        },
        searchWidget : function (recetteID) {
            useCuisineApi.getWidgetEquipment(recetteID)
                .then(response => {
                    this.widgetEquipment = response;
                })
                .catch(error => console.log({"ERROR : search Widget":error}))
        },
        searchMoreRecipe : function (recetteID) {
            useCuisineApi.searchSimilarRecipe(recetteID)
                .then(response => {
                    this.recetteSimilaire = response
                })
                .catch(error => console.log({"ERROR : search Widget":error}))

        },
        showMore : function (recette) { // Au clic sur showMore
            this.recetteSelected = recette; // La recette qu'on selectionne grâce au showMore
            console.log("Recette courante : ", this.recetteSelected)
            this.instructionRecettes = recette.analyzedInstructions[0].steps; // Ses instruction
            // On cherche les infos complémentaires des api grace a la recette courante
            this.searchWine(this.recetteSelected);
            this.searchVideo(this.recetteSelected);
            this.searchWidget(this.recetteSelected.id);
            this.searchMoreRecipe(this.recetteSelected.id);
        }
    }
})
