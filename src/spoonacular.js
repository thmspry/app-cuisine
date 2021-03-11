const API_KEY = '805f9224f7a34732a3ffd6f68ce31d5e';

const useCuisineApi = {

    /*
        Cherche par ingrédients à partir d'un tableau d'ingrédients
        Le tableau doit contenir au moins 1 ingrédients
        Exemple : ["apples","flour",sugar"]
        // Exemple de requete : https://api.spoonacular.com/recipes/findByIngredients?apiKey=805f9224f7a34732a3ffd6f68ce31d5e&ingredients=apples,+flour,+sugar.
     */
    byIntolerances: (intolerancesAssociatif) => new Promise((resolve, reject) => {
        let intolerances = [];
        for(var key in intolerancesAssociatif) {
            if(intolerancesAssociatif[key]) {
                intolerances.push(key);
            }
        }
        let intolerancesUrlRequest = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&intolerances=`;
        intolerancesUrlRequest += intolerances[0]
        intolerances.shift();
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

    bySearch: (keywords) => new Promise((resolve, reject) => {
        let keywordUrlRequest = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=`;
        keywordUrlRequest += keywords[0];
        keywords.shift();
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

    getRandom: () => new Promise((resolve, reject) => {
        const randomRecettes= `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=9`;
        fetch(randomRecettes).
        then((response) => response.json()).
        then(data => {
            resolve(data);
        }).
        catch(error => reject(error));
    }),

    getWinePairing : (recette) => new Promise((resolve, reject) => {
        const wineUrl = `https://api.spoonacular.com/food/wine/pairing?apiKey=${API_KEY}&food=`;
        console.log("Recettes dao : ", recette )
        recette = recette.extendedIngredients;
        recette.forEach(r => {
                let ingredientName = r.name;
                fetch(wineUrl + ingredientName)
                    .then((response) => response.json())
                    .then(data => {
                        if (data.status != "failure") {
                            resolve(data);
                        }
                    }).catch(error => reject(error));
            }
        );
    })

};
export default useCuisineApi;


