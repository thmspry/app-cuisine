const API_KEY = '805f9224f7a34732a3ffd6f68ce31d5e';

const useCuisineApi = {

    /*
        Cherche par ingrédients à partir d'un tableau d'ingrédients
        Le tableau doit contenir au moins 1 ingrédients
        Exemple : ["apples","flour",sugar"]
        // Exemple de requete : https://api.spoonacular.com/recipes/findByIngredients?apiKey=805f9224f7a34732a3ffd6f68ce31d5e&ingredients=apples,+flour,+sugar.
     */
    byIngredient: (ingredients) => new Promise((resolve, reject) => {
        let ingredientUrlRequest= `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=`;
        ingredientUrlRequest += ingredients[0]
        ingredients.shift();
        ingredients.forEach(ingr => {
            ingredientUrlRequest += ",+" + ingr;
        });
        fetch(ingredientUrlRequest).
        then((response) => response.json()).
        then(data => {
            resolve(data);
        }).
        catch(error => reject(error));
    })

};
export default useCuisineApi;


