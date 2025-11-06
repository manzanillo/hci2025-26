import React from 'react';
import './WPMCounter.css';

const WPMCounter = ({ wpm, wordsTyped, timeElapsed, accuracy }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="wpm-counter">
      <div className="wpm-stats">
        <div className="stat-item main-stat">
          <div className="stat-value">{wpm}</div>
          <div className="stat-label">WPM</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{wordsTyped}</div>
          <div className="stat-label">Wörter</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{formatTime(timeElapsed)}</div>
          <div className="stat-label">Zeit</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{accuracy}%</div>
          <div className="stat-label">Genauigkeit</div>
        </div>
      </div>
    </div>
  );
};

export default WPMCounter;