// --- Datenquelle für unsere Tipps ---
const tippsData = [
    { text: "Nutze `const` standardmäßig und `let` nur, wenn eine Neuzuweisung der Variable nötig ist." },
    { text: "Template Literals (``) vereinfachen das Verketten von Strings und Variablen." },
    { text: "Der `===` Operator prüft auf Wert- UND Typgleichheit und ist sicherer als `==`." },
    { text: "Destructuring (`const { name } = person;`) macht den Code lesbarer und kürzer." },
    { text: "Arrow Functions (`=>`) bieten eine kompakte Syntax für Funktionen." },
    { text: "Nutze `Array.map()` und `Array.filter()` statt klassischen for-Schleifen für deklarativen Code." },
    { text: "Kommentiere den *Warum*-Aspekt deines Codes, nicht das Offensichtliche." }
];

// --- DOM-Elemente selektieren ---
const tipBox = document.getElementById('tip-box');
const newTipBtn = document.getElementById('new-tip-btn');
const copyBtn = document.getElementById('copy-btn');

// Variable, um den zuletzt gezeigten Tipp zu merken
let lastTipIndex = -1;

// --- Funktion zum Anzeigen eines zufälligen Tipps ---
function showRandomTip() {
    let randomIndex;

    // Wiederholungen vermeiden
    do {
        randomIndex = Math.floor(Math.random() * tippsData.length);
    } while (randomIndex === lastTipIndex);

    lastTipIndex = randomIndex;

    const newTip = tippsData[randomIndex].text;

    // Für den Fade-in-Effekt: kurz ausblenden, dann wieder einblenden
    tipBox.classList.add('fade');
    setTimeout(() => {
        tipBox.innerHTML = `<p>${newTip}</p>`;
        tipBox.classList.remove('fade');
    }, 300);
}

// --- Event Listener: Button klick ---
newTipBtn.addEventListener('click', () => {
    showRandomTip();
});

// --- Funktion zum Kopieren in die Zwischenablage ---
copyBtn.addEventListener('click', () => {
    const currentTip = tipBox.textContent.trim();

    if (currentTip && currentTip !== "Klicke auf den Button, um einen Tipp zu erhalten!") {
        navigator.clipboard.writeText(currentTip)
            .then(() => {
                // Visuelles Feedback
                copyBtn.textContent = "✅ Kopiert!";
                copyBtn.classList.add('copied');

                setTimeout(() => {
                    copyBtn.textContent = "📋 Kopieren";
                    copyBtn.classList.remove('copied');
                }, 2000);
            })
            .catch(err => {
                console.error("Kopieren fehlgeschlagen:", err);
            });
    }
});
