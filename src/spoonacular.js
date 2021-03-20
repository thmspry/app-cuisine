//const API_KEY = '6d0524f3b17449c4bf5203390f8d3100'
const API_KEY = 'a4aa01c0da0e4a81b3e120771779e4bf'
//const API_KEY = 'ace5cda7746e49d9b4ae20ae6f34f9eb'

const useCuisineApi = {

    /**
     * Cherche une recette par mots-clés et intolérances
     * @param keywords : string[] de mot clé (ingrédients, noms de plat, pays, ...)
     * @param intolerancesAssociatif : string[] qui associe des noms d'ingrédient à un boolean.
     * @returns {Promise<unknown>} : La promesse comportant le résultat de la requette
     */
    search: (keywords, intolerancesAssociatif) => new Promise((resolve, reject) => {
        let baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=`;
        baseUrl += keywords[0];
        keywords.shift();  // Retire le premier mot-clé du tableau, car il est déjà utilisée au dessus
        keywords.forEach(word => {
            baseUrl += ",+" + word; // Le séparateur entre chaque valeur est le ,+
        });

        let intolerances = [];
        for(var key in intolerancesAssociatif) {
            if(intolerancesAssociatif[key]) { //  Si l'intolérance à été cochée (=true)
                intolerances.push(key); // On stocke les nom des intolérances voulues
            }
        }
        baseUrl += "&intolerances=" + intolerances[0];
        intolerances.shift(); //Retire la première intolérance du tableau, car elle est déjà utilisée au dessus
        intolerances.forEach(into => {
            baseUrl += ",+" + into;
        });

        baseUrl += `&number=9`; // On veux au max 9 rectte pour l'affichage

        // Envoi
        fetch(baseUrl).
        then((response) => response.json()).
        then(data => {
            resolve(data);
        }).
        catch(error => reject(error));
    }),

    /**
     * Donne 9 recettes au hasard parmi les données de Spoonacular
     * @returns {Promise<unknown>} : La promesse comportant le résultat de la requette
     */
    getRandom: () => new Promise((resolve, reject) => {
        const randomRecettes= `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=9`;
        fetch(randomRecettes)
            .then((response) => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    }),

    /**
     * Donne un vins qui se marie bien avec la recette
     * @param recette : Recette (objet recette)
     * @returns {Promise<unknown>} : La promesse comportant le résultat de la requette
     */
    getWinePairing : (recette) => new Promise((resolve, reject) => {
        const wineUrl = `https://api.spoonacular.com/food/wine/pairing?apiKey=${API_KEY}&food=`;

        let cuisine = recette.cuisines;         // Le type de cuisine de la recette (Mediterranean, European, ...)
        let ingredients = recette.extendedIngredients; // Les ingrédients de la recette

        if(cuisine.length > 0) {    // Si la recette comporte au moins 1 type de cuisine
            let food = cuisine[0];  // On choisi la première pour la requette
            if (cuisine.length === 1){
                food = cuisine[0]
            } else if (cuisine.length > 1) {
                cuisine = cuisine.filter(cuisine => cuisine !== "Mediterranean" && cuisine !== "European");
                food = cuisine[0] // On choisi que les Mediterranean ou European
            }
            else if (cuisine.length < 1) {
                food = ingredients[0] // Sinon, on fait la recherche à partir du premier ingrédient
            }

            if (food.includes(" ")) { // Si le mot de la requette comporte un espace
                food.replace(" ", "%20"); // On le remplace par l'équivalent de l'espace dans un URL
            }

            fetch(wineUrl+food)
                .then((response) => response.json())
                .then(data => {
                    if (data.status !== "failure") {
                        resolve(data)
                    }
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        }
    }),

    /**
     * Donne les équipement nécessaire à la préparation de la recette
     * @param recetteID : string l'ID Spoonacular de la recette
     * @returns {Promise<unknown>} : La promesse comportant le résultat de la requette
     */
    getWidgetEquipment : (recetteID) => new Promise((resolve, reject) => {
        const WidgetEquipmentUrl = `https://api.spoonacular.com/recipes/${recetteID}/equipmentWidget?apiKey=${API_KEY}`
        fetch(WidgetEquipmentUrl)
            .then((response) => resolve(response.text()))
            .catch(error => reject(error));
    }),

    /**
     * Donne des recette similaire à la recette
     * @param recetteID : string l'ID Spoonacular de la recette
     * @returns {Promise<unknown>} : La promesse comportant le résultat de la requette
     */
    searchSimilarRecipe : (recetteID) => new Promise((resolve, reject) => {
        const searchSimilarUrl = `https://api.spoonacular.com/recipes/${recetteID}/similar?apiKey=${API_KEY}`
        fetch(searchSimilarUrl)
            .then((response) => response.json())
            .then(data => {
                if (data.status !== "failure") {
                    resolve(data);
                }
            })
            .catch(error => reject(error))
    }),

    /**
     * Donne un objet recette comportant toutes ses infos à partir de son ID
     * @param recetteID : string l'ID Spoonacular de la recette
     * @returns {Promise<unknown>} : La promesse comportant le résultat de la requette
     */
    getRecipeById: (recetteID) => new Promise((resolve,reject) => {
        const searchRecipeById = `https://api.spoonacular.com/recipes/${recetteID}/information?apiKey=${API_KEY}`
        fetch(searchRecipeById)
            .then((response) => response.json())
            .then(data => {
                if (data.status !== "failure"){
                    resolve(data)
                }
            })
            .catch(error => reject(error))
    })


};
export default useCuisineApi;


