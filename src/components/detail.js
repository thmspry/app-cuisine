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
                    <span v-if="noVideo == false">Vidéo de suggestion</span>
                    <span v-if="noVideo == true">Pas de vidéo disponible sur la chaine Chef Michel Dumas</span>
                </div>
                
                
                
            </div>`,
    data : function() {
        return {
            recetteCourante : "",
            wine : "",
            srcVideo :"",
            noVideo : false
        }},
    updated: function() { // A chaque showMore
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
            console.log("Search");
            let query = [];

            let title = recette.title.split(" ");
            for(let i=0; i<title.length;i++) {
                query.push(title[i])
            }

            useYoutubeApi.searchOnMichelDumasChannel(query).then(r => {
                this.srcVideo = "https://www.youtube.com/embed/" + r.items[0].id.videoId;
                console.log("ID video", this.srcVideo);
                this.noVideo = false;
                this.noVideo = true;
                console.log("Video ? ", this.noVideo)
            }).catch(error => console.log(error));
        }
    }
})
