Vue.component('app', {
    template: `<div id="app">
                    <div id="search-case">
                        <search @search-event="searchIsOver"> </search>
                    </div>
                    <div id="result">
                        <div id="filter" class="side-result">
                            <filter></filter>
                        </div>
                        
                        <div id="recettes-apercu" class="grid">
                            <recette v-for="recette in recettes" v-bind:recette="recette" @showMore-event="movieSelected"> </recette>
                        </div>
                        
                        <div id="details" class="side-result">
                            <detail></detail>
                        </div>
                    </div>
               </div>`,
    data : function () {
        return {
            recettes : []
        }},
    methods: {
        searchIsOver : function (recettes) {
            this.recettes = recettes.results;
            console.log(recettes)
        }
    }
})
