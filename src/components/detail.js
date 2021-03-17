
Vue.component('detail', {
    props: {
        recette : {
            required: false,
            default: ""
        },
        wine : {
            required: false,
            default: ""
        },
        urlVideo : {
            required: false,
            default: ""
        }
    },
    template: `
            <div>
                <p> Détails </p>
                <div id="table">
                    <table class="striped">
                           <tbody>
                                <tr> <td> Nom : </td> <td> {{recette.title}} et l'url : {{urlVideo}}</td></tr>
                                <tr> <td> Description : </td> <td> {{recette.summary}} </td></tr>
                                <tr> <td> Vin recommandé : </td> <td> {{wine.pairedWines}} </td></tr>
                           </tbody>
                    </table>
                </div>
                <div id="video-yt" v-if="urlVideo">
                    <iframe width="560" height="315" :src="urlVideo" 
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                    <span v-if="urlVideo">Vidéo de suggestion</span>
                </div>
            </div>`,
    data : function() {
        return {
            recetteCourante : "",
            srcVideo :"",
            noVideo : false
        }},
    updated: function() { // A chaque showMore
    },
    methods : {

    }
})
