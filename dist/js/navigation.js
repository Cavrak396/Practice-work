let hamburger = document.querySelector(".header__hamburger");
let active = "active";
let list = document.querySelector(".header__navigation-list");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle(active);
  list.classList.toggle(active);
});
