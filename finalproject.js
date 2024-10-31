function buttonClicked() {
    var category = document.getElementById("category_input").value;
    var ingredient = document.getElementById("ingredient_input").value;

    if (category === "" && ingredient === "") {
        console.log("Please Select A Category and Ingredient First!")
    } else {
        showMeal(category, ingredient)
    }
}

function loadOption() {
    // Fetch Category Link to Load and Display All Categories
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then(response => response.json())
        .then(data => {
            var selectCategory = document.getElementById("category_input")
            data.categories.forEach(category => {
                var option = document.createElement("option")
                option.value = category.strCategory
                option.textContent = category.strCategory
                selectCategory.appendChild(option)
            });
        });

    // Fetch Ingredient Link to Load and Display All Ingredients
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        .then(response => response.json())
        .then(data => {
            var selectIngredient = document.getElementById("ingredient_input")
            data.meals.forEach(ingredient => {
                var option = document.createElement("option")
                option.value = ingredient.strIngredient
                option.textContent = ingredient.strIngredient
                selectIngredient.appendChild(option)
            });
        });
}

function showMeal(category, ingredient) {
    var url;
    if (category && ingredient) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    } else if (ingredient) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                let meals = data.meals;

                if (category && ingredient) {
                    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
                        .then(response => response.json())
                        .then(dataIngredient => {
                            let ingredientMeals = dataIngredient.meals.map(meal => meal.idMeal)
                            let mealFilter = meals.filter(meal => ingredientMeals.includes(meal.idMeal))
                            displayMeals(mealFilter)
                        });
                } else {
                    displayMeals(meals)
                }
            } else {
                console.log("No meals found!")
            }
        })
        .catch(error => {
            console.error("Error fetching meals:", error)
        });
}

function displayMeals(meals) {
    if (meals.length === 0) {
        displayError("No meals found for the selected category and/or ingredient.");
        return;
    }

    meals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));

    var mealList = "";
    meals.forEach(meal => {
        mealList += `
            <li>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <a href="#" onclick="fetchMealDetails('${meal.idMeal}')">${meal.strMeal}</a>
            </li>`;
    });

    document.getElementById("mealimage").innerHTML = ""
    document.getElementById("mealname").textContent = "Meals Found:"
    document.getElementById("mealcategory").innerHTML = `<ul>${mealList}</ul>`
    document.getElementById("mealarea").textContent = ""
    document.getElementById("instructions").textContent = ""
    document.getElementById("mealingredient").innerHTML = ""
    document.getElementById("youtube").innerHTML = ""
}

function fetchMealDetails(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                showMealInfo(data.meals[0]);
            } else {
                displayError("Meal details not found.");
            }
        })
        .catch(error => {
            console.error("Error fetching meal details:", error);
            displayError("Error fetching meal details.");
        });
}

function showMealInfo(meal) {
    document.getElementById("mealimage").innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200">`
    document.getElementById("mealname").textContent = `Meal Name: ${meal.strMeal}`
    document.getElementById("mealcategory").textContent = `Category: ${meal.strCategory}`
    document.getElementById("mealarea").textContent = `Area: ${meal.strArea}`
    document.getElementById("instructions").textContent = `Instructions: ${meal.strInstructions}`

    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]
        if (ingredient && measure) {
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }
    }
    document.getElementById("mealingredient").innerHTML = `<ul>${ingredientList}</ul>`

    document.getElementById("youtube").innerHTML = `<a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a>`
}

function displayError(message) {
    document.getElementById("mealname").textContent = message
    document.getElementById("mealcategory").innerHTML = ""
    document.getElementById("mealarea").textContent = ""
    document.getElementById("instructions").textContent = ""
    document.getElementById("mealingredient").innerHTML = ""
    document.getElementById("youtube").innerHTML = ""
}

document.addEventListener("DOMContentLoaded", loadOption)
