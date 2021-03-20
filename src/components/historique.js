Vue.component('historique', {
    props: {
        historique : {
            required: false,
            default: []
        },
    },
    template: `
    <div id="historique">
        <div class="recette-historique" v-for="recette in historique" v-bind:key="recette.id">
            <div class="details-historique">
                <p class="title-historique">{{recette.title}}</p>
                <p v-html="recette.summary"></p>
            </div>
            <img :src="recette.image" alt="aperçu de la recette">
        </div>
    </div>
    `,
})
