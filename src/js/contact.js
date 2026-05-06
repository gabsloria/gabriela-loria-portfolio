// -------- CONTACT FORM --------
const form = document.querySelector(".contact-form");
const btn = document.querySelector(".contact-btn-send");

// -------- FORM SUBMIT --------
form.addEventListener("submit", () => {
  runButtonAnimation();
});

// -------- BUTTON ANIMATION --------
function runButtonAnimation() {
  const spaceship = btn.querySelector(".spaceship");
  const replace = btn.querySelector(".replace");
  const text = btn.querySelector(".text");
  const check = btn.querySelector(".check");

  // Show spaceship animation
  spaceship.classList.remove("hidden");
  spaceship.classList.add("fly");

  // Hide default icon
  replace.classList.add("hidden");

  // Change button text
  text.textContent = "SENT";

  // Add completed state
  btn.classList.add("done");

  // Show check icon
  setTimeout(() => {
    check.classList.remove("hidden");
    check.classList.add("show-check");
  }, 700);
}
