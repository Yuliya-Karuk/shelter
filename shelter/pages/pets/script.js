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
const petList = document.querySelector(".pets-list")

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
