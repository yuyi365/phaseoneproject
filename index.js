const cocktailForm = document.querySelector('#search-by-cocktail');
const ingredientForm = document.querySelector('#search-by-ingredient');

const cocktailInput = document.querySelector('#cocktail-name');
const ingredientInput = document.querySelector('#cocktail-ingredient');

const cocktailContainer = document.querySelector('#container');

cocktailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    cocktailContainer.replaceChildren();
    const cocktail = cocktailInput.value;

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
    .then(res => res.json())
    .then(allCocktails => {
       for (const key in allCocktails) {
           allCocktails[key].forEach(drink => {
               createCard(drink);
           })
       } 
    })
    .catch(error => {
        // cocktailForm.reset();
        // ingredientForm.reset();
        const errorMessage = document.createElement('h1');
        errorMessage.textContent = `Cocktail Not Found`;
        errorMessage.id = "error-message";
        cocktailContainer.append(errorMessage);
    })
})

ingredientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    cocktailContainer.replaceChildren();
    const ingredient = ingredientInput.value;


    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then(res => res.json())
    .then(allCocktails => {
       
        for (const key in allCocktails) {
           allCocktails[key].forEach(drink => {
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink.strDrink}`)
            .then(res => res.json())
            .then(allCocktails => {
               for (const key in allCocktails) {
                   allCocktails[key].forEach(drink => {
                       createCard(drink);
                   })
               } 
            })
            .catch(error => {
                const errorMessage = document.createElement('h1');
                errorMessage.textContent = `Cocktail Not Found`;
                errorMessage.id = "error-message";
                cocktailContainer.append(errorMessage);
            })
           })
       } 
    })
    .catch(error => {
        const errorMessage = document.createElement('h1');
        errorMessage.textContent = `Cocktail Not Found`;
        errorMessage.id = "error-message";
        cocktailContainer.append(errorMessage);
    })
})


const createCard = (cocktail) => {
    const cocktailCard = document.createElement('div');
    const cocktailName = document.createElement('h2');
    const cocktailImg = document.createElement('img');
    const cocktailRecipe = document.createElement('p');
    const cocktailIngredients = document.createElement('p');
    const cocktailIngredientsArray = [];
    const recipeSpan = document.createElement('span');
    const ingredientSpan = document.createElement('span');

    recipeSpan.textContent = "Recipe: ";
    ingredientSpan.textContent = "Ingredients: ";

    cocktailCard.id = `cocktail number- ${cocktail.idDrink}`;
    cocktailCard.className = 'cocktail-card';
    
    cocktailName.textContent = cocktail.strDrink;
    cocktailName.id = 'cocktail-name-card';
    
    cocktailImg.src = cocktail.strDrinkThumb;
    cocktailImg.alt = `Image of ${cocktail.strDrink}`;

    for (const key in cocktail) {
        if (key.includes("strIng") && cocktail[key] !== null && cocktail[key] !== "") {
            cocktailIngredientsArray.push(" " + cocktail[key]);
        }
    }

    console.log(cocktailIngredientsArray);

    cocktailIngredients.textContent = cocktailIngredientsArray;
    cocktailRecipe.textContent = cocktail.strInstructions;

    cocktailRecipe.prepend(recipeSpan);
    cocktailIngredients.prepend(ingredientSpan);

    cocktailCard.append(cocktailName, cocktailImg, cocktailRecipe, cocktailIngredients);
    cocktailContainer.append(cocktailCard);

    cocktailForm.reset();
    ingredientForm.reset();
}
