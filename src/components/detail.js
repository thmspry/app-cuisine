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
                <div id="table">
                    <table class="striped">
                           <tbody>
                                <tr> <td> Nom : </td> <td> {{recette.title}} </td></tr>
                                <tr> <td> Vin recommandé : </td> <td> {{wine.pairedWines}} </td></tr>
                           </tbody>
                    </table>
                </div>
                <div id="video-yt" v-if="srcVideo">
                    <iframe width="560" height="315" :src="srcVideo" 
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                    <span>Vidéo de suggestion</span>
                </div>
                
                
                
            </div>`,
    data : function() {
        return {
            recetteCourante : "",
            wine : "",
            srcVideo :"",
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
                    this.srcVideo = "https://www.youtube.com/embed/" + r.items[0].id.videoId;
                    console.log("ID video", this.srcVideo);
                }
            }).catch(error => console.log(error));
        }
    }
})
