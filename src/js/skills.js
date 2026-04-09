gsap.registerPlugin(ScrollTrigger);

// Reset in case elements were left invisible
gsap.set("#skills *", { opacity: 1 });

// =========================
// MAIN SKILLS ANIMATION
// =========================
const skillsTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#skills",
    start: "top 85%",
    toggleActions: "play none none reset",
  },
});

// Titles
skillsTl
  .from(".title-skills", {
    y: 30,
    autoAlpha: 0,
    duration: 0.6,
    ease: "power2.out",
  })
  .from(
    ".subtitle-skills",
    {
      y: 20,
      autoAlpha: 0,
      duration: 0.45,
      ease: "power2.out",
    },
    "-=0.35",
  )

  // Section headers
  .from(
    ".icon-skills-container h4",
    {
      x: -20,
      autoAlpha: 0,
      duration: 0.4,
      stagger: 0.15,
      ease: "power2.out",
    },
    "-=0.25",
  )

  // Skill cards
  .from(
    ".skill-card",
    {
      scale: 0.9,
      autoAlpha: 0,
      duration: 0.4,
      stagger: {
        each: 0.06,
        from: "start",
      },
      ease: "back.out(1.5)",
    },
    "-=0.15",
  )

  // Monitoring chips
  .from(
    ".text-skills-monitoring-debugging p",
    {
      scale: 0.85,
      autoAlpha: 0,
      duration: 0.3,
      stagger: 0.08,
      ease: "back.out(1.5)",
    },
    "-=0.2",
  )

  // Soft skills
  .from(
    ".text-skills-soft-skill p",
    {
      x: -15,
      autoAlpha: 0,
      duration: 0.3,
      stagger: 0.08,
      ease: "power2.out",
    },
    "-=0.2",
  )

  // Languages
  .from(
    ".text-skills-languages span, .text-skills-languages p",
    {
      x: 20,
      autoAlpha: 0,
      duration: 0.3,
      stagger: 0.08,
      ease: "power2.out",
    },
    "-=0.2",
  );

// =========================
// HOVER ANIMATIONS (CARDS)
// =========================
gsap.utils.toArray(".skill-card").forEach((card) => {
  const icon = card.querySelector("svg");

  if (!icon) return;

  card.addEventListener("mouseenter", () => {
    gsap.to(icon, {
      scale: 1.15,
      rotate: 6,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(icon, {
      scale: 1,
      rotate: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  card.addEventListener("pointerdown", () => {
    gsap
      .timeline()
      .to(icon, {
        scale: 1.15,
        rotate: 6,
        duration: 0.1,
      })
      .to(icon, {
        scale: 1,
        rotate: 0,
        duration: 0.15,
      });
  });
});

// =========================
// HOVER ANIMATIONS (CHIPS)
// =========================
gsap.utils.toArray(".text-skills-monitoring-debugging p").forEach((chip) => {
  chip.addEventListener("mouseenter", () => {
    gsap.to(chip, {
      y: -2,
      scale: 1.04,
      duration: 0.15,
    });
  });

  chip.addEventListener("mouseleave", () => {
    gsap.to(chip, {
      y: 0,
      scale: 1,
      duration: 0.15,
    });
  });
});
