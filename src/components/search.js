import useCuisineApi from "../spoonacular.js";

Vue.component('search', {
    template: `
                    <div >
                        <div class="col s12" id="onglets">
                            <ul class="tabs">
                                <li class="tab col s3"><a class="active" href="#keywords">Recherche par mots clés (nom, ingrédients)</a></li>
                                <li class="tab col s3"><a href="#intolerance">Recherche par intolérance</a></li>
                            </ul>
                        </div>
                        <div id="keywords" class="col s12">
                            <form @submit.prevent="searchKeyword">
                                <input v-model="keywords" type="text" placeholder="Que voulez-vous manger (pie, apples) ?"/>
                                <input type="submit" value="SEARCH" class="btn enter-button"/>
                            </form>
                        </div>
                        <div id="intolerance" class="col s12">
                            <form @submit.prevent="searchIntolerance" class="checkboxes">
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
                                <input type="submit" value="SEARCH" class="btn enter-button"/>
                            </form>
                        </div>
                    </div>                 
                `,
    data : function() {
        return {
            keywords : "",
            intolerance : [],
            noResult : false
        }},
    methods : {
        searchKeyword : function () {
            if (this.keywords.length > 0) {
                this.noResult = false;
                let kw = this.keywords.split(" ");
                useCuisineApi.bySearch(kw)
                    .then(r => {
                        this.$emit('searchKeyword-event', r, this.noResult);
                        this.keywords = "";
                    })
                    .catch(error => console.log(error))
            } else {
                this.noResult = true;
                this.$emit('noResult-event', this.noResult);
            }
        },
        searchIntolerance : function () {
            useCuisineApi.byIntolerances(this.intolerance)
                .then(r => {
                    this.$emit('searchIntolerance-event', r);
                })
                .catch(error => console.log(error))
        }
    }


})
