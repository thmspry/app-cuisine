//const API_KEY = '6d0524f3b17449c4bf5203390f8d3100'
const API_KEY = 'a4aa01c0da0e4a81b3e120771779e4bf'

const useCuisineApi = {

    /**
     * Cherche une recette par mots-clés et intolérances
     * @param keywords : Une liste de mot clé (ingrédients, noms de plat, pays, ...)
     * @param into : Un tableau qui associe des noms d'ingrédient à un boolean.
     * @returns {Promise<unknown>} : La promesse comportant le résultat de la requette
     */
    search: (keywords, intolerancesAssociatif) => new Promise((resolve, reject) => {
        let baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=`;
        baseUrl += keywords[0];
        keywords.shift();  // Retire le premier mot-clé du tableau, car il est déjà utilisée au dessus
        keywords.forEach(word => {
            baseUrl += ",+" + word;
        });

        let intolerances = [];
        for(var key in intolerancesAssociatif) {
            if(intolerancesAssociatif[key]) {
                intolerances.push(key); // On stocke les nom des intolérances voulues
            }
        }
        baseUrl += "&intolerances=" + intolerances[0];
        intolerances.shift(); //Retire la première intolérance du tableau, car elle est déjà utilisée au dessus
        intolerances.forEach(into => {
            baseUrl += ",+" + into;
        });

        baseUrl += `&number=9`;

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
     * @param recette : Un objet recette
     * @returns {Promise<unknown>} : La promesse comportant le résultat de la requette
     */
    getWinePairing : (recette) => new Promise((resolve, reject) => {
        const wineUrl = `https://api.spoonacular.com/food/wine/pairing?apiKey=${API_KEY}&food=`;
        /*let typeDeCuisine = recette.cuisines;
        recette = recette.extendedIngredients;
        let food

        if (typeDeCuisine.length === 1){
            food = typeDeCuisine[0]
        } else if (typeDeCuisine.length > 1){
            typeDeCuisine = typeDeCuisine.filter(cuisine => cuisine !== "Mediterranean" && cuisine !== "European");
            food = typeDeCuisine[0]
        } else if (typeDeCuisine.length < 1) {
            console.log("Pas de cuisine")
        }



        fetch(wineUrl+food)
            .then((response) => response.json())
            .then(data => {
                if (data.status !== "failure") {
                    resolve(data)
                }
            })
            .catch(error => reject(error))*/

        let cuisine = recette.cuisines;
        let ingredients = recette.extendedIngredients;

        if(cuisine.length > 0) {
            let food = cuisine[0];
            if (cuisine.length === 1){
                food = cuisine[0]
            } else if (cuisine.length > 1){
                cuisine = cuisine.filter(cuisine => cuisine !== "Mediterranean" && cuisine !== "European");
                food = cuisine[0]
            } else if (cuisine.length < 1) {
                console.log("Pas de cuisine")
                food = ingredients[0]
            }

            if (food.includes(" ")) {
                food.replace(" ", "%20");
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

    getWidgetEquipment : (recetteID) => new Promise((resolve, reject) => {
        const WidgetEquipmentUrl = `https://api.spoonacular.com/recipes/${recetteID}/equipmentWidget?apiKey=${API_KEY}`

        fetch(WidgetEquipmentUrl)
            .then((response) => response.text())
            .then(html => {
                resolve(html)
            })
            .catch(error => reject(error));
    }),

    searchSimilarRecipe : (recetteID) => new Promise((resolve, reject) => {
        const searchSimilarUrl = `https://api.spoonacular.com/recipes/${recetteID}/similar?apiKey=${API_KEY}`
        fetch(searchSimilarUrl)
            .then((response) => response.json())
            .then(data => {
                if (data.status !== "failure") {
                    console.log(data);
                    resolve(data);
                }
            })
            .catch(error => reject(error))
    })


};
export default useCuisineApi;


