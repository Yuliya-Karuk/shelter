/* SELECTORS */
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