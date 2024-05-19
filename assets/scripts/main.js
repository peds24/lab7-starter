// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	const recipieParsed = JSON.parse(localStorage.getItem('recipes'));
	return recipieParsed;
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	const mainEl = document.querySelector('main');
	for(let i = 0; i < recipes.length; i++){
		const recipeEl = document.createElement('recipe-card');
		recipeEl.data = recipes[i];
		mainEl.append(recipeEl);
	}
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	const formEl = document.querySelector('form');
	formEl.addEventListener('submit', function(event) {
		event.preventDefault();
		const formData = new FormData(formEl);
		const recipeObject = {};
		formData.forEach((value, key) => {
			recipeObject[key] = value;
		});
		const newRecipe = document.createElement('recipe-card');
		newRecipe.data = recipeObject;
		document.querySelector('main').append(newRecipe);

		const recipes = getRecipesFromStorage();
		console.log(recipes)
		recipes.push(recipeObject);
		console.log(recipes)
		saveRecipesToStorage(recipes); 
		console.log(getRecipesFromStorage())
	});
	
	const clearButton = document.getElementsByClassName('danger')[0];
	clearButton.addEventListener('click', function() {
		localStorage.clear();
		document.querySelector('main').innerHTML = "";
	});
}
