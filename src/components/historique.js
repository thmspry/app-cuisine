Vue.component('historique', {
    props: {
        historique : {
            required: false,
            default: []
        },
    },
    template: `
    <div id="historique">
        <span v-for="recette in historique" v-bind:key="recette.id">{{recette.title}}<br></span>
    </div>
    `,
})
