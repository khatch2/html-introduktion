document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".hamburger");
  const nav = document.getElementById("mobile-nav");
  if (!btn || !nav) return;

  function openMenu() {
    btn.classList.add("is-active");
    btn.setAttribute("aria-expanded", "true");
    nav.hidden = false;
    nav.classList.add("open");
  }
  function closeMenu() {
    btn.classList.remove("is-active");
    btn.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
    // delay hiding until after transition ends
    const onEnd = () => {
      nav.hidden = true;
      nav.removeEventListener("transitionend", onEnd);
    };
    nav.addEventListener("transitionend", onEnd);
  }
  function toggleMenu() {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
  }

  btn.addEventListener("click", toggleMenu);

  // Optional: close on Escape and on outside click
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
      closeMenu();
    }
  });
  document.addEventListener("click", (e) => {
    if (
      btn.getAttribute("aria-expanded") === "true" &&
      !nav.contains(e.target) &&
      !btn.contains(e.target)
    ) {
      closeMenu();
    }
  });
});
