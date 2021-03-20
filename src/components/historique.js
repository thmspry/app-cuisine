Vue.component('historique', {
    props: {
        historique : {
            required: false,
            default: []
        },
    },
    template: `
    <div id="historique">
        <a v-if="historique" @click="showMore(recette)" class="recette-historique modal-trigger" href="#modal-detail" v-for="recette in historique" v-bind:key="recette.id">
                <div class="details-historique">
                    <p class="title-historique">{{recette.title}}</p>
                    <p v-html="recette.summary"></p>
                </div>
                <img :src="recette.image" alt="aperçu de la recette">
        </a>
        
        <p v-else>Votre historique est vide</p>
    </div>
    `,
    methods : {
        showMore : function (recette) {

            recette.propre = true;
            console.log("La recette cliquée dans historique : ", recette)
            this.$emit('showMore-event', recette);
        }
    }
})
