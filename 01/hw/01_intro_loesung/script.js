// DOM-Elemente referenzieren
const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const prioritySelect = document.getElementById("priority-select"); // Bonus
const addTodoBtn = document.getElementById("add-todo-btn");
const darkModeBtn = document.getElementById("toggle-darkmode");


// Funktion Aufgabe hinzufügen
const addTodo = () => {
    const taskText = todoInput.value.trim();
    const priority = prioritySelect.value; // Bonus

    if (taskText === "") {
        alert("Bitte geben Sie eine Aufgabe ein.");
        return;
    }

    // 1. LI-Element erstellen
    const listItem = document.createElement("li");
    listItem.classList.add("todo-item", `priority-${priority}`); // Bonus: Prioritätsklasse

    // 2. Text-Span erstellen
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    listItem.appendChild(taskSpan);

    // 3. Button-Container erstellen
    const buttonContainer = document.createElement("div");

    // 4. "Erledigt"-Button erstellen
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✅ Erledigt";
    completeBtn.addEventListener("click", () => completeTodo(listItem));
    buttonContainer.appendChild(completeBtn);

    // 5. "Löschen"-Button erstellen
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌ Löschen";
    deleteBtn.addEventListener("click", () => deleteTodo(listItem));
    buttonContainer.appendChild(deleteBtn);

    // Füge Button-Container zu LI hinzu
    listItem.appendChild(buttonContainer);

    // Füge LI zur UL hinzu
    todoList.appendChild(listItem);

    // Eingabefeld leeren
    todoInput.value = "";
};


// Funktion Aufgabe als erledigt markieren
const completeTodo = (item) => {
    // Schaltet die Klasse 'completed' um
    item.classList.toggle("completed");
};


// Funktion Aufgabe löschen
const deleteTodo = (item) => {
    // Entfernt das Listenelement direkt aus der Liste
    item.remove();
};


// Event Listener für "Aufgabe hinzufügen"
addTodoBtn.addEventListener("click", addTodo);

// Optional: Hinzufügen per Enter-Taste
todoInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});


// Dark Mode Umschalten (Extra)
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  // Text im Button anpassen
  if (document.body.classList.contains("dark")) {
      darkModeBtn.textContent = "Light Mode";
  } else {
      darkModeBtn.textContent = "Dark Mode";
  }
});