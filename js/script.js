document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.querySelector(".burger-btn");
  const mobileMenu = document.querySelector(".mobil-menu");
  const closeBtn = document.querySelector(".mobil-close-btn");

  console.log({ burgerBtn, mobileMenu, closeBtn });
  console.log("burger:", document.querySelector(".burger-btn"));
  console.log("menu:", document.querySelector(".mobil-menu"));
  console.log("close:", document.querySelector(".mobil-close-btn"));

  if (!burgerBtn || !mobileMenu || !closeBtn) return;

  burgerBtn.addEventListener("click", () => {
    mobileMenu.classList.add("is-open");
  });

  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("is-open");
  });
});

const backdrop = document.querySelector("[data-modal]");
const modal = document.querySelector(".modal");
const openButtons = document.querySelectorAll(".js-open-modal, .js-open-modal-btn");
const closeBtn = document.querySelector(".modal-close-btn");

let lastFocusedElement = null;

/* -------------------------
   OPEN MODAL
--------------------------*/
function openModal() {
  lastFocusedElement = document.activeElement;

  backdrop.classList.add("is-open");
  document.body.style.overflow = "hidden"; // LOCK SCROLL

  // focus first element
  setTimeout(() => {
    const focusable = getFocusableElements();
    focusable[0]?.focus();
  }, 50);

  document.addEventListener("keydown", handleKeydown);
}

/* -------------------------
   CLOSE MODAL
--------------------------*/
function closeModal() {
  backdrop.classList.remove("is-open");
  document.body.style.overflow = ""; // UNLOCK SCROLL

  document.removeEventListener("keydown", handleKeydown);

  // return focus
  lastFocusedElement?.focus();
}

/* -------------------------
   CLICK OPENERS
--------------------------*/
openButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });
});

/* -------------------------
   CLOSE BUTTON
--------------------------*/
closeBtn.addEventListener("click", closeModal);

/* click outside modal */
backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) {
    closeModal();
  }
});

/* -------------------------
   ESC KEY + FOCUS TRAP
--------------------------*/
function handleKeydown(e) {
  if (e.key === "Escape") {
    closeModal();
  }

  if (e.key === "Tab") {
    trapFocus(e);
  }
}

/* -------------------------
   FOCUS TRAP
--------------------------*/
function getFocusableElements() {
  return modal.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
}

function trapFocus(e) {
  const focusable = getFocusableElements();
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  }

  if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}