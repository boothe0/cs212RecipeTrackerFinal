// create recipeList array to store all inputted recipes
recipeList = [];
let addedrecipeCount = 0;
var enteredCategories = [];
var addedCategoryCount = 0;
var categories = [
  "Italian",
  "French",
  "German",
  "Japanese",
  "American",
  "British",
  "African",
  "South Asian",
  "Asian",
  "Chinese",
  "Russian",
  "Polish",
  "South American",
  "Mexican",
  "Desert",
  "Main Course",
  "Appetizer",
];

// function to add recipe
function addRecipe() {
  // store inputted recipe categories into variables
  var foodName = $("#food-name").val();
  var foodIngredients = $("#food-ingredients").val();
  var foodSteps = $("#food-steps").val();
  var foodCategory = $("#food-category").val();
  var cookingTime = $("#cooking-time").val();
  var linkPic = $("#addPic").val();
  var servingSize = $("#servingSize").val();

  // if all inputs are not empty
  if (foodName && foodIngredients && foodSteps && foodCategory && cookingTime) {
    // store all in an object literal list
    var newRecipe = {
      name: foodName,
      ingredients: foodIngredients,
      steps: foodSteps,
      category: foodCategory,
      cookTime: cookingTime,
      pictures: linkPic,
      servings: servingSize,
      favorite: false,
      // store the current time of this recipe being added to the list
      timestamp: Date.now(),
    };

    // push newRecipe into recipeList
    recipeList.push(newRecipe);

    // update the localStorage array
    // stores recipeList in browsers local storage, saved under the key 'recipes'
    // use
    localStorage.setItem("recipes", JSON.stringify(recipeList));

    // run addRecipeToList function to add the new skill to web page
    addRecipeToList(newRecipe, recipeList.length - 1);

    // clear inputs for new input from user
    $("#food-name").val("");
    $("#food-ingredients").val("");
    $("#food-steps").val("");
    $("#cooking-time").val("");
    $("#addPic").val("");
    $("#servingSize").val("");
  } else {
    alert("Please input a valid response for every field");
  }
}

// funciton to add recipe to web page
function addRecipeToList(recipe, currentIndex) {
  // variable to hold element location of id skill-list
  var currentRecipe = $("#recipe-list");

  // check if time is in the last 72 hours
  var isRecentlyAdded = Date.now() - recipe.timestamp <= 259200000;

  // create new list element for new skill and add the index as well for later editing and deleting
  var newRecipeItem = $(`
        <img class="pictureCard" src="${recipe.pictures}"/>
        <li>
            ${
              isRecentlyAdded
                ? '<span class="recent-badge">Recently Added</span>'
                : ""
            }
            <span class="recipe-name"><h5>${recipe.name}</h5></span>
            <span class="recipe-ingredients"><p>Ingredients: ${
              recipe.ingredients
            }</p></span>
            <span class="recipe-steps"><p>Steps: ${recipe.steps}</p></span>
            <span class="recipe-category"><p>Category: ${
              recipe.category
            }</p></span>
            <span class="recipe-cookTime"><p>Cook Time: ${
              recipe.cookTime
            }</p></span>
            <button class="edit-recipe buttonForm" list-index="${currentIndex}">Edit</button>
            <button class="delete-recipe buttonForm" list-index="${currentIndex}">Delete</button>
            <button class="favorite-button buttonForm" list-index="${currentIndex}">Favorite</button>
            <nav class="navbar navbar-expand-lg navbar-light">
              <div class=" collapse navbar-collapse btn-group dropend" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                    </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown" id="dropdownMenu">
                  <li class="dropInfo"><a class="dropdown-item" href="#">${
                    recipe.ingredients
                  }</a></li>
                  <li class="dropInfo"><a class="dropdown-item" href="#">${
                    recipe.steps
                  }</a></li>
                  <li class="dropInfo"><a class="dropdown-item" href="#">${
                    recipe.cookTime
                  }</a></li>
                  <li class="dropInfo"><a class="dropdown-item" href="#">${
                    recipe.servings
                  }</a></li>
                  </ul>
                  </li>
                </ul>
              </div>
            </nav>

    `);
  // add ths newRecipeItem to web page to display
  newRecipeItem.hide();
  currentRecipe.append(newRecipeItem);
  newRecipeItem.slideDown();
}

