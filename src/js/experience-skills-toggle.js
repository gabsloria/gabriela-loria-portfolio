document.addEventListener("DOMContentLoaded", () => {
  function getMaxVisibleSkills() {
    const width = window.innerWidth;
    if (width >= 460) return 3;
    return 2;
  }

  const skillLists = document.querySelectorAll(".content-skills");

  skillLists.forEach((list) => {
    const items = list.querySelectorAll("li");
    const maxVisible = getMaxVisibleSkills();

    if (items.length <= maxVisible) return;

    const hiddenItems = [];

    items.forEach((item, index) => {
      if (index >= maxVisible) {
        item.classList.add("hidden-skill");
        hiddenItems.push(item);
      }
    });

    const hiddenCount = hiddenItems.length;

    const btn = document.createElement("li");
    btn.className = "skills-toggle-btn";
    btn.textContent = `+${hiddenCount}`;

    list.appendChild(btn);

    let expanded = false;

    btn.addEventListener("click", () => {
      expanded = !expanded;

      hiddenItems.forEach((item) => {
        item.classList.toggle("hidden-skill");
      });

      btn.textContent = expanded ? " - Show less" : `+${hiddenCount}`;
    });
  });
});
