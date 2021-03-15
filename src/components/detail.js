import useCuisineApi from "../spoonacular.js";
import useYoutubeApi from "../youtubeApi.js";

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
                            <tr> <td> Vin recommandé : </td> <td> {{wine.pairedWines}} </td></tr>
                       </tbody>
                </table>
                <iframe v-if="this.idVideo" width="560" height="315" src="https://www.youtube.com/embed/this.idVideo" 
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                </iframe>
            </div>`,
    data : function() {
        return {
            recetteCourante : "",
            wine : "",
            idVideo:"",
        }},
    updated: function() { // Sur le chargement de la page
        this.setRecette(this.recette);
        this.searchVideo(this.recette);
    },
    methods : {
        setRecette : function (recette) {
            useCuisineApi.getWinePairing(recette).then(r => {
                this.wine = r;

            }).catch(error => console.log(error));
            console.log(this.wine);
        },
        searchVideo : function (recette) {
            let query = [];
            let title = recette.title.split(" ");
            query.push(title)
            useYoutubeApi.searchOnMichelDumasChannel(query).then(r => {
                if(r.items.length > 0) {
                    this.idVideo = r.items[0].id.videoId;
                    console.log("Youtube result : ", r);
                    console.log("ID video", this.idVideo);
                }
            }).catch(error => console.log(error));
        }
    }
})
