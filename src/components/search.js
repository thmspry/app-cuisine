import useCuisineApi from "../spoonacular.js";

Vue.component('search', {
    template: `
                <div id="search" class="col s12">
                    <form @submit.prevent="search">
                        <ul class="collapsible">
                            <li>
                                <div class="collapsible-header" id="intolerances-title">
                                    <img src="assets/image/dropdown.svg" alt="dérouler" id="arrow">
                                    <p>Selectionner des intolérances</p>
                                </div>
                                <div class="collapsible-body">
                                    <div class="checkboxes">
                                        <p><label>
                                            <input v-model="intolerance['dairy']" type="checkbox" class="filled-in"/>
                                            <span>Dairy</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerance['egg']" type="checkbox" class="filled-in" />
                                            <span>Egg</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerance['gluten']" type="checkbox" class="filled-in" />
                                            <span>Gluten</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerance['grain']" type="checkbox" class="filled-in"/>
                                            <span>Grain</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerance['peanut']" type="checkbox" class="filled-in" />
                                            <span>Peanut</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerance['seafood']" type="checkbox" class="filled-in" />
                                            <span>Seafood</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerance['sesame']" type="checkbox" class="filled-in" />
                                            <span>Sesame</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerance['shellfish']" type="checkbox" class="filled-in" />
                                            <span>Shellfish</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerance['soy']" type="checkbox" class="filled-in" />
                                            <span>Soy</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerance['sulfite']" type="checkbox" class="filled-in" />
                                            <span>Sulfite</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerance['treeNut']" type="checkbox" class="filled-in" />
                                            <span>Tree Nut</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerance['wheat']" type="checkbox" class="filled-in" />
                                            <span>Wheat</span>
                                        </label></p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <input v-model="keywords" type="text" placeholder="Que voulez-vous manger (pie, apples) ?"/>
                        <input type="submit" value="SEARCH" class="btn enter-button"/>
                    </form>
                </div>                
                `,
    data : function() {
        return {
            keywords : "", // Les mots-clés de la recherche par mots-clés
            intolerance : [], // Les intolérance de la recherche par intolérance
            noResult : false // Determine s'il n'y a pas de résultat
        }},
    methods : {
        /**
         * Utilise la recherche par mots-clés et intolerances
         */
        search : function () {
            let kw = this.keywords.split(" "); // Division de la string en array
            useCuisineApi.search(kw, this.intolerance)
                .then(r => {
                    this.$emit('search-event', r); // On revoie le résultat à l'app
                    //this.intolerance = [] // On reset la recherche
                    this.keywords = ""; // On reset la recherche
                })
                .catch(error => console.log(error))
        }
    }


})
