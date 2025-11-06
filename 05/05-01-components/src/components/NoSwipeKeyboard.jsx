import React from 'react';
import './NoSwipeKeyboard.css';

const NoSwipeKeyboard = ({ onKeyPress }) => {
  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
    ['y', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-']
  ];

  const handleKeyClick = (key) => {
    onKeyPress(key);
  };

  const handleSpaceClick = () => {
    onKeyPress(' ');
  };

  const handleBackspaceClick = () => {
    onKeyPress('BACKSPACE');
  };

  return (
    <div className="no-swipe-keyboard">
      <div className="keyboard-title">Standard Tastatur</div>
      <div className="keyboard-container">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key, keyIndex) => (
              <button
                key={keyIndex}
                className="keyboard-key"
                onClick={() => handleKeyClick(key)}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>
        ))}
        <div className="keyboard-row">
          <button className="keyboard-key space-key" onClick={handleSpaceClick}>
            LEERTASTE
          </button>
          <button className="keyboard-key backspace-key" onClick={handleBackspaceClick}>
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoSwipeKeyboard;