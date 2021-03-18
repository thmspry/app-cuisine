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
                                            <input v-model="intolerances['dairy']" type="checkbox" id="dairy" class="filled-in"/>
                                            <span>Dairy</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerances['egg']" type="checkbox" id="egg" class="filled-in" />
                                            <span>Egg</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerances['gluten']" type="checkbox" id="gluten" class="filled-in" />
                                            <span>Gluten</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerances['grain']" type="checkbox" id="grain" class="filled-in"/>
                                            <span>Grain</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerances['peanut']" type="checkbox" id="peanut" class="filled-in" />
                                            <span>Peanut</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerances['seafood']" type="checkbox" id="seafood" class="filled-in" />
                                            <span>Seafood</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerances['sesame']" type="checkbox" id="sesame" class="filled-in" />
                                            <span>Sesame</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerances['shellfish']" type="checkbox" id="shellfish" class="filled-in" />
                                            <span>Shellfish</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerances['soy']" type="checkbox" id="soy" class="filled-in" />
                                            <span>Soy</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerances['sulfite']" type="checkbox" id="sulfite" class="filled-in" />
                                            <span>Sulfite</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerances['treeNut']" type="checkbox" id="treeNut" class="filled-in" />
                                            <span>Tree Nut</span>
                                        </label></p>
                                        <p><label>
                                            <input v-model="intolerances['wheat']" type="checkbox" id="wheat" class="filled-in" />
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
            keywords : "", // Les mots-clés

            // Les intolérance (par défaut, il y en a aucune de cochée)
            intolerances : { "dairy" : false, "egg" : false, "gluten" : false, "grain" : false, "peanut" : false, "seafood" : false,
                                "sesame" : false, "shellfish" : false, "soy" : false, "sulfite" : false, "treeNut" : false, "wheat" : false },
        }},
    mounted : function () {
      this.init();
    },
    methods : {
        init : function () {
            /*if(localStorage.getItem("intolerances") != null) {
                this.intolerances = localStorage.getItem("intolerances")
            }*/
            if(localStorage.getItem("keywords") != null) {
                this.keywords = localStorage.getItem("keywords")
            }
        },
        /**
         * Utilise la recherche par mots-clés et intolerances
         */
        search : function () {
            console.log("Les intolérance : ", this.intolerances)
            localStorage.setItem("keywords",this.keywords)
            //localStorage.setItem("intolerances",this.intolerances)
            let kw = this.keywords.split(" "); // Division de la string en array
            useCuisineApi.search(kw, this.intolerances)
                .then(r => {
                    this.$emit('search-event', r); // On revoie le résultat à l'app
                    //this.intolerance = [] // On reset la recherche
                    //this.keywords = ""; // On reset la recherche
                })
                .catch(error => console.log(error))
        }
    }


})
