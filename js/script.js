document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.querySelector(".mobil-menu");

  // ===== BURGER =====
  const burgerBtn = document.querySelector(".burger-btn");
  const closeBurgerBtn = document.querySelector(".mobil-close-btn");

  if (burgerBtn && mobileMenu && closeBurgerBtn) {
    burgerBtn.addEventListener("click", () => {
      mobileMenu.classList.add("is-open");
    });

    closeBurgerBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
    });
  }

  // ===== MODAL =====
  const backdrop = document.querySelector("[data-modal]");
  const modal = document.querySelector(".modal");
  const openButtons = document.querySelectorAll(".js-open-modal, .js-open-modal-btn");
  const closeModalBtn = document.querySelector(".modal-close-btn");

  let lastFocusedElement = null;

  function openModal() {
    lastFocusedElement = document.activeElement;

    backdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";

    // закриваємо моб меню
    mobileMenu?.classList.remove("is-open");

    setTimeout(() => {
      const focusable = getFocusableElements();
      focusable[0]?.focus();
    }, 50);

    document.addEventListener("keydown", handleKeydown);
  }

  function closeModal() {
    backdrop.classList.remove("is-open");
    document.body.style.overflow = "";

    document.removeEventListener("keydown", handleKeydown);
    lastFocusedElement?.focus();
  }

  // ===== OPEN MODAL =====
  openButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // ===== CLOSE MODAL =====
  closeModalBtn?.addEventListener("click", closeModal);

  backdrop?.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });

  function handleKeydown(e) {
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") trapFocus(e);
  }

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

  // ===== ACTIVE LINK =====
  const navLinks = document.querySelectorAll(".menu-nav-link");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("current"));
      link.classList.add("current");

      // 🔥 закриваємо модалку якщо це не Contacts
      if (!link.classList.contains("js-open-modal")) {
        closeModal();
      }
    });
  });

  // ===== MOBILE MENU LINKS =====
  const mobileLinks = document.querySelectorAll(".mobil-menu-nav-link");

  mobileLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      mobileMenu.classList.remove("is-open");

      if (link.classList.contains("js-open-modal")) {
        e.preventDefault();

        setTimeout(() => {
          openModal();
        }, 300);
      } else {
        closeModal();
      }
    });
  });
});







/*const mobileMenu = document.querySelector(".mobil-menu");

document.addEventListener("DOMContentLoaded", () => {
  // ===== BURGER =====
  const burgerBtn = document.querySelector(".burger-btn");
  const closeBtn = document.querySelector(".mobil-close-btn");

  if (burgerBtn && mobileMenu && closeBtn) {
    burgerBtn.addEventListener("click", () => {
      mobileMenu.classList.add("is-open");
    });

    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
    });
  }

  // ===== ACTIVE LINK 🔥 =====
  const navLinks = document.querySelectorAll(".menu-nav-link");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("current"));
      link.classList.add("current");
    });
  });

  // 🔥 закриття при кліку на пункт меню
  const menuLinks = document.querySelectorAll(".mobil-menu-nav-link");

  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");

      if (link.classList.contains("js-open-modal")) {
        e.preventDefault();

        setTimeout(() => {
          openModal();
        }, 300); // час анімації
      }
    });
  });
});

// ===== MODAL =====
const backdrop = document.querySelector("[data-modal]");
const modal = document.querySelector(".modal");
const openButtons = document.querySelectorAll(".js-open-modal, .js-open-modal-btn");
const closeBtn = document.querySelector(".modal-close-btn");

let lastFocusedElement = null;

function openModal() {
  lastFocusedElement = document.activeElement;

  backdrop.classList.add("is-open");
  document.body.style.overflow = "hidden"; // LOCK SCROLL

  // 🔥 закриваємо моб меню якщо відкрите
    mobileMenu?.classList.remove("is-open");

  // focus first element
  setTimeout(() => {
    const focusable = getFocusableElements();
    focusable[0]?.focus();
  }, 50);

  document.addEventListener("keydown", handleKeydown);
}

/* -------------------------
   CLOSE MODAL
--------------------------
function closeModal() {
  backdrop.classList.remove("is-open");
  document.body.style.overflow = ""; // UNLOCK SCROLL

  document.removeEventListener("keydown", handleKeydown);

  // return focus
  lastFocusedElement?.focus();
}

/* -------------------------
   CLICK OPENERS
--------------------------
openButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });
});

/* -------------------------
   CLOSE BUTTON
--------------------------
closeBtn.addEventListener("click", closeModal);

/* click outside modal 
backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) {
    closeModal();
  }
});

/* -------------------------
   ESC KEY + FOCUS TRAP
--------------------------
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
--------------------------
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
}*/