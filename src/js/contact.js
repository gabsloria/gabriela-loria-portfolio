// -------- CONTACT FORM --------
const form = document.querySelector(".contact-form");
const btn = document.querySelector(".contact-btn-send");

// -------- SUBMIT --------
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  try {
    // Send form to Netlify
    await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(new FormData(form)).toString(),
    });

    // Run animation
    runButtonAnimation();

    // Show popup
    showToast();

    // Reset form
    form.reset();
  } catch (error) {
    console.error("Form submission error:", error);
  }
});

// -------- BUTTON ANIMATION --------
function runButtonAnimation() {
  const spaceship = btn.querySelector(".spaceship");
  const replace = btn.querySelector(".replace");
  const text = btn.querySelector(".text");
  const check = btn.querySelector(".check");

  spaceship.classList.remove("hidden");
  spaceship.classList.add("fly");

  replace.classList.add("hidden");

  text.textContent = "SENT";

  btn.classList.add("done");

  setTimeout(() => {
    check.classList.remove("hidden");
    check.classList.add("show-check");
  }, 700);
}

// -------- TOAST POPUP --------
function showToast() {
  const toast = document.querySelector(".contact-toast");

  if (!toast) return;

  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}
