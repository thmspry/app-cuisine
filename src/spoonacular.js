const API_KEY = '805f9224f7a34732a3ffd6f68ce31d5e';

const useCuisineApi = {

    /**
     * Cherche par ingrédients à partir d'un tableau associatif d'intolérances
     * @param intolerancesAssociatif : Un tableau qui associe des noms d'ingrédient à un boolean.
     * @returns {Promise<unknown>} : La promesse comportant le résultat de la requette
     */
    byIntolerances: (intolerancesAssociatif) => new Promise((resolve, reject) => {
        let intolerances = [];
        for(var key in intolerancesAssociatif) {
            if(intolerancesAssociatif[key]) {
                intolerances.push(key); // On stocke les nom des intolérances voulues
            }
        }
        let intolerancesUrlRequest = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&intolerances=`;
        intolerancesUrlRequest += intolerances[0];
        intolerances.shift(); //Retire la première intolérance du tableau, car elle est déjà utilisée au dessus
        intolerances.forEach(into => {
            intolerancesUrlRequest += ",+" + into;
        });
        intolerancesUrlRequest += `&number=9`;

        fetch(intolerancesUrlRequest).
        then((response) => response.json()).
        then(data => {
            resolve(data);
        }).
        catch(error => reject(error));
    }),

    /**
     * Cherche un recette par mots-clés
     * @param keywords :  Une liste de mot clé (ingrédients, noms de plat, pays, ...)
     * @returns {Promise<unknown>} : La promesse comportant le résultat de la requette
     */
    bySearch: (keywords) => new Promise((resolve, reject) => {
        let keywordUrlRequest = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=`;
        keywordUrlRequest += keywords[0];
        keywords.shift();  //Retire le premier mot-clé du tableau, car il est déjà utilisée au dessus
        keywords.forEach(word => {
            keywordUrlRequest += ",+" + word;
        });
        keywordUrlRequest += `&number=9`;

        fetch(keywordUrlRequest).
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
        console.log("Recettes dao : ", recette )
        recette = recette.extendedIngredients;
        /*recette.forEach(r => {
                let ingredientName = r.name;
                fetch(wineUrl + ingredientName)
                    .then((response) => response.json())
                    .then(data => {
                        if (data.status != "failure") {
                            resolve(data);
                        }
                    }).catch(error => reject(error));
            }
        );*/
    })

};
export default useCuisineApi;


