
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
        }
    },
    template: `
            <div id="modal-detail" class="modal">
                <div class="modal-content">
                    <p> {{recette.title}}</p>
                    <div class="details-text">
                        <tbody>
                            <tr> <td>Vin recommandé : </td> <td> <span v-if="wine.pairedWines">{{wine.pairedWines}}</span> 
                                                                 <span v-else>Pas de vin(s) disponible(s)</span>
                                                                 </td></tr>
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
                        </tbody>
                        
                        <div id="instructions">
                            <p>Instructions : </p>
                            <instruction v-if="instructions" v-for="instruction in instructions" v-bind:key="instruction.number" v-bind:instruction="instruction"></instruction>
                            <span v-else>Pas d'instruction</span>
                        </div>
                    </div>
                    
                    <div id="video-yt" v-if="urlVideo">
                        <iframe width="560" height="315" :src="urlVideo" 
                                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                        </iframe>
                        <span>Vidéo de suggestion</span>
                    </div>
                    <span v-else>Aucune vidéo disponible pour cette recette</span>
                </div>
                <div class="modal-footer">
                  <a href="#!" class="modal-close waves-effect waves-green btn-flat">Fermer</a>
                </div>
            </div>`,
    updated : function () {
        console.log("Je suis UPDATED");
        },
    data : function() {
        return {
            recetteCourante : "",
            srcVideo :"",
        }
        },
})
