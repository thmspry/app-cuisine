import useCuisineApi from "../spoonacular.js";

Vue.component('detail', {
    props: {
        recette : {
            required: false,
            default: 0
        }
    },
    template: `
            <div>
                <p> Détails </p>
                <table class="striped">
                       <tbody>
                            <tr> <td> Nom : </td> <td> {{recette.title}} </td></tr>
                            <tr> <td> Nom : </td> <td> {{wine.pairedWines}} </td></tr>
                       </tbody>
                </table>
            </div>`,
    data : function() {
        return {
            recetteCourante : "",
            wine : ""
        }},
    updated: function() { // Sur le chargement de la page
        this.setRecette(this.recette);
    },
    methods : {
        setRecette : function (recette) {
            useCuisineApi.getWinePairing(recette).then(r => {
                this.wine = r;
            }).catch(error => console.log(error));
            console.log(this.wine);
        }
    }
})
