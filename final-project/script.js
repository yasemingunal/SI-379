// async function getSampleCocktails(){
//     const res1 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`);
//     obj1 = await res1.json();
//     const res2 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=martini`);
//     obj2 = await res2.json();

//     const cocktailsArray = [];
//     const margInfo = obj1.drinks.map(drink => ({name: drink.strDrink, glass: drink.strGlass, instructions: drink.strInstructions, ingredients: [
//     drink.strIngredient1,
//     drink.strIngredient2,
//     drink.strIngredient3,
//     drink.strIngredient4,
//     drink.strIngredient5]}))
//     cocktailsArray.push(margInfo[0]);
    
//     const martiniInfo = obj2.drinks.map(drink => ({name: drink.strDrink, glass: drink.strGlass, instructions: drink.strInstructions, ingredients: [
//         drink.strIngredient1,
//         drink.strIngredient2,
//         drink.strIngredient3,
//         drink.strIngredient4,
//         drink.strIngredient5]}))
//     cocktailsArray.push(martiniInfo[0]);
//     return cocktailsArray;
// };

// const data = getSampleCocktails();
// console.log(data);

function fetchDrinkAndAppend() {
    const divElement = document.getElementById('drinkList');
    const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    
    setInterval(() => {
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.drinks && data.drinks.length > 0) {
                const drinkName = data.drinks[0].strDrink;
                const drinkElement = document.createElement('div');
                drinkElement.textContent = drinkName;
                divElement.appendChild(drinkElement);
            }
        });
    }, 5000);
}
//fetchDrinkAndAppend();
