import useCuisineApi from "../spoonacular.js";
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
                            <detail v-bind:recette="recetteSelected"> </detail>
                        </div>
                        
                    </div>
               </div>`,
    data : function () {
        return {
            recettes : [],
            noResults : false,
            recetteSelected : ""
        }},

    mounted: function() { // Sur le chargement de la page
        this.init()       // On lance l'init
    },

    methods: {
        init : function () { // Cet init permet d'afficher au chargement des recettes au hasard
            useCuisineApi.getRandom().then(recettesRandom => {
                this.recettes = recettesRandom.recipes;
            })
        },
        isNoResults: function (noRes) { // Si la recherche n'a pas donner de résultat
            this.recettes = "";
            this.noResults = noRes;

        },

        searchIsOver : function (recettes) { // Recherche par mots-clé (ingrédient, nom de plat, ...)
            this.recettes = recettes.results;
        },

        showMore : function (recette) { //
            this.recetteSelected = recette;
        }
    }
})
