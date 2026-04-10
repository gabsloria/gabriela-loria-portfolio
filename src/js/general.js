// MOBILE MENU TOGGLE
const menuIcon = document.getElementById("menu-icon-mobile"); // clickable wrapper
const hamburger = document.getElementById("hamburger"); // animated bars container
const menu = document.getElementById("nav");

// ---- Create overlay element ----
const overlay = document.createElement("div");
overlay.classList.add("menu-overlay");
document.body.appendChild(overlay);

// ---- Open / close on icon click ----
menuIcon.addEventListener("click", () => {
  menu.classList.toggle("active");
  overlay.classList.toggle("active");
  // ---- Trigger hamburger X animation ----
  hamburger.classList.toggle("open");
});

// ---- Close when clicking overlay ----
overlay.addEventListener("click", () => {
  menu.classList.remove("active");
  overlay.classList.remove("active");
  // ---- Reset hamburger animation ----
  hamburger.classList.remove("open");
});

// ---- Close when clicking a menu option ----
document.querySelectorAll(".menu-option").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    // ---- Reset hamburger animation ----
    hamburger.classList.remove("open");
  });
});

// MENU ACTIVE ON CLICK
document.querySelectorAll(".menu ul li a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    // ---- Smooth scroll ----
    targetSection.scrollIntoView({ behavior: "smooth" });

    // ---- Updates "active" status (immediate feedback) ----
    document
      .querySelectorAll(".menu ul li")
      .forEach((li) => li.classList.remove("active"));
    this.parentElement.classList.add("active");
  });
});

// ALWAYS RETURN HOME ON RELOAD
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// HOME PAGE NAV + MENU SYNC WITH SCROLL
document.addEventListener("DOMContentLoaded", () => {
  const pageNavItems = document.querySelectorAll(".page-nav li");
  const menuNavItems = document.querySelectorAll(".menu ul li");
  const sections = document.querySelectorAll("section[id]");

  // ---- Single observer controls both navigations ----
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const visibleId = entry.target.id;

        // ---- Update page navigation (numbers) ----
        pageNavItems.forEach((item) => {
          item.classList.toggle("active", item.dataset.section === visibleId);
        });

        // ---- Update mobile menu navigation ----
        menuNavItems.forEach((li) => {
          const link = li.querySelector("a");
          li.classList.toggle(
            "active",
            link && link.getAttribute("href") === `#${visibleId}`,
          );
        });
      });
    },
    {
      threshold: 0.45, // 45% visible to activate section
    },
  );

  sections.forEach((section) => observer.observe(section));
});
