import React, { useState, useRef } from 'react';
import './SwipeKeyboard.css';

const SwipeKeyboard = ({ onKeyPress, typedText }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);
  const [swipeWord, setSwipeWord] = useState('');
  const [currentKey, setCurrentKey] = useState(null);
  const [keyStartTime, setKeyStartTime] = useState(null);
  const [keyDwellTimes, setKeyDwellTimes] = useState(new Map());
  const [mouseDownPosition, setMouseDownPosition] = useState(null);
  const [hasMoved, setHasMoved] = useState(false);
  const keyboardRef = useRef(null);

  const DWELL_THRESHOLD = 100; // Mindestverweildauer in ms
  const DOUBLE_THRESHOLD = 300; // Zeit für doppelte Buchstaben in ms
  const CLICK_THRESHOLD = 200; // Maximalzeit für einen Klick vs. Swipe
  const MOVE_THRESHOLD = 10; // Maximale Bewegung für einen Klick

  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
    ['y', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-']
  ];

  const getKeyAtPosition = (x, y) => {
    const keyboardRect = keyboardRef.current.getBoundingClientRect();
    const relativeX = x - keyboardRect.left;
    const relativeY = y - keyboardRect.top;

    const keyElements = keyboardRef.current.querySelectorAll('.swipe-key');
    for (let element of keyElements) {
      const rect = element.getBoundingClientRect();
      const elementRelativeX = rect.left - keyboardRect.left;
      const elementRelativeY = rect.top - keyboardRect.top;

      if (relativeX >= elementRelativeX &&
          relativeX <= elementRelativeX + rect.width &&
          relativeY >= elementRelativeY &&
          relativeY <= elementRelativeY + rect.height) {
        return element.textContent.toLowerCase();
      }
    }
    return null;
  };

  const addKeyToWord = (key) => {
    const lastChar = swipeWord[swipeWord.length - 1];
    
    // Wenn es der gleiche Buchstabe ist, prüfe Verweildauer
    if (key === lastChar) {
      const dwellTime = keyDwellTimes.get(key) || 0;
      if (dwellTime >= DOUBLE_THRESHOLD) {
        // Füge doppelten Buchstaben hinzu
        setSwipeWord(prev => prev + key);
        // Reset der Verweildauer für diesen Buchstaben
        setKeyDwellTimes(prev => new Map(prev.set(key, 0)));
      }
    } else {
      // Neuer Buchstabe
      setSwipeWord(prev => prev + key);
      setKeyDwellTimes(prev => new Map(prev.set(key, 0)));
    }
  };

  const handleMouseDown = (e) => {
    // Nicht preventDefault() - lasse normale Klicks durch
    const position = { x: e.clientX, y: e.clientY };
    
    setMouseDownPosition(position);
    setIsDrawing(true);
    setCurrentPath([position]);
    setSwipeWord('');
    setCurrentKey(null);
    setKeyStartTime(null);
    setKeyDwellTimes(new Map());
    setHasMoved(false);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const newPath = [...currentPath, { x: e.clientX, y: e.clientY }];
    setCurrentPath(newPath);

    // Prüfe ob sich die Maus bewegt hat
    if (mouseDownPosition) {
      const distance = Math.sqrt(
        Math.pow(e.clientX - mouseDownPosition.x, 2) + 
        Math.pow(e.clientY - mouseDownPosition.y, 2)
      );
      if (distance > MOVE_THRESHOLD) {
        setHasMoved(true);
      }
    }

    const key = getKeyAtPosition(e.clientX, e.clientY);
    const currentTime = Date.now();

    if (key) {
      if (key !== currentKey) {
        // Wechsel zu neuem Buchstaben - nur bei Swipe (Bewegung)
        if (currentKey && keyStartTime && hasMoved) {
          const dwellTime = currentTime - keyStartTime;
          if (dwellTime >= DWELL_THRESHOLD) {
            addKeyToWord(currentKey);
          }
        }
        
        // Neuen Buchstaben beginnen
        setCurrentKey(key);
        setKeyStartTime(currentTime);
      } else {
        // Auf gleichem Buchstaben verweilen
        if (keyStartTime) {
          const dwellTime = currentTime - keyStartTime;
          setKeyDwellTimes(prev => new Map(prev.set(key, dwellTime)));
        }
      }
    } else {
      // Nicht über einem Buchstaben - nur bei Swipe
      if (currentKey && keyStartTime && hasMoved) {
        const dwellTime = currentTime - keyStartTime;
        if (dwellTime >= DWELL_THRESHOLD) {
          addKeyToWord(currentKey);
        }
      }
      setCurrentKey(null);
      setKeyStartTime(null);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      // Nur Swipe-Verhalten wenn sich die Maus bewegt hat
      if (hasMoved) {
        const currentTime = Date.now();
        let finalWord = swipeWord;
        
        // Letzten Buchstaben hinzufügen falls noch nicht geschehen
        if (currentKey && keyStartTime) {
          const dwellTime = currentTime - keyStartTime;
          if (dwellTime >= DWELL_THRESHOLD) {
            const lastChar = finalWord[finalWord.length - 1];
            
            // Wenn es der gleiche Buchstabe ist, prüfe Verweildauer für Dopplung
            if (currentKey === lastChar) {
              const currentDwellTime = keyDwellTimes.get(currentKey) || dwellTime;
              if (currentDwellTime >= DOUBLE_THRESHOLD) {
                finalWord += currentKey;
              }
            } else {
              // Neuer Buchstabe - einfach hinzufügen
              finalWord += currentKey;
            }
          }
        }

        // Sofort das finale Wort senden (nur bei Swipe)
        if (finalWord) {
          // Prüfe ob ein Leerzeichen vorab hinzugefügt werden soll
          const needsSpacePrefix = typedText && typedText.length > 0 && !typedText.endsWith(' ');
          
          if (needsSpacePrefix) {
            onKeyPress(' ' + finalWord);
          } else {
            onKeyPress(finalWord);
          }
        }
      }
      // Bei normalen Klicks (ohne Bewegung) wird das onClick-Event der Buttons verarbeitet
    }
    
    setIsDrawing(false);
    setCurrentPath([]);
    setCurrentKey(null);
    setKeyStartTime(null);
    setMouseDownPosition(null);
    
    // Reset hasMoved nach kurzer Verzögerung um Click-Events zu ermöglichen
    setTimeout(() => {
      setHasMoved(false);
    }, 100);
    
    setTimeout(() => {
      setSwipeWord('');
      setKeyDwellTimes(new Map());
    }, 200);
  };

  const handleKeyClick = (key, e) => {
    // Verhindere Click wenn gerade ein Swipe aktiv war
    if (hasMoved) {
      e.preventDefault();
      return;
    }
    onKeyPress(key);
  };

  const handleSpaceClick = () => {
    if (!isDrawing) {
      onKeyPress(' ');
    }
  };

  const handleBackspaceClick = () => {
    if (!isDrawing) {
      onKeyPress('BACKSPACE');
    }
  };

  const renderPath = () => {
    if (currentPath.length < 2) return null;

    const pathString = currentPath
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ');

    return (
      <svg className="swipe-overlay">
        <path
          d={pathString}
          stroke="#ff4444"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {currentPath.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="3"
            fill="#ff4444"
          />
        ))}
      </svg>
    );
  };

  return (
    <div className="swipe-keyboard">
      <div className="keyboard-title">Swipe Tastatur</div>
      
      {/* Fest positionierte Preview-Box */}
      <div className="swipe-preview-container">
        <div className="swipe-preview">
          <div>Aktuelles Wort: <strong>{isDrawing ? swipeWord : ''}</strong></div>
          {isDrawing && currentKey && (
            <div className="current-key-indicator">
              Auf Buchstabe: <strong>{currentKey.toUpperCase()}</strong> 
              {keyDwellTimes.has(currentKey) && (
                <span className="dwell-time">
                  ({Math.round(keyDwellTimes.get(currentKey))}ms)
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div 
        className="swipe-keyboard-container"
        ref={keyboardRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key, keyIndex) => (
              <button
                key={keyIndex}
                className={`keyboard-key swipe-key ${currentKey === key ? 'active-key' : ''}`}
                onClick={(e) => handleKeyClick(key, e)}
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
      {renderPath()}
    </div>
  );
};

export default SwipeKeyboard;