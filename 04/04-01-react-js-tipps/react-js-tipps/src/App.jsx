import { useState } from 'react'
import './App.css'

// Datenquelle für unsere Tipps
const tippsData = [
    { text: "Nutze `const` standardmäßig und `let` nur, wenn eine Neuzuweisung der Variable nötig ist." },
    { text: "Template Literals (``) vereinfachen das Verketten von Strings und Variablen." },
    { text: "Der `===` Operator prüft auf Wert- UND Typgleichheit und ist sicherer als `==`." },
    { text: "Destructuring (`const { name } = person;`) macht den Code lesbarer und kürzer." },
    { text: "Arrow Functions (`=>`) bieten eine kompakte Syntax für Funktionen." },
    { text: "Nutze `Array.map()` und `Array.filter()` statt klassischen for-Schleifen für deklarativen Code." },
    { text: "Kommentiere den *Warum*-Aspekt deines Codes, nicht das Offensichtliche." }
];

function App() {
  const [currentTip, setCurrentTip] = useState("Klicke auf den Button, um einen Tipp zu erhalten!");
  const [lastTipIndex, setLastTipIndex] = useState(-1);
  const [isFading, setIsFading] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState("📋 Kopieren");
  const [isCopied, setIsCopied] = useState(false);

  const showRandomTip = () => {
    let randomIndex;

    // Wiederholungen vermeiden
    do {
      randomIndex = Math.floor(Math.random() * tippsData.length);
    } while (randomIndex === lastTipIndex);

    setLastTipIndex(randomIndex);
    const newTip = tippsData[randomIndex].text;

    // Fade-Effekt: kurz ausblenden, dann wieder einblenden
    setIsFading(true);
    setTimeout(() => {
      setCurrentTip(newTip);
      setIsFading(false);
    }, 300);
  };

  const copyToClipboard = () => {
    if (currentTip && currentTip !== "Klicke auf den Button, um einen Tipp zu erhalten!") {
      navigator.clipboard.writeText(currentTip)
        .then(() => {
          // Visuelles Feedback
          setCopyButtonText("✅ Kopiert!");
          setIsCopied(true);

          setTimeout(() => {
            setCopyButtonText("📋 Kopieren");
            setIsCopied(false);
          }, 2000);
        })
        .catch(err => {
          console.error("Kopieren fehlgeschlagen:", err);
        });
    }
  };

  return (
    <div className="app-container">
      <h1>Programmier-Tipp des Tages</h1>

      <div className={`tip-box ${isFading ? 'fade' : ''}`}>
        <p>{currentTip}</p>
      </div>

      <div className="button-row">
        <button onClick={showRandomTip} className="btn">💡 Neuer Tipp</button>
        <button 
          onClick={copyToClipboard} 
          className={`btn-secondary ${isCopied ? 'copied' : ''}`}
        >
          {copyButtonText}
        </button>
      </div>
    </div>
  )
}

export default App
