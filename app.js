const ingredientInput = document.getElementById('ingredient');
const searchBtn = document.getElementById('searchBtn');
const recipeList = document.getElementById('recipeList');

//https://spoonacular.com/food-api/docs#Search-Recipes-Complex

searchBtn.addEventListener('click', async () => {
	const query = ingredientInput.value.toLowerCase();
	if (!query) {
		alert('Please enter an ingredient!');
        return;
	}
});
/*
const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/autocomplete?number=10&query=chicken';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '6eb4be1d02d5454cb6e1e318b46b8762',
		'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	}
};

async function GetMeal(){
	try {
		const response = await fetch(url, options);
		const result = await response.text();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}*/