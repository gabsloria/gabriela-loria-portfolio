// -------- CONTACT FORM --------
const form = document.querySelector(".contact-form");
const btn = document.querySelector(".contact-btn-send");

// -------- SUBMIT --------
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // ✅ Validación nativa del navegador
  if (!form.checkValidity()) {
    form.reportValidity();
    return; // 🚫 detener si hay errores
  }

  // ✅ Desactivar botón para evitar múltiples envíos
  btn.disabled = true;

  // 👉 Aquí luego irá el envío real (EmailJS / backend)

  // Simulación de envío (puedes quitar esto después)
  setTimeout(() => {
    runButtonAnimation();
  }, 300);
});

// -------- Animation --------
function runButtonAnimation() {
  const spaceship = btn.querySelector(".spaceship");
  const replace = btn.querySelector(".replace");
  const text = btn.querySelector(".text");
  const check = btn.querySelector(".check");

  // Initial Animation
  spaceship.classList.add("fly");
  spaceship.classList.remove("hidden");

  replace.classList.add("hidden");

  text.textContent = "SENT";
  text.classList.add("fade");

  btn.classList.add("done");

  // Show heck
  setTimeout(() => {
    check.classList.remove("hidden");
    check.classList.add("show-check");
  }, 250);
}
