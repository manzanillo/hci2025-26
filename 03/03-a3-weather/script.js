const btn = document.getElementById("btn");
const output = document.getElementById("output");

btn.addEventListener("click", async () => {
  const lat = document.getElementById("lat").value;
  const lon = document.getElementById("lon").value;
  output.innerHTML = "⏳ Lade Wetterdaten...";
  output.classList.remove("visible");

  try {
    // API-URL zusammenbauen
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Serverfehler oder ungültige Anfrage");
    const data = await response.json();

    // Daten extrahieren
    const temp = data.current.temperature_2m;
    const wind = data.current.wind_speed_10m;
    const time = data.current.time;

    // Im HTML anzeigen
    output.innerHTML = `
      <p><strong>Temperatur:</strong> ${temp} °C</p>
      <p><strong>Wind:</strong> ${wind} km/h</p>
      <p><em>Stand: ${time}</em></p>
    `;
    output.classList.add("visible");
  } catch (err) {
    output.innerHTML = `⚠️ Fehler: ${err.message}`;
    output.classList.add("visible");
  }
});
