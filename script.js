//DOM SELECTORS
const container = document.getElementById("recipeContainer")

//SEARCH FIELD INPUT, hard coded
const query = "vegetarian"

//API URL
const API_URL = `https://api.edamam.com/search?q=${query}&app_id=52d2bbc8&app_key=5cbc0ebbb54690e5c3a1cbf22c6d1c06&from=0&to=10`;


fetch(API_URL)
.then((response) => {
  return response.json();
})
.then((json) => {
  json.hits.forEach((data) => {
    container.innerHTML += `
    <div class="recipe-cards">
    <img src="${data.recipe.image}" />
      <p class="label">${data.recipe.label}</p>
      <p>${data.recipe.source}</p>
      <p><a href="${data.recipe.url}">Link to recipe</a></p>
      <p>Cooking time: ${data.recipe.totalTime} minutes</p>
      <div class="recipe-card-bottom-info">Other info</div>
      </div>
      `;
  });
})
.catch((error) => {
  console.error("Error: ", error);
});

