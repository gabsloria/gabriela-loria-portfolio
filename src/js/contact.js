// -------- CONTACT FORM --------
const form = document.querySelector(".contact-form");
const btn = document.querySelector(".contact-btn-send");

// -------- SUBMIT --------
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // ✅ HTML validation
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  try {
    // ✅ Send to Netlify
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(new FormData(form)).toString(),
    });

    // ✅ Success
    if (response.ok) {
      runButtonAnimation();
      showToast();
      form.reset();
    } else {
      console.error("Netlify form submission failed.");
    }
  } catch (error) {
    console.error("Network error:", error);
  }
});

// -------- BUTTON ANIMATION --------
function runButtonAnimation() {
  const spaceship = btn.querySelector(".spaceship");
  const replace = btn.querySelector(".replace");
  const text = btn.querySelector(".text");
  const check = btn.querySelector(".check");

  // 🚀 Show spaceship
  spaceship.classList.remove("hidden");
  spaceship.classList.add("fly");

  // 🔁 Hide default icon
  replace.classList.add("hidden");

  // ✨ Change text
  text.textContent = "SENT";
  text.classList.add("fade");

  // ✅ Button state
  btn.classList.add("done");

  // ✔ Show check
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
