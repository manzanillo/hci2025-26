import React from 'react';
import './TextDisplay.css';

const TextDisplay = ({ targetText, typedText }) => {
  const renderText = () => {
    const typed = typedText || '';
    const result = [];
    
    // Renderiere jeden eingegebenen Buchstaben mit korrekter Farbcodierung
    for (let i = 0; i < typed.length; i++) {
      const isCorrect = i < targetText.length && typed[i].toLowerCase() === targetText[i].toLowerCase();
      const charClass = isCorrect ? 'correct-char' : 'incorrect-char';
      
      result.push(
        <span key={i} className={charClass}>
          {typed[i]}
        </span>
      );
    }
    
    // Füge den verbleibenden Text hinzu
    if (typed.length < targetText.length) {
      result.push(
        <span key="remaining" className="remaining-text">
          {targetText.substring(typed.length)}
        </span>
      );
    }
    
    return <div className="text-display">{result}</div>;
  };

  return (
    <div className="text-display-container">
      <h3>Bitte tippen Sie folgenden Text:</h3>
      {renderText()}
    </div>
  );
};

export default TextDisplay;