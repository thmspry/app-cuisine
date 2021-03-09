import useCuisineApi from "../spoonacular.js";

Vue.component('search', {
    template: `<form @submit.prevent="cherche">
                    <input v-model="searchRequest" id="input-bar" type="text" placeholder="Que voulez-vous manger ?"/>
                    <input type="submit" value="SEARCH" class="btn"/>
                </form>`,
    data : function() {
        return {
            searchRequest : ""
        }},
    methods : {
        cherche : function () {
            console.log("oui");
            useCuisineApi.bySearch(this.searchRequest)
                .then(r => {
                    this.$emit('search-event', r);
                })
                .catch(error => console.log(error))
        }
    }


})
