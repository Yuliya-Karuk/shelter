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
const buttonLeft2 = document.querySelector(".header-burger"); // кнопка <<
const buttonLeft = document.querySelector(".menu"); // кнопка <
const buttonRight = document.querySelector(".header-burger"); // кнопка >
const buttonRight2 = document.querySelector(".menu"); // кнопка >>
const buttonActive= document.querySelector(".header-burger"); // активная кнопка
const petItems = document.querySelectorAll(".pet-item")

import petsJSON from '../../../data/pets.json' assert { type: 'json' };

function getRandomArray(arr = []) {
  const newArr = [];
  while (newArr.length < 3) {
    let number = Math.floor(Math.random() * 8);
    if (newArr.indexOf(number) === -1 && arr.indexOf(number) === -1) newArr.push(number);
  }
  return newArr;
}

function fillPage(arr) {
    for (let i = 0; i < petItems.length; i++) {
        petItems[i].innerHTML =
            `<img class="pet-img" src="${petsJSON[arr[i]].img}" width="270" height="270" alt="${petsJSON[arr[i]].name} photo">
            <p class="title pet-name">${petsJSON[arr[i]].name}</p>
            <button class="btn pet-button" type="button">Learn more</button>`
    }
}

let sliderArr = getRandomArray();

function startPage() {

}