// Empties recipe-list and repopulates it (used when editing or deleting a recipe)
function updateRecipeList() {
  // clear list for repopulating
  $("#recipe-list").empty();

  // Use a for loop to iterate over recipeList
  for (var i = 0; i < recipeList.length; i++) {
    // store the current index in recipeList
    var currentRecipe = recipeList[i];
    // add recipe back to web page with addRecipeToList function
    addRecipeToList(currentRecipe, i);
  }
}
function searchRecipes() {
  const searchText = $("#search-bar").val().toLowerCase();
  const filteredRecipes = recipeList.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchText) ||
      recipe.category.toLowerCase().includes(searchText) ||
      recipe.ingredients.toLowerCase().includes(searchText)
  );

  // Clear current list and add filtered recipes
  $("#recipe-list").empty();
  filteredRecipes.forEach((recipe, index) => {
    addRecipeToList(recipe, index);
  });
}

// Attach search functionality to search bar
$(document).on("keyup", "#search-bar", function () {
  searchRecipes();
});

// Event listener for adding a recipe
$(document).on("click", ".recipeButton", function () {
  addedRecipeCount++;
  countRecipes(addedRecipeCount);
});
// Function to display recipes including images
function displayRecipes() {
  const recipesGrid = document.getElementById("recipes-grid");
  recipesGrid.innerHTML = recipes
    .map(
      (recipe, index) => `
        <div class="recipe-card">
            <img src="${recipe.image || "default-image.jpg"}" alt="${
        recipe.name
      }" class="recipe-image">
            <h3>${recipe.name}</h3>
            <p>Category: ${recipe.category}</p>
            <p>Cooking Time: ${recipe.time} mins</p>
            <button onclick="viewRecipe(${index})">View Details</button>
        </div>
    `
    )
    .join("");

  const featuredRecipeCard = document.getElementById("featured-recipe-card");
  featuredRecipeCard.innerHTML = `
        <img src="${recipes[0].image || "default-image.jpg"}" alt="${
    recipes[0].name
  }" class="recipe-image">
        <h3>${recipes[0].name}</h3>
        <p>Category: ${recipes[0].category}</p>
        <p>Cooking Time: ${recipes[0].time} mins</p>
        <p>Ingredients: ${recipes[0].ingredients}</p>
        <p>Steps: ${recipes[0].steps}</p>
    `;
}
// Function to toggle the visibility of the sort dropdown menu
function toggleSortDropdown() {
  const sortDropdown = document.getElementById("sort-dropdown");
  if (sortDropdown.style.display === "none" || !sortDropdown.style.display) {
    sortDropdown.style.display = "block";
  } else {
    sortDropdown.style.display = "none";
  }
}

// Event listeners setup
function setupEventListeners() {
  document
    .getElementById("sort-button")
    .addEventListener("click", toggleSortDropdown);
  document
    .getElementById("sort-asc")
    .addEventListener("click", () => sortRecipes("asc"));
  document
    .getElementById("sort-desc")
    .addEventListener("click", () => sortRecipes("desc"));
}

// Sort recipes by cooking time
function sortRecipes(order) {
  recipes.sort((a, b) => (order === "asc" ? a.time - b.time : b.time - a.time));
  displayRecipes(); // Refresh the recipe grid
  toggleSortDropdown(); // Hide dropdown after sorting
}

// function to check if recently added time is still under 72 hours
function updateRecentlyAdded() {
  // for each recipe in the list
  $("#recipe-list")
    .children("li")
    .each(function (index) {
      // store current recipe
      var recipe = recipeList[index];
      // check if date is less than 72 hours
      var isRecentlyAdded = Date.now() - recipe.timestamp <= 259200000;

      // store recent badge class
      var badge = $(this).find(".recent-badge");
      // if recently added is still under 72 hours
      if (isRecentlyAdded) {
        // if there is no badge class section for the current recipe
        if (badge.length === 0) {
          // Add the badge if it's not already present
          $(this).prepend('<span class="recent-badge">Recently Added</span>');
        }
      }
      // else remove the badge because it has gone over 72 hours
      else {
        badge.remove();
      }
    });
}

