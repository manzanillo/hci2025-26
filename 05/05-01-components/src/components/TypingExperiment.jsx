import React, { useState, useEffect, useCallback } from 'react';
import TextDisplay from './TextDisplay';
import NoSwipeKeyboard from './NoSwipeKeyboard';
import SwipeKeyboard from './SwipeKeyboard';
import WPMCounter from './WPMCounter';
import './TypingExperiment.css';

const TypingExperiment = () => {
  const [keyboardType, setKeyboardType] = useState('no-swipe'); // 'no-swipe' or 'swipe'
  const [targetText] = useState('Der schnelle braune Fuchs springt über den faulen Hund. Das ist ein Test für die Geschwindigkeit beim Tippen.');
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Timer für WPM Berechnung
  useEffect(() => {
    let interval;
    if (isStarted && !isCompleted) {
      interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, isCompleted]);

  const calculateWPM = useCallback(() => {
    if (!startTime || !isStarted) return 0;
    
    const timeElapsedMinutes = (currentTime - startTime) / (1000 * 60);
    const wordsTyped = typedText.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    if (timeElapsedMinutes === 0) return 0;
    return Math.round(wordsTyped / timeElapsedMinutes);
  }, [startTime, currentTime, typedText, isStarted]);

  const calculateAccuracy = useCallback(() => {
    if (typedText.length === 0) return 100;
    
    let correctChars = 0;
    for (let i = 0; i < Math.min(typedText.length, targetText.length); i++) {
      if (typedText[i].toLowerCase() === targetText[i].toLowerCase()) {
        correctChars++;
      }
    }
    
    return Math.round((correctChars / typedText.length) * 100);
  }, [typedText, targetText]);

  const getTimeElapsed = useCallback(() => {
    if (!startTime) return 0;
    return Math.floor((currentTime - startTime) / 1000);
  }, [startTime, currentTime]);

  const getWordsTyped = useCallback(() => {
    return typedText.trim().split(/\s+/).filter(word => word.length > 0).length;
  }, [typedText]);

  const handleKeyPress = (input) => {
    if (!isStarted) {
      setIsStarted(true);
      setStartTime(Date.now());
    }

    if (input === 'BACKSPACE') {
      setTypedText(prev => prev.slice(0, -1));
    } else {
      const newTypedText = typedText + input;
      setTypedText(newTypedText);
      
      // Prüfe ob der Text komplett UND korrekt ist (case-insensitive)
      if (newTypedText.length === targetText.length && newTypedText.toLowerCase() === targetText.toLowerCase()) {
        setIsCompleted(true);
      }
    }
  };

  const resetExperiment = () => {
    setTypedText('');
    setStartTime(null);
    setCurrentTime(Date.now());
    setIsStarted(false);
    setIsCompleted(false);
  };

  const switchKeyboard = () => {
    const newType = keyboardType === 'no-swipe' ? 'swipe' : 'no-swipe';
    setKeyboardType(newType);
    resetExperiment();
  };

  return (
    <div className="typing-experiment">
      <div className="experiment-header">
        <h1>Tastatur-Experiment</h1>
        <div className="experiment-controls">
          <button 
            className={`keyboard-switch ${keyboardType === 'no-swipe' ? 'active' : ''}`}
            onClick={() => keyboardType !== 'no-swipe' && switchKeyboard()}
          >
            Standard Tastatur
          </button>
          <button 
            className={`keyboard-switch ${keyboardType === 'swipe' ? 'active' : ''}`}
            onClick={() => keyboardType !== 'swipe' && switchKeyboard()}
          >
            Swipe Tastatur
          </button>
          <button className="reset-button" onClick={resetExperiment}>
            Zurücksetzen
          </button>
        </div>
      </div>

      <TextDisplay targetText={targetText} typedText={typedText} />

      {keyboardType === 'no-swipe' ? (
        <NoSwipeKeyboard onKeyPress={handleKeyPress} />
      ) : (
        <SwipeKeyboard onKeyPress={handleKeyPress} typedText={typedText} />
      )}

      <WPMCounter 
        wpm={calculateWPM()}
        wordsTyped={getWordsTyped()}
        timeElapsed={getTimeElapsed()}
        accuracy={calculateAccuracy()}
      />

      {isCompleted && (
        <div className="completion-message">
          <h2>🎉 Geschafft!</h2>
          <p>Sie haben den Text mit {calculateWPM()} WPM und {calculateAccuracy()}% Genauigkeit getippt!</p>
        </div>
      )}
    </div>
  );
};

export default TypingExperiment;