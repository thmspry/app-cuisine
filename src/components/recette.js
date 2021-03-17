Vue.component('recette', {
    props: ["recette"],
    template: `
    <div class="col s12 m6">
      <div class="card large">
        <div class="card-image">
            <img :src="recette.image" :alt="recette.title">
            <span class="card-title"></span>
        </div>
   
        <div class="card-content">
            <p> {{recette.title}} </p>
        </div>
        <div class="card-action">
            <a @click="showMore(recette)" class="waves-effect waves-light btn modal-trigger" href="#modal-detail">show more</a>
        </div>
      </div>
    </div>`,
    methods : {
        showMore : function (recette) {
            this.$emit('showMore-event', recette);
        }
    }

})
