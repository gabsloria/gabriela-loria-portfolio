// =====================
// SELECT ELEMENTS
// =====================
const slider = document.querySelector(".projects-slider");
const dotsContainer = document.querySelector(".projects-dots");
const cards = document.querySelectorAll(".projects-card");

const gap = 20;

let currentIndex = 0;

// =====================
// RESPONSIVE SETTINGS
// =====================

// get how many cards are visible
function getCardsPerView() {
  if (window.innerWidth >= 1440) return 3;
  if (window.innerWidth >= 1024) return 2;
  return 1;
}

// calculate total dots needed
function getTotalDots() {
  return Math.ceil(cards.length / getCardsPerView());
}

// =====================
// DOTS
// =====================

// create dots dynamically
function createDots() {
  dotsContainer.innerHTML = "";

  const totalDots = getTotalDots();

  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");

    dot.dataset.index = i;

    dot.addEventListener("click", () => {
      currentIndex = i;
      moveSlider();
      updateDots();
      updatePrevTranslate();
    });

    dotsContainer.appendChild(dot);
  }
}

// update active dot
function updateDots() {
  const dots = document.querySelectorAll(".dot");

  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[currentIndex]) {
    dots[currentIndex].classList.add("active");
  }
}

// =====================
// SLIDER MOVEMENT
// =====================

// move slider based on index
function moveSlider() {
  const slideWidth = slider.clientWidth;
  const move = (slideWidth + gap) * currentIndex;

  slider.style.transform = `translateX(-${move}px)`;
}

// store current position
let prevTranslate = 0;

function updatePrevTranslate() {
  const slideWidth = slider.clientWidth;
  prevTranslate = -((slideWidth + gap) * currentIndex);
}

// =====================
// INIT
// =====================

function initSlider() {
  currentIndex = 0;
  createDots();
  moveSlider();
  updatePrevTranslate();
}

window.addEventListener("resize", initSlider);

initSlider();

// =====================
// DRAG / SWIPE
// =====================

let isDragging = false;
let startX = 0;
let currentX = 0;
let isHorizontal = false;

const sliderWrapper = document.querySelector(".projects-cards-container");

// mouse events
sliderWrapper.addEventListener("mousedown", startDrag);
sliderWrapper.addEventListener("mousemove", drag);
sliderWrapper.addEventListener("mouseup", endDrag);
sliderWrapper.addEventListener("mouseleave", endDrag);

// touch events
sliderWrapper.addEventListener("touchstart", startDrag, { passive: true });
sliderWrapper.addEventListener("touchmove", drag, { passive: false });
sliderWrapper.addEventListener("touchend", endDrag);

function startDrag(e) {
  isDragging = true;
  isHorizontal = false;

  startX = getPositionX(e);
  currentX = startX;

  // disable animation while dragging
  slider.style.transition = "none";
}

function drag(e) {
  if (!isDragging) return;

  currentX = getPositionX(e);
  const diff = currentX - startX;

  // detect horizontal movement
  if (!isHorizontal && Math.abs(diff) > 10) {
    isHorizontal = true;
  }

  if (isHorizontal) {
    e.preventDefault(); // prevent scroll

    slider.style.transform = `translateX(${prevTranslate + diff}px)`;
  }
}

function endDrag() {
  if (!isDragging) return;

  isDragging = false;

  // restore animation
  slider.style.transition = "transform 0.5s ease-in-out";

  const movedBy = currentX - startX;
  const threshold = 40; // swipe sensitivity

  if (movedBy < -threshold) currentIndex++;
  if (movedBy > threshold) currentIndex--;

  const maxIndex = Math.ceil(cards.length / getCardsPerView()) - 1;

  // clamp index
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;

  moveSlider();
  updateDots();
  updatePrevTranslate();
}

// get X position from mouse or touch
function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}
