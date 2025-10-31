const btn = document.getElementById("btn");
const copyBtn = document.getElementById("copy");
const output = document.getElementById("output");
const latInput = document.getElementById("lat");
const lonInput = document.getElementById("lon");
const cityInput = document.getElementById("city");

// -----------------------------
// 1️⃣ Letzte Werte aus LocalStorage laden
// -----------------------------
window.addEventListener("DOMContentLoaded", () => {
  const savedCity = localStorage.getItem("lastCity");
  const savedLat = localStorage.getItem("lastLat");
  const savedLon = localStorage.getItem("lastLon");

  if (savedCity) cityInput.value = savedCity;
  if (savedLat && savedLon) {
    latInput.value = savedLat;
    lonInput.value = savedLon;
    fetchWeather(savedLat, savedLon, savedCity || "");
  }
});

// -----------------------------
// 2️⃣ Haupt-Button: Wetter anzeigen
// -----------------------------
btn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  const lat = latInput.value;
  const lon = lonInput.value;

  if (city) {
    // Stadt hat Priorität → Geocoding zuerst
    await fetchCoordinates(city);
  } else if (lat && lon) {
    // Wenn nur Koordinaten vorhanden
    localStorage.setItem("lastLat", lat);
    localStorage.setItem("lastLon", lon);
    fetchWeather(lat, lon, "");
  } else {
    showMessage("⚠️ Bitte Stadt oder Koordinaten eingeben.", "alert-warning");
  }
});

// -----------------------------
// 3️⃣ Stadt → Koordinaten (Geocoding-API)
// -----------------------------
async function fetchCoordinates(city) {
  output.innerHTML = "🔍 Suche Stadt...";
  output.classList.remove("visible");

  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=de`;
    const geoResponse = await fetch(geoUrl);
    if (!geoResponse.ok) throw new Error("Fehler bei der Stadtsuche");
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      showMessage("❌ Stadt nicht gefunden.", "alert-warning");
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];
    latInput.value = latitude;
    lonInput.value = longitude;

    // Speichern für spätere Nutzung
    localStorage.setItem("lastCity", name);
    localStorage.setItem("lastLat", latitude);
    localStorage.setItem("lastLon", longitude);

    fetchWeather(latitude, longitude, `${name}, ${country}`);
  } catch (err) {
    showMessage(`⚠️ Fehler: ${err.message}`, "alert-danger");
  }
}

// -----------------------------
// 4️⃣ Wetterdaten abrufen
// -----------------------------
async function fetchWeather(lat, lon, cityLabel = "") {
  output.innerHTML = "⏳ Lade Wetterdaten...";
  output.classList.remove("visible");

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Serverfehler oder ungültige Anfrage");

    const data = await response.json();
    const temp = data.current.temperature_2m;
    const wind = data.current.wind_speed_10m;
    const time = new Date(data.current.time).toLocaleTimeString("de-DE");

    // Temperaturabhängige Farbe
    const colorClass =
      temp > 25 ? "alert-danger" : temp < 10 ? "alert-info" : "alert-success";

    output.className = `alert text-center weather-box visible ${colorClass}`;
    output.innerHTML = `
      <h5 class="fade-in">${cityLabel || "Koordinaten"}</h5>
      <p class="fade-in">🌡️ <strong>Temperatur:</strong> ${temp} °C</p>
      <p class="fade-in">💨 <strong>Wind:</strong> ${wind} km/h</p>
      <p class="text-muted fade-in"><em>Stand: ${time}</em></p>
    `;
  } catch (err) {
    showMessage(`⚠️ Fehler: ${err.message}`, "alert-danger");
  }
}

// -----------------------------
// 5️⃣ Kopier-Button
// -----------------------------
copyBtn.addEventListener("click", async () => {
  const text = output.innerText.trim();
  if (!text || text.startsWith("⚠️") || text.startsWith("❌")) return;

  try {
    await navigator.clipboard.writeText(text);
    const original = copyBtn.innerHTML;
    copyBtn.innerHTML = "✅ Kopiert!";
    copyBtn.disabled = true;
    setTimeout(() => {
      copyBtn.innerHTML = original;
      copyBtn.disabled = false;
    }, 2000);
  } catch (err) {
    alert("Kopieren nicht möglich: " + err.message);
  }
});

// -----------------------------
// 6️⃣ Hilfsfunktion für Meldungen
// -----------------------------
function showMessage(msg, alertClass = "alert-secondary") {
  output.innerHTML = msg;
  output.className = `alert text-center weather-box visible ${alertClass}`;
}
