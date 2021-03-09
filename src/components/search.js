import useCuisineApi from "../spoonacular.js";

Vue.component('search', {
    template: `
                    <div>
                        <div class="col s12">
                            <ul class="tabs">
                                <li class="tab col s3"><a class="active" href="#keywords">Mot clés</a></li>
                                <li class="tab col s3"><a href="#intolerance">Intolérance</a></li>
                            </ul>
                        </div>
                        <div id="keywords" class="col s12">
                            <form @submit.prevent="cherche">
                                <input v-model="searchRequest" id="input-bar" type="text" placeholder="Que voulez-vous manger (pie, apples) ?"/>
                                <input type="submit" value="SEARCH" class="btn"/>
                            </form>
                        </div>
                        <div id="intolerance" class="col s12">
                            <form @submit.prevent="cherche">
                                <p>
                                    <label>
                                        <input v-model="aaa" type="checkbox" class="filled-in" checked="checked" />
                                        <span>Truc</span>
                                    </label>
                                    <input type="submit" value="SEARCH" class="btn"/>
                                </p>
                            </form>
                        </div>
                    </div>                 
                `,
    data : function() {
        return {
            searchRequest : "",
            aaa : false
        }},
    methods : {
        cherche : function () {
            console.log(this.aaa)
            useCuisineApi.bySearch(this.searchRequest)
                .then(r => {
                    this.$emit('search-event', r);
                })
                .catch(error => console.log(error))
        }
    }


})
