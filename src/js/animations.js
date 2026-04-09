// GSAP ScrollTrigger Animations for Home

gsap.registerPlugin(ScrollTrigger);

// -------- Home Text Fade-in Staggered Animation --------
const homeTextItems = document.querySelectorAll(".home-text-wrapper > *");

// Set initial state
gsap.set(homeTextItems, { opacity: 0, y: 20 });

// Fade-in staggered animation for text
gsap.to(homeTextItems, {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".home",
    start: "top bottom",
    end: "bottom top",
    toggleActions: "play reverse play reverse",
    markers: false,
  },
});

// -------- Home Profile Photo Animation --------
const homePhoto = document.querySelector(".home-img-animation-container");

gsap.set(homePhoto, { opacity: 0, y: 60, scale: 0.95 });

gsap.to(homePhoto, {
  opacity: 1,
  y: 0,
  scale: 1,
  duration: 1.2,
  ease: "back.out(1.2)",
  scrollTrigger: {
    trigger: ".home",
    start: "top bottom",
    end: "bottom top",
    toggleActions: "play reverse play reverse",
    markers: false,
  },
});

// -------- Experience Timeline Entrance Animation --------
const timelineItems = document.querySelectorAll(".cd-timeline-content");

timelineItems.forEach((item, index) => {
  const direction = index % 2 === 0 ? -80 : 80;

  gsap.fromTo(
    item,
    {
      opacity: 0,
      x: direction,
      y: 30,
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse",
        markers: false,
      },
    },
  );
});

// -------- Timeline Dot Animation --------
gsap.utils.toArray(".cd-timeline-img").forEach((dot) => {
  gsap.fromTo(
    dot,
    { scale: 0 },
    {
      scale: 1,
      duration: 0.4,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: dot,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    },
  );
});

// -------- Modular Exit Animation for Other Sections --------
const sections = document.querySelectorAll("section");

sections.forEach((section) => {
  const containers = section.querySelectorAll(
    ".home-text-container, .home-graphic-container, .container-counter",
  );

  containers.forEach((container, index) => {
    const direction = index % 2 === 0 ? -150 : 150;

    gsap.to(container, {
      x: direction,
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        markers: false,
      },
    });
  });
});

// -------- Home Mobile/Tablets Counter --------
document.querySelectorAll(".container-counter .counter").forEach((counter) => {
  const finalValue = parseInt(counter.textContent, 10);

  let duration = 1;

  if (finalValue <= 10) duration = 0.7;
  else if (finalValue <= 100) duration = 1.1;
  else duration = 1.8;

  counter.textContent = "0";

  gsap.fromTo(
    counter,
    { innerText: 0 },
    {
      innerText: finalValue,
      duration: duration,
      ease: "power1.out",
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: ".container-counter",
        start: "top 90%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        counter.textContent = Math.floor(counter.innerText).toLocaleString();
      },
    },
  );
});

// -------- Protect fixed menu from ScrollTrigger side effects --------
ScrollTrigger.addEventListener("refresh", () => {
  gsap.set(".menu, .menu-icon-mobile, .menu-overlay", {
    clearProps: "transform",
  });
});

// Force a safe refresh after setup
ScrollTrigger.refresh();
