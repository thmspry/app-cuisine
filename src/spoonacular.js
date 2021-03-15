//const API_KEY = '805f9224f7a34732a3ffd6f68ce31d5e';
const API_KEY = '4c55266e9f324ee9b041c2867a42983d'

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
        fetch(randomRecettes).
        then((response) => response.json()).
        then(data => {
            resolve(data);
        }).
        catch(error => reject(error));
    }),

    /**
     * Donne un vins qui se marie bien avec la recette
     * @param recette : Un objet recette
     * @returns {Promise<unknown>} : La promesse comportant le résultat de la requette
     */
    getWinePairing : (recette) => new Promise((resolve, reject) => {
        const wineUrl = `https://api.spoonacular.com/food/wine/pairing?apiKey=${API_KEY}&food=`;
        recette = recette.extendedIngredients;
        let typeDeCuisine = recette.cuisines;
        let food

        if (typeDeCuisine.length == 1){
            food = typeDeCuisine[0]
        } else if (typeDeCuisine.length > 1){
            typeDeCuisine = typeDeCuisine.filter(cuisine => cuisine != "Mediterranean" && cuisine != "European");
            food = typeDeCuisine[0]
        } else if (typeDeCuisine.length < 1) {
            //recherche par ingrédient
        }

        fetch(wineUrl+food)
            .then((response) => response.json())
            .then(data => {
                if (data.status != "failure") {
                    resolve(data)
                }
            })
            .catch(error => reject(error))


    }),


};
export default useCuisineApi;


