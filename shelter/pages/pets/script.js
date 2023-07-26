/* BURGER MENU */
const burgerButton = document.querySelector(".header-burger"); // кнопка бургер меню
const burgerMenu = document.querySelector(".menu"); // меню навигации
const shadow = document.querySelector(".shadow"); // затемнение
const menuLinks = document.querySelectorAll(".nav-item"); // ссылки в меню
const body = document.querySelector("body");

function toggleBurgerMenu() {
    burgerButton.classList.toggle("burger-active")
    burgerMenu.classList.toggle("menu-active");
    shadow.classList.toggle("shadow-active");
    body.classList.toggle("no-scroll");
}

/* показать/скрыть бургер меню при клике мышкой на кнопку*/
burgerButton.addEventListener("click", toggleBurgerMenu);

/* закрыть окно при нажатии на эск*/
window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
        toggleBurgerMenu();
    }
});

/* закрыть окно при нажатии на тень*/
shadow.addEventListener("click", toggleBurgerMenu);

/* закрыть окно при нажатии на ссылку*/
for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener("click", toggleBurgerMenu);
}

/* PAGINATION */
import petsJSON from '../../data/pets.json' assert { type: 'json' };

const buttonLeft2 = document.querySelector(".button-left2"); // кнопка <<
const buttonLeft = document.querySelector(".button-left"); // кнопка <
const buttonRight = document.querySelector(".button-right"); // кнопка >
const buttonRight2 = document.querySelector(".button-right2"); // кнопка >>
const buttonActive= document.querySelector(".slider-active"); // активная кнопка
const petList = document.querySelector(".pets-list");
let pets;

const petsArray = [];
let petsSliced = [];
let counter = 0;

let page = 1;
let petsInArray = 8;
let QtyPages = 6;

function generatePetsConst() {
    if (window.innerWidth === 320) {
        petsInArray = 3;
        QtyPages = 16;
    };
    if (window.innerWidth <= 768 && window.innerWidth > 320) {
        petsInArray = 6;
        QtyPages = 8;
    };
    if (window.innerWidth > 768) {
        petsInArray = 8;
        QtyPages = 6;
    };
}

function getRandomArray(elementsInArray = 8, numberOfArrays = 6) {
  for (let i = 0; i < numberOfArrays; i += 1) {
    const newArr = [];
    while (newArr.length < elementsInArray) {
        let number = Math.floor(Math.random() * 8);
        if (newArr.indexOf(number) === -1 && petsArray.slice(-4).indexOf(number) === -1) {
            newArr.push(number);
            petsArray.push(number);
        }
    }
  }
}

function getSubArrays() {
    for (let i = 0; i < petsArray.length; i += petsInArray) {
        petsSliced.push(petsArray.slice(i, i + petsInArray));
    }
}

function fillPage(arr) {
    for (let i = 0; i < petsInArray; i++) {
        const newLi = document.createElement("li")
        newLi.classList.add("pet-item")
        newLi.innerHTML =
            `<img class="pet-img" src="${petsJSON[arr[i]].img}" width="270" height="270" alt="${petsJSON[arr[i]].name} photo">
            <p class="title pet-name">${petsJSON[arr[i]].name}</p>
            <button class="btn pet-button" type="button">Learn more</button>`
        petList.append(newLi);
    }
    pets = petList.querySelectorAll(".pet-item");
    console.log(pets)
    for (let i = 0; i < pets.length; i += 1) {
        pets[i].addEventListener("click", function() {
            showPopup(i);
        })
    }
}

function fillPagination() {
    buttonRight2.removeAttribute('disabled');
    buttonRight.removeAttribute('disabled');
    buttonLeft2.removeAttribute('disabled');
    buttonLeft.removeAttribute('disabled');

    if (page === 1) {
        buttonLeft2.setAttribute('disabled', '');
        buttonLeft.setAttribute('disabled', '');
    }
    if (page === QtyPages) {
        buttonRight2.setAttribute('disabled', '');
        buttonRight.setAttribute('disabled', '');
    }
    buttonActive.innerHTML = `${page}`
}

function handlerPagination() {
    page = page + counter;
    fillPagination()
}

function createPage() {
    generatePetsConst();
    getRandomArray();
    getSubArrays();
    petList.innerHTML = '';
    fillPage(petsSliced[page - 1])
}

function changePage() {
    generatePetsConst();
    getSubArrays();
    petList.innerHTML = '';
    fillPage(petsSliced[page - 1])
}

document.addEventListener("DOMContentLoaded", createPage);
window.addEventListener('resize', changePage);
buttonLeft.addEventListener('click', function() {
    counter = -1;
    handlerPagination();
    changePage();
})
buttonLeft2.addEventListener('click', function() {
    counter = 0;
    page = 1;
    handlerPagination();
    changePage();
})
buttonRight.addEventListener('click', function() {
    counter = 1;
    handlerPagination();
    changePage();
})
buttonRight2.addEventListener('click', function() {
    counter = 0;
    page = QtyPages;
    handlerPagination();
    changePage();
})

/* POP UP */


const overlay = document.querySelector(".overlay");
const popUp = overlay.querySelector(".popup");
let buttonClosePopUp;

function showPopup(i) {
    console.log('bla')
    popUp.innerHTML =
        `<img class="popup-img" src="${petsJSON[petsSliced[page - 1][i]].img}" width="500" height="500" alt="${petsJSON[petsSliced[page - 1][i]].name} photo">
        <div class="popup-content">
            <div class="popup-title">
                <h3 class="section-title popup-name">${petsJSON[petsSliced[page - 1][i]].name}</h3>
                <h4 class="title popup-kind">${petsJSON[petsSliced[page - 1][i]].type} - ${petsJSON[petsSliced[page - 1][i]].breed}</h4>
            </div>
            <p class="title popup-description">${petsJSON[petsSliced[page - 1][i]].description}</p>
            <ul class="popup-list">
                <li class="title popup-item">
                    <span class="popup-bold">Age:</span>
                    ${petsJSON[petsSliced[page - 1][i]].age}
                </li>
                <li class="title popup-item">
                    <span class="popup-bold">Inoculations:</span>
                    ${petsJSON[petsSliced[page - 1][i]].inoculations}
                </li>
                <li class="title popup-item">
                    <span class="popup-bold">Diseases:</span>
                    ${petsJSON[petsSliced[page - 1][i]].diseases}
                </li>
                <li class="title popup-item">
                    <span class="popup-bold">Parasites:</span>
                    ${petsJSON[petsSliced[page - 1][i]].parasites}
                </li>
            </ul>
            <button class="close-popup" type="button">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z"
                                fill="#292929" />
                </svg>
            </button>
        </div>`
    overlay.classList.remove("visually-hidden");
    body.classList.toggle("no-scroll");
    buttonClosePopUp = document.querySelector(".close-popup");
    buttonClosePopUp.addEventListener("click", closePopUp);
    overlay.addEventListener("click", function(event) {
        if (event.target === overlay) {
            closePopUp();
        };
    });
}

function closePopUp() {
    overlay.classList.add("visually-hidden");
    body.classList.toggle("no-scroll");
}

// for (let i = 0; i < pets.length; i += 1) {
//     pets[i].addEventListener("click", function() {
//         showPopup(i);
//     })
// }