// editing a recipe using an event listener
$(document).on("click", ".edit-recipe", function () {
  // Get index of the button the user clicked
  var index = $(this).attr("list-index");

  // Store the current recipe
  var currentRecipe = recipeList[index];

  // Create input fields for every recipe section
  var newName = $("<input>").val(currentRecipe.name);
  var newIngredients = $("<input>").val(currentRecipe.ingredients);
  var newSteps = $("<input>").val(currentRecipe.steps);
  var newCategory = $("<input>").val(currentRecipe.category);
  var newCookTime = $("<input>").val(currentRecipe.cookTime);

  // Replace currrentRecipe text with the new input from user
  $(this).siblings(".recipe-name").html(newName);
  $(this).siblings(".recipe-ingredients").html(newIngredients);
  $(this).siblings(".recipe-steps").html(newSteps);
  $(this).siblings(".recipe-category").html(newCategory);
  $(this).siblings(".recipe-cookTime").html(newCookTime);

  // Replace "Edit" button with "Save" button
  $(this).replaceWith(
    $("<button>").text("Save").addClass("save-recipe").attr("list-index", index)
  );
});

// Add an event listener to save the new skill when clicking save button
$(document).on("click", ".save-recipe", function () {
  var currentIndex = $(this).attr("list-index");
  // store the new updatedRecipe
  var updatedRecipe = {
    name: $(this).siblings(".recipe-name").children("input").val(),
    ingredients: $(this)
      .siblings(".recipe-ingredients")
      .children("input")
      .val(),
    steps: $(this).siblings(".recipe-steps").children("input").val(),
    category: $(this).siblings(".recipe-category").children("input").val(),
    cookTime: $(this).siblings(".recipe-cookTime").children("input").val(),
  };

  // Update the recipeList with the new recipe
  recipeList[currentIndex] = updatedRecipe;

  // save the change to the localStorage
  localStorage.setItem("recipes", JSON.stringify(recipeList));
  // Update the recipeList on the webpage
  updateRecipeList();
});

// add event listener when user clicks on delete-recipe button, run this function
$(document).on("click", ".delete-recipe", function () {
  // get index of button user pressed
  var index = $(this).attr("list-index");
  // remove 1st index
  recipeList.splice(index, 1);

  // update the change to the localStorage
  localStorage.setItem("recipes", JSON.stringify(recipeList));

  // update recipeList after deletion
  updateRecipeList();
});

// add event listener to mark and unmark favorited recipes
$(document).on("click", ".favorite-button", function () {
  // store current index of list user clicked
  var currentIndex = $(this).attr("list-index");

  // toggle between true and false
  // if recipe was favorited
  if (recipeList[currentIndex].favorite) {
    // unfavorite
    recipeList[currentIndex].favorite = false;
  }
  // if recipe was unfavorited
  else {
    // favorite recipe
    recipeList[currentIndex].favorite = true;
  }
});

// Function to show only favorites
function showFavorites() {
  // clear current list
  $("#recipe-list").empty();

  // loop through length of recipeList
  for (var i = 0; i < recipeList.length; i++) {
    // store currentRecipe
    var currentRecipe = recipeList[i];

    // if currentRecipe has favorite toggles (true)
    if (currentRecipe.favorite) {
      // run addRecipeToList function
      addRecipeToList(currentRecipe, i);
    }
  }
}

// function to show all recipes in recipeList
function showAll() {
  // Clear the current list
  $("#recipe-list").empty();

  // loop through lenght of recipeList
  for (var i = 0; i < recipeList.length; i++) {
    // store currentRecipe
    var currentRecipe = recipeList[i];
    // run addRecipetoList function
    addRecipeToList(currentRecipe, i);
  }
}
// add event listener to the add food recipe to list btn
$(document).on("click", ".recipeButton", function () {
  addedrecipeCount++;
  countRecipes(addedrecipeCount);
});
// add event listener to the delete button to update counters

