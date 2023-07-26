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

/* POP UP */
const pets = petListVisible.querySelectorAll(".pet-item");
const overlay = document.querySelector(".overlay");
const popUp = overlay.querySelector(".popup");
let buttonClosePopUp;

function showPopup(i) {
    popUp.innerHTML =
        `<img class="popup-img" src="${petsJSON[listVisible[i]].img}" width="500" height="500" alt="${petsJSON[listVisible[i]].name} photo">
        <div class="popup-content">
            <div class="popup-title">
                <h3 class="section-title popup-name">${petsJSON[listVisible[i]].name}</h3>
                <h4 class="title popup-kind">${petsJSON[listVisible[i]].type} - ${petsJSON[listVisible[i]].breed}</h4>
            </div>
            <p class="title popup-description">${petsJSON[listVisible[i]].description}</p>
            <ul class="popup-list">
                <li class="title popup-item">
                    <span class="popup-bold">Age:</span>
                    ${petsJSON[listVisible[i]].age}
                </li>
                <li class="title popup-item">
                    <span class="popup-bold">Inoculations:</span>
                    ${petsJSON[listVisible[i]].inoculations}
                </li>
                <li class="title popup-item">
                    <span class="popup-bold">Diseases:</span>
                    ${petsJSON[listVisible[i]].diseases}
                </li>
                <li class="title popup-item">
                    <span class="popup-bold">Parasites:</span>
                    ${petsJSON[listVisible[i]].parasites}
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

for (let i = 0; i < pets.length; i += 1) {
    pets[i].addEventListener("click", function() {
        showPopup(i);
    })
}