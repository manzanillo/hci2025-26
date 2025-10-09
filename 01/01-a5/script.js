// - Klick auf #add-task soll eine neue Aufgabe hinzufügen
// - Aufgaben sollen als Bootstrap Cards angezeigt werden
// - Jede Aufgabe soll einen Delete-Button enthalten
// - Delete-Button soll per jQuery die Card entfernen (mit .fadeOut())
// - Badge (#task-count) soll immer die Anzahl offener Aufgaben anzeigen

$(document).ready(function() {
  // TODO: Aufgabe hier umsetzen

// Klick auf Add Task (Standard-Task)
  $("#add-task").on("click", function() {
    const taskHtml = `
      <div class="col-md-4">
        Task: Dies ist eine automatisch generierte Aufgabe.
      </div>
    `;
   
    $("#task-list").append(taskHtml);
  });
});