function countRecipes(index) {
  $("#btnRecipe").empty();
  var currentRecipeCount = $("#btnRecipe");
  var recipeCounter = $(`
   <p class="numRecipes">Number of Recipes saved: ${addedrecipeCount}</p>
  `);
  currentRecipeCount.append(recipeCounter);
}
function countRecipesCategory() {
  // Start count at 1, ensuring the number of categories entered is shown properly
  addedCategoryCount++;

  // Update the HTML with the count of categories entered
  $("#btnCategory").empty(); // Clear any existing content
  var recipeCounter = $(`
            <p class="numRecipes">Number of Categories entered: ${addedCategoryCount}</p>
        `);
  $("#btnCategory").append(recipeCounter);
  $("#food-category").val("");
  return addedCategoryCount;
}
// function for category counter
function addCategory() {
  var enteredCategory = $("#food-category").val().trim(); // Correct input selection
  // Check if the entered category is valid
  if (
    categories.includes(enteredCategory) &&
    !enteredCategories.includes(enteredCategory)
  ) {
    enteredCategories.push(enteredCategory); // Store valid category
    countRecipesCategory();
    $("#food-category").val(""); // Optionally, clear the input field after adding a valid category
  } else if (
    categories.includes(enteredCategory) &&
    enteredCategories.includes(enteredCategory) &&
    addedCategoryCount === 0
  ) {
    countRecipesCategory();
    $("#food-category").val(""); // Optionally, clear the input field after adding a valid category
  } else if (
    categories.includes(enteredCategory) &&
    enteredCategories.includes(enteredCategory) &&
    addedCategoryCount > 0
  ) {
    countRecipesCategory();
    addedCategoryCount--;
    $("#food-category").val(""); // Optionally, clear the input field after adding a valid category
  } else {
    alert(
      "Valid Categories are:" +
        "\n" +
        '    "Italian",\n' +
        '    "French",\n' +
        '    "German",\n' +
        '    "Japanese",\n' +
        '    "American",\n' +
        '    "British",\n' +
        '    "African",\n' +
        '    "South Asian",\n' +
        '    "Asian",\n' +
        '    "Chinese",\n' +
        '    "Russian",\n' +
        '    "Polish",\n' +
        '    "South American",\n' +
        '    "Mexican",\n' +
        '    "Desert",\n' +
        '    "Main Course",\n' +
        '    "Appetizer"'
    );
    $("#food-category").val(""); // Optionally, clear the input field after adding a valid category
  }
}
$(document).on("click", ".delete-recipe", function () {
  addedrecipeCount--;
  addedCategoryCount--;
  favoriteCount--;
  updateFavoriteCounter();
  countRecipes(addedrecipeCount);
  $("#btnCategory").empty(); // Clear any existing content
  var recipeCounter = $(`
            <p class="numRecipes">Number of Categories entered: ${addedCategoryCount}</p>
        `);
  $("#btnCategory").append(recipeCounter);
});

$(document).on("click", ".favorite-button", function () {
  const currentIndex = $(this).attr("list-index");
  if (recipeList[currentIndex].favorite) {
    recipeList[currentIndex].favorite = false;
    favoriteCount++;
  } else {
    recipeList[currentIndex].favorite = true;
    favoriteCount--;
  }

  // Update the displayed favorite count
  updateFavoriteCounter();
});

function updateFavoriteCounter() {
  $("#btnFavCounter").empty();

  // Create new counter content
  const favoriteCounter = `
    <p class="numFavs">Favorite recipes: ${favoriteCount}</p>
  `;

  // Append the updated content
  $("#btnFavCounter").append(favoriteCounter);
}

// use setInterval to run updateReecentlyAdded function every second
setInterval(updateRecentlyAdded, 1000);

// run this function when the page fully loads
window.onload = function () {
  // create variable to store recipes in localStorage
  var storedRecipes = JSON.parse(localStorage.getItem("recipes"));

  // if there are recipes from the localStorage
  if (storedRecipes) {
    // populate the recipeList with recipes from localStorage
    recipeList = storedRecipes;
  }
  // else, localStorage is empty
  else {
    // set recipeList to an empty array
    recipeList = [];
  }
  // if the recipeList in localStorage is not empty
  if (recipeList.length > 0) {
    // run updateRecipeList
    updateRecipeList();
  }
};
