document.addEventListener("DOMContentLoaded", function () {

    const nameProfil = document.querySelector('.name');
    const defaultNameProfil = nameProfil.innerHTML;
    const firstPanel = document.querySelector('.firstvisit_form');
    const recipePanel = document.querySelector('.recipe-panel');

    function checkName() {
        if (localStorage.getItem("savedName") != null) { // if the name exists
            nameProfil.innerHTML = localStorage.savedName;
            firstPanel.style.display = "none";
            recipePanel.style.display = "block";
            return nameProfil.innerHTML;

        } else { // if the name doesn't exist
            nameProfil.innerHTML = defaultNameProfil;
            firstPanel.style.visibility = 'inline-block';
            recipePanel.style.display = "none";
            return nameProfil.innerHTML;
        }
    }

    checkName();



    // Add recipe button
    const buttonAddRecipe = document.querySelector('.fa-plus-square');

    buttonAddRecipe.addEventListener('click', function(e){
        document.querySelector('.add_recipe_modal').style.display = 'flex';
        recipePanel.style.display = 'none';
        e.preventDefault();

    });




// to show all the recipes (recipe panel)

    const recipeName = document.getElementById('recipe_name');
    const recipeDescription = document.getElementById('recipe_description');

    const recipeIngredientsTextarea = document.getElementById('ingridients');
    const recipeIngredientsButton = document.getElementById('add_ingridients');
    const recipeIngredientsList = document.getElementById('ingridients_list');

    const recipeInstructionsTextarea = document.getElementById('instructions');
    const recipeInstructionsButton = document.getElementById('add_instructions');
    const recipeInstructionsList = document.getElementById('instructions_list');

    const savingButton = document.getElementById('exit_recipe_button');
    const allRecipesContainer = document.querySelector('.table-content');

    const newRecipe = {
        id: "", // id przepisu
        title: "", // nazwa przepisu
        description: "", // opis przepisu
        instructions: [], // instrukcje przepisu
        ingredients: [] //składniki przepisu
    };

    // ingredients

    function addIngredient(ingredient) {
        const newLi = document.createElement("LI");
        const buttons = '<button type="button" class="edit_ingredients"><i class="far fa-edit"></i></i> </button><button type="button" class="remove_ingredients"><i class="far fa-trash-alt"></i> </button>';

        newLi.innerHTML = ingredient + buttons;

        recipeIngredientsList.appendChild(newLi);
    }

    recipeIngredientsButton.addEventListener("click", function (e) {
        e.preventDefault();

        newRecipe.ingredients.push(recipeIngredientsTextarea.value);
        addIngredient(recipeIngredientsTextarea.value);

        recipeIngredientsTextarea.value = "";
    });


    //add instructions

    function addInstruction(instruction) {
        const newLi = document.createElement("LI");
        const buttons = '<button type="button" class="edit_instructions"><i class="far fa-edit"></i></i> </button><button type="button" class="remove_instructions"><i class="far fa-trash-alt"></i> </button>';

        newLi.innerHTML = instruction + buttons;
        recipeInstructionsList.appendChild(newLi);
    }

    recipeInstructionsButton.addEventListener("click", function (e) {
        e.preventDefault();

        newRecipe.instructions.push(recipeInstructionsTextarea.value);
        addInstruction(recipeInstructionsTextarea.value);

        recipeInstructionsTextarea.value = "";
    });

    // saving the recipes

    savingButton.addEventListener("click", function (e) {
        e.preventDefault();

        newRecipe.title = recipeName.value;
        newRecipe.description = recipeDescription.value;
        saveRecipeToLocalStorage(newRecipe);

        document.querySelector('.add_recipe_modal').style.display = 'none';
        recipePanel.style.display = 'flex';

        console.log(newRecipe);

    });

    savingButton.addEventListener("click", renderAllRecipes);


// saving recipes to local storage

    function saveRecipeToLocalStorage(newObject) {
        let dataFromLocalStorage = [];
        if (localStorage.getItem("recipes") != null) {
            dataFromLocalStorage = JSON.parse(localStorage.getItem("recipes"));
            newObject.id = JSON.parse(localStorage.getItem("recipes")).length + 1;
            dataFromLocalStorage.push(newObject);
            localStorage.setItem("recipes", JSON.stringify(dataFromLocalStorage));
        } else {
            newObject.id = 1;
            dataFromLocalStorage.push(newObject);
            localStorage.setItem("recipes", JSON.stringify(dataFromLocalStorage));
        }
        alert("Przepis zapisany");
        clearNewRecipeData();
    }

    function clearNewRecipeData() {
        recipeInstructionsList.innerHTML = '';
        recipeIngredientsList.innerHTML = '';
        recipeDescription.value = '';
        recipeName.value = '';
    }

// recipe list

    function renderAllRecipes(e) {
        e.preventDefault();

        const allRecipes = JSON.parse(localStorage.getItem('recipes'));
        const recipeRow = document.createElement('tr');

        allRecipes.forEach(function (singleRecipe) {
            const recipeId = document.createElement('td');
            recipeId.innerText = singleRecipe.id;
            const recipeName = document.createElement('td');
            recipeName.innerText = singleRecipe.title;
            const recipeDescription = document.createElement('td');
            recipeDescription.innerText = singleRecipe.description;
            const buttons = document.createElement('td');

            buttons.innerHTML = '<i class="fas fa-edit"></i><i class="far fa-trash-alt"></i>';

            allRecipesContainer.appendChild(recipeRow);
            recipeRow.appendChild(recipeId);
            recipeRow.appendChild(recipeName);
            recipeRow.appendChild(recipeDescription);
            recipeRow.appendChild(buttons);

        });
    }

    // cleaning the localStorage

    nameProfil.addEventListener("click", function () { // when clicking on the name, the local Storage is cleared
        if (localStorage.getItem("savedName") != null) {
            localStorage.removeItem("savedName");
            location.reload();
            localStorage.clear();
            allRecipesContainer.innerHTML = "";
        } else {
            firstPanel.style.display = 'block';
            location.reload();
            localStorage.clear();
        }

    });


});