// Datenquelle für unsere Tipps
const tippsData = [
    { text: "Nutze `const` standardmäßig und `let` nur, wenn eine Neuzuweisung der Variable nötig ist." },
    { text: "Template Literals (``) vereinfachen das Verketten von Strings und Variablen." },
    { text: "Der `===` Operator prüft auf Wert- UND Typgleichheit und ist sicherer als `==`." },
    { text: "Destructuring (`const { name } = person;`) macht den Code lesbarer und kürzer." },
    { text: "Arrow Functions (`=>`) bieten eine kompakte Syntax für Funktionen." }
];

// --- TEIL 1: Gemeinsame Implementierung ---

// a) HTML-Struktur ist in index.html, Styling in style.css

// b) DOM-Elemente selektieren und auf Klick-Event lauschen
const tipBox = document.getElementById('tip-box');
const newTipBtn = // TODO: Selektiere den Button mit der noch zu vergebenden ID

// c) Funktion für dynamischen Inhalt und Event Listener verbinden
function showRandomTip() {
    // TODO: Hier kommt die Logik für die Anzeige eines zufälligen Tipps rein.
    // 1. Eine zufällige Zahl zwischen 0 und der Länge des Arrays-1 generieren.
    // 2. Den Tipp an diesem Index aus dem Array holen.
    // 3. Den Text des Tipps in die 'tipBox' schreiben.
}

newTipBtn.addEventListener('click', () => {
    // Diese Funktion wird bei jedem Klick auf den Button aufgerufen
    console.log("Button geklickt!");
    // showRandomTip(); // Wird aktiviert, sobald die Funktion implementiert ist.
});


// --- TEIL 2: Selbstständige Erweiterung ---

// d) Logik erweitern: Wiederholungen vermeiden
// TODO: Erweitere die `showRandomTip` Funktion, damit nie zweimal derselbe Tipp hintereinander kommt.

// e) Neues Feature: Tipp in die Zwischenablage kopieren
// TODO: Füge ein "Kopieren"-Element hinzu und implementiere die Kopier-Funktionalität.

// f) Feinschliff: Visuelles Feedback und Animation
// TODO: Gib dem Nutzer visuelles Feedback beim Kopieren und animiere den Wechsel der Tipps.