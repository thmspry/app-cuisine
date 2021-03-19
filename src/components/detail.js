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
        },
        instructions : {
            required: false,
            default: []
        },
        recetteSimilaire : {
            required : false,
            default: []
        },
        widgetEquipment : {
            required : false,
            default : ""
        }
    },
    template: `
            <div id="modal-detail" class="modal">
                <div class="modal-content">
                    <p> {{recette.title}}</p>
                    <div class="details-text">
                        <tbody>
                            <tr> <td>Vin recommandé : </td> <td> <span v-if="wine.pairedWines"><span v-for="w in wine.pairedWines">{{w}}, </span></span> 
                                                                 <span v-else>Pas de vin(s) disponible(s)</span>
                                                            </td>
                            </tr>
                            <tr> <td>Ingredients : </td> <td> <span v-for="ing in recette.extendedIngredients">{{ing.name}} ({{ing.measures.metric.amount}} {{ing.measures.metric.unitShort}}), </span> </td></tr>
                            <tr> <td>Note : </td> <td> {{recette.aggregateLikes}}</td></tr>
                            <tr> <td>Weight Watcher Smart Points : </td> <td> {{recette.weightWatcherSmartPoints}}</td></tr>
                            <tr> <td>Caractèristiques : </td> <td> 
                                                        <span v-if="recette.cheap">Pas cher, </span>
                                                        <span v-else>Cher, </span>
                                                        <span v-if="recette.glutenFree">sans gluten, </span>
                                                        <span v-else>avec gluten, </span>
                                                        <span v-if="recette.veryPopular">populaire, </span>
                                                        <span v-else>peu populaire, </span>
                                                        <span v-if="recette.veryHealthy">bon pour la santé, </span>
                                                        <span v-else>pas très sain, </span>
                                                        <span v-if="recette.vegetarian">végétarien, </span>
                                                        <span v-else>non végétarien, </span>
                                                        <span v-if="recette.vegan">vegan.</span>
                                                        <span v-else>non vegan.</span>       
                                            </td></tr>
                            <tr> <td>Équipement nécessaire :</td>
                                <td>
                                    <div v-html="widgetEquipment"></div>
                                </td>
                            </tr>
                        </tbody>
                        
                        <div id="instructions">
                            <p>Instructions : </p>
                            <div v-if="instructions" v-for="instruction in instructions" v-bind:key="instruction.number" class="instruction-solo">
                                <span class="step-number">{{instruction.number}}</span>
                                <span class="step-instruction">{{instruction.step}}</span>
                            </div>
                            <span v-else>Pas d'instructions</span>
                            <div id="image">
                                <img id="img1" src="assets/image/camera.png">
                                <img id="img2" :src="recette.image">
                           </div>
                            </div>
                    </div>
                    <div class="video-result" id="video-yt" v-if="urlVideo">
                        <iframe width="560" height="600" :src="urlVideo" 
                                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                        </iframe>
                        <span>Vidéo de suggestion</span>
                    </div>
                    <span class="video-result" v-else>Aucune vidéo disponible pour cette recette</span>
                    
                    <div class="grid-similaire" v-if="recetteSimilaire">Autres recommandations de recettes similaires :<br>
                        <div class="recette-simi" v-for="recette in recetteSimilaire" > 
                            <a @click="showMorebyId(recette.id)" href="#modal-detail">{{recette.title}}</a>  
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                  <a href="#!" class="modal-close waves-effect waves-green btn-flat">Fermer</a>
                </div>
            </div>`,

    methods: {
        showMorebyId : function (recetteID) {
             this.$emit('showMorebyId-event', recetteID)
        }
    },
})
