// DOM-Elemente referenzieren
const todoList = document.getElementById("todo-list");
const inputSection = document.getElementById("input-section");
const darkModeBtn = document.getElementById("toggle-darkmode");

// TODO: Eingabefeld und Button erstellen
// TODO: Funktion Aufgabe hinzufügen
// TODO: Funktion Aufgabe löschen
// TODO: Funktion Aufgabe als erledigt markieren

// Dark Mode Umschalten
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
