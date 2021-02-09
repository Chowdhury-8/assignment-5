function searchResult() {
    const input = document.getElementById("input").value;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
        .then(res => res.json())
        .then(data => displayResult(data.meals));
}

const displayResult = searchResult => {
    let findData = '';

    if (searchResult === null) {
        findData = `
            <div class="col off-5">
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Sorry!</strong> No meal found! please try again!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        `;

        document.getElementById("mealDetails").innerHTML = "";
        document.getElementById("searchResult").innerHTML = findData;
        findData = '';
    }
    else {
        searchResult.forEach(meal => {
            findData += `
                <div class="col-3">
                    <div class="card h-100" style="width: 18rem;" onClick="mealDetails(${meal.idMeal})">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body mealName">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                </div>
            `
        })

        document.getElementById("mealDetails").innerHTML = "";
        document.getElementById("searchResult").innerHTML = findData;
        findData = '';
    }
}

function mealDetails(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => displayDetails(data.meals[0]));
}

function displayDetails(meal) {

    let mealDetails = '';
    let ingredients = '';
    const secretIngredients = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];

        if (ingredient) {
            secretIngredients.push(ingredient);
        }
    }

    for (let i = 0; i < secretIngredients.length; i++) {
        ingredients += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="flexCheckDefault" checked>
                <label class="form-check-label" for="flexCheckDefault">${secretIngredients[i]}</label>
            </div>
        `
    }

    mealDetails = `
        <div class="row">
            <div class="col-4 offset-3">
                <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h2>${meal.strMeal}</h2>
                        <h4>Ingredients</h4>
                        ` + ingredients + `
                    </div>
                </div>
            </div>
        </div>
    `

    document.getElementById("mealDetails").innerHTML = mealDetails;
    mealDetails = '';
    ingredients = '';
}