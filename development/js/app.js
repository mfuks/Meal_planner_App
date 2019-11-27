// main-app-view - search elements

const liList = document.querySelectorAll(".aside-menu li");
const pulpitEl = document.querySelector(".aside-menu .pulpit");
const przepisyEl = document.querySelector(".aside-menu .przepisy");
const planyEl = document.querySelector(".aside-menu .plany");

// saving name - search elements

const nameInput = document.querySelector('input[name="lastname"]');
const readyButton = document.querySelector('#name_button');
const nameProfil = document.querySelector('.name');
const defaultNameProfil = nameProfil.innerHTML;
const firstPanel = document.querySelector('.firstvisit_form');
const mainPanel = document.querySelector('.main-panel-plany');

// main-app-view


for (let i = 0; i < liList.length; i++)
{

    liList[i].querySelector("a").addEventListener("click", function ()
    {

        for (let j = 0; j < liList.length ; j++) {
            liList[j].querySelector("i").classList.remove("fas");
            liList[j].querySelector("i").classList.remove("fa-chevron-right");
            liList[j].querySelector("a").classList.remove("border-left");
        }

        liList[i].querySelector("i").classList.add("fas");
        liList[i].querySelector("i").classList.add("fa-chevron-right");
        liList[i].querySelector("a").classList.add("border-left");

    });
}





// saving name

document.addEventListener("DOMContentLoaded", function() {




    readyButton.addEventListener('click', function storeName() {

        let nameValue = nameInput.value; // wartość inputa (Imię)

        if (nameValue.length > 0) {
            localStorage.setItem("savedName", nameValue);
            return localStorage.savedName;

        } else if (nameValue.length === 0 && localStorage.getItem("savedName") != null) {
            return "Name exists or invalid name"
        }
    });

    function checkName() {
        if (localStorage.getItem("savedName") != null) { // if the name exists
            nameProfil.innerHTML = localStorage.savedName;
            firstPanel.style.display = "none";
            mainPanel.style.display = "flex";

            return nameProfil.innerHTML;

        } else { // if the name doesn't exist
            nameProfil.innerHTML = defaultNameProfil;
            firstPanel.style.display = "flex";
            mainPanel.style.display = "none";

            return nameProfil.innerHTML;
        }
    }

    nameProfil.addEventListener("click", function () { // when clicking on the name, the local Storage is cleared
        if (localStorage.getItem("savedName") != null) {
            localStorage.removeItem("savedName");
            location.reload();
        } else {
            location.reload();
            localStorage.clear();
        }

    });

    checkName();

});