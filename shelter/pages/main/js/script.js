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

/* SLIDER */
import petsJSON from '../../../data/pets.json' assert { type: 'json' }

const sliderButtonLeft = document.querySelector(".button-left")
const sliderButtonRight = document.querySelector(".button-right")
const petListVisible = document.querySelector(".pet-list-visible")
const petListLeft = document.querySelector(".pet-list-left")
const petListRight = document.querySelector(".pet-list-right")
const slider = document.querySelector(".slider-container")

let listVisible = getRandomArray();
let listRight = getRandomArray(listVisible);
let listLeft = getRandomArray(listVisible);

const CssClasses = {
    ANIMATE_LEFT : "animate-left",
    ANIMATE_RIGHT : "animate-right",
    NO_TRANSITION : "no-transition",
}

function getRandomArray(arr = []) {
  const newArr = [];
  while (newArr.length < 3) {
    let number = Math.floor(Math.random() * 8);
    if (newArr.indexOf(number) === -1 && arr.indexOf(number) === -1) newArr.push(number);
  }
  return newArr;
}

function formListSlider(arr, element) {
    const elementItems = element.querySelectorAll(".pet-item")
    for (let i = 0; i < elementItems.length; i++) {
        elementItems[i].innerHTML =
            `<img class="pet-img" src="${petsJSON[arr[i]].img}" width="270" height="270" alt="${petsJSON[arr[i]].name} photo">
            <p class="title pet-name">${petsJSON[arr[i]].name}</p>
            <button class="btn pet-button" type="button">Learn more</button>`
    }
}

function disableButtons() {
    sliderButtonLeft.setAttribute('disabled', true);
    sliderButtonRight.setAttribute('disabled', true);
}
function enableButtons() {
    sliderButtonLeft.removeAttribute('disabled');
    sliderButtonRight.removeAttribute('disabled');
}

function createSlider() {
    formListSlider(listVisible, petListVisible);
    formListSlider(listRight, petListRight);
    formListSlider(listLeft, petListLeft);
}

function endTransition() {
    slider.classList.add(CssClasses.NO_TRANSITION);
    slider.classList.remove(CssClasses.ANIMATE_LEFT, CssClasses.ANIMATE_RIGHT);
    setTimeout(() => {
        slider.classList.remove(CssClasses.NO_TRANSITION);;
    }, 1);

    createSlider();
    enableButtons();
}

document.addEventListener("DOMContentLoaded", createSlider());
sliderButtonLeft.addEventListener("click", function() {
    disableButtons();
    slider.classList.add(CssClasses.ANIMATE_LEFT)
    listLeft = listVisible;
    listVisible = listRight;
    listRight = getRandomArray(listVisible);
    slider.addEventListener('transitionend', endTransition);
})

sliderButtonRight.addEventListener("click", function() {
    disableButtons();
    slider.classList.add(CssClasses.ANIMATE_RIGHT);
    listRight = listVisible;
    listVisible = listLeft;
    listLeft = getRandomArray(listVisible);
    slider.addEventListener('transitionend', endTransition);
})





