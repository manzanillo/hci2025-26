const list = document.getElementById("item-list");
const indicator = document.getElementById("refresh-indicator");

let startY = 0;
let isPulling = false;

document.addEventListener("touchstart", (e) => {
  if (window.scrollY === 0) {
    startY = e.touches[0].clientY;
    isPulling = true;
  }
});

document.addEventListener("touchmove", (e) => {
  if (!isPulling) return;
  let distance = e.touches[0].clientY - startY;
  if (distance > 50) {
    indicator.style.display = "block";
  }
});

document.addEventListener("touchend", () => {
  if (indicator.style.display === "block") {
    // Simuliere Refresh
    setTimeout(() => {
      const newItem = document.createElement("li");
      newItem.textContent = "Neue Aufgabe " + (list.children.length + 1);
      list.prepend(newItem);
      indicator.style.display = "none";
    }, 1000);
  }
  isPulling = false;
});
