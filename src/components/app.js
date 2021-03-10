Vue.component('app', {
    template: `<div id="app">
                    <div id="search-case">
                        <search @searchKeyword-event="searchKeywordIsOver" @noResult-event="isNoResults" @searchIntolerance-event="searchIntoleranceIsOver" > </search>
                    </div>
                    <div id="result">
                        <div v-if="this.noResult" id="no-result">
                            <p>Aucun résultats</p>
                        </div>
                    
                        <div id="recettes-apercu" class="grid-recettes">
                            <recette v-for="recette in recettes" v-bind:key="recette.id" v-bind:recette="recette"> </recette>
                        </div>
                        
                        <div id="details" class="side-result">
                            <detail> </detail>
                        </div>
                        
                    </div>
               </div>`,
    data : function () {
        return {
            recettes : [],
            noResults : false
        }},
    methods: {
        isNoResults: function (noRes) {
            this.recettes = "";
            this.noResults = noRes;
            console.log(this.noResults);
        },
        searchKeywordIsOver : function (recettes, noRes) {
            this.recettes = recettes.results;
            this.noResults = noRes;
            console.log(this.noResults);
        },

        searchIntoleranceIsOver : function (recettes) {
            this.recettes = recettes.results;
            console.log(recettes)
        }
    }
})
