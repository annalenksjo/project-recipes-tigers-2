//DOM SELECTORS
const container = document.getElementById("recipeContainer")
const searchField = document.getElementById("siteSearch")
const cookingTime = document.getElementById("cookingTime")

//GLOBAL VARIABLES
let recipesResult = []
let filterTime

//GENERATE RECIPECARD
const generateRecipeCard = () => {
  let recipesCards = [...recipesResult] 

  
  if (filterTime) {
  recipesCards = recipesCards.filter((recipe) => recipe.recipe.totalTime <= filterTime)
  } 

  container.innerHTML = ''
  recipesCards.forEach((data) => {
    container.innerHTML += `
      <div class="recipe-cards">
       <img src="${data.recipe.image}" />
        <p class="recipe-card-label">${data.recipe.label}</p>
        <div class="recipe-time">
         <p> <img src="clock-icon.png" class="clock-icon"/> ${data.recipe.totalTime} minutes</p>
         </div>
        <p><a href="${data.recipe.url}" target="_blank" rel="noopener noreferrer">Check it out</a></p>
        <div class="health-labels">
          <button>
          ${data.recipe.healthLabels[0]}
          </button>
          <button>
          ${data.recipe.healthLabels[1]}
          </button>
          <button>
          ${data.recipe.healthLabels[2]}
          </button>
        </div>
      </div>`
  })
}

// SHOW RECIPE CARDS ON PAGE LOAD
const preLoadCards = () => {
  const API_URL_START = `https://api.edamam.com/search?q=vegan&app_id=52d2bbc8&app_key=5cbc0ebbb54690e5c3a1cbf22c6d1c06&from=0&to=10&time=10%2B`
  
  fetch(API_URL_START)
  .then((response) => response.json())
  .then ((json) => {
    recipesResult = json.hits
    generateRecipeCard ()
  })
}

preLoadCards()

//SELECT OPTION COOKING TIME
const selectOption = () => {
  filterTime = parseInt(cookingTime.value)
  generateRecipeCard()
}

//FUNCTION CHECK KEY
const checkKeyFunction = (event) => {
  if (event.code != 'Enter') {
    return
  }

  let searchFieldInput = searchField.value 
  fetchFunction(searchFieldInput)
}


//FUNCTION TO FILTER RESULT ON SEARCH FIELD INPUT
const fetchFunction = (searchFieldInput) => {
  const API_URL = `https://api.edamam.com/search?q=${searchFieldInput}&app_id=52d2bbc8&app_key=5cbc0ebbb54690e5c3a1cbf22c6d1c06&from=0&to=10&time=10%2B`

  fetch(API_URL)
    .then((response) => response.json())
    .then((json) => {
      recipesResult = json.hits
      generateRecipeCard()
    })
    .catch((error) => {
      container.innerHTML = 'Sorry, no matches, try again'
      console.error("Error: ", error)
    })
}


//EVENTLISTENERS
searchField.addEventListener('keydown', checkKeyFunction)
cookingTime.addEventListener('change', selectOption)
