const burgerBtn = document.querySelector(".burger-btn");
const mobileMenu = document.querySelector(".mobil-menu");
const closeBtn = document.querySelector(".mobil-close-btn");

burgerBtn.addEventListener("click", () => {
  mobileMenu.classList.add("is-open");
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("is-open");
});