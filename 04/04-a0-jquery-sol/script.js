// - Klick auf #add-task soll eine neue Aufgabe hinzufügen
// - Aufgaben sollen als Bootstrap Cards angezeigt werden
// - Jede Aufgabe soll einen Delete-Button enthalten
// - Delete-Button soll per jQuery die Card entfernen (mit .fadeOut())
// - Badge (#task-count) soll immer die Anzahl offener Aufgaben anzeigen

$(document).ready(function() {
  // Funktion zum Aktualisieren der Task-Anzahl
  function updateTaskCount() {
    const taskCount = $("#task-list .col-md-4").length;
    $("#task-count").text(taskCount);
  }

  // Klick auf Add Task (Standard-Task)
  $("#add-task").on("click", function() {
    const taskHtml = `
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Aufgabe</h5>
            <p class="card-text">Dies ist eine automatisch generierte Aufgabe.</p>
            <button class="btn btn-danger delete-task">Löschen</button>
          </div>
        </div>
      </div>
    `;
   
    $("#task-list").append(taskHtml);
    updateTaskCount();
  });

  // Event-Delegation für Delete-Buttons
  $("#task-list").on("click", ".delete-task", function() {
    $(this).closest(".col-md-4").fadeOut(400, function() {
      $(this).remove();
      updateTaskCount();
    });
  });

  // Initiale Task-Anzahl setzen
  updateTaskCount();
});
