import useCuisineApi from "../spoonacular.js";
import useYoutubeApi from "../youtubeApi.js";
Vue.component('app', {
    template: `<div id="app">
                    <div id="search-case">
                        <search @search-event="searchIsOver" > </search>
                    </div>
                    <div id="result">
                        <div v-if="this.noResult" id="no-result">
                            <p>Aucun résultats</p>
                        </div>
                    
                        <div id="recettes-apercu" class="grid-recettes">
                            <recette v-if="recettes" v-for="recette in recettes" v-bind:key="recette.id" v-bind:recette="recette" @showMore-event="showMore"> </recette>
                        </div>
                        
                        <div v-if="recetteSelected" id="details" class="side-result">
                            <detail v-bind:recette="recetteSelected" :wine="wine" :urlVideo="urlVideo" > </detail>
                        </div>
                        
                    </div>
               </div>`,
    data : function () {
        return {
            recettes : [],
            noResults : false,
            recetteSelected : "",
            wine : "",
            urlVideo:""
        }},

    mounted: function() { // Sur le chargement de la page
        this.init()       // On lance l'init
    },

    methods: {
        init : function () { // Cet init permet d'afficher au chargement des recettes au hasard
            //TODO changer init si local_storage possède des informations
            useCuisineApi.getRandom().then(recettesRandom => {
                this.recettes = recettesRandom.recipes;
            });
        },

        searchIsOver : function (recettes) { // Recherche par mots-clé (ingrédient, nom de plat, ...)
            this.recettes = recettes.results;
            this.noResults = recettes.results.length <= 0;
        },

        searchWine : function (recette) {
            useCuisineApi.getWinePairing(recette).then(r => {
                this.wine = r;
            }).catch(error => console.log("ERROR : search wine : " + error));
        },

        searchVideo : function (recette) {
            let query = recette.title.split(" ");

            useYoutubeApi.searchOnMichelDumasChannel(query).then(r => {
                this.urlVideo = "https://www.youtube.com/embed/" + r.items[0].id.videoId;
            }).catch(err => console.log("ERROR : search video : " + err))
        },

        showMore : function (recette) { //
            this.recetteSelected = recette;
            this.searchWine(this.recetteSelected);
            this.searchVideo(this.recetteSelected);

        }
    }
})
