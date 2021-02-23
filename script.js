//DOM SELECTORS
const container = document.getElementById("recipeContainer")
const searchField = document.getElementById("site-search")

//GLOBAL VARIABLES



//FUNCTION CHECK KEY
const checkKeyFunction = (event) => {
  if (event.code != 'Enter') {
    return
  }

  let searchFieldInput = searchField.value //behövde lägga till .value här + ändra om if statementet till negativt
  fetchFunction(searchFieldInput)
}


const fetchFunction = (searchFieldInput) => {
  const API_URL = `https://api.edamam.com/search?q=${searchFieldInput}&app_id=52d2bbc8&app_key=5cbc0ebbb54690e5c3a1cbf22c6d1c06&from=0&to=10&time=10%2B`

  fetch(API_URL)
    .then((response) => response.json())
    .then((json) => {
      json.hits.forEach((data) => {
        container.innerHTML += `
          <div class="recipe-cards">
          <img src="${data.recipe.image}" />
            <p class="label">${data.recipe.label}</p>
            <p>${data.recipe.source}</p>
            <p><a href="${data.recipe.url}">Link to recipe</a></p>
            <p>Cooking time: ${data.recipe.totalTime} minutes</p>
          </div>`
      })
    })
    .catch((error) => {
      console.error("Error: ", error)
    })
}


//EVENTLISTENERS
searchField.addEventListener('keydown', checkKeyFunction)
