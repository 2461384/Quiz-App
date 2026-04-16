import React from 'react';
import '../styles/Timer.css';

function Timer({ timeLeft }) {
  const getTimerColor = () => {
    if (timeLeft <= 10) return 'critical';
    if (timeLeft <= 30) return 'warning';
    return 'normal';
  };

  return (
    <div className={`timer ${getTimerColor()}`}>
      <div className="timer-display">
        <span className="timer-icon">⏱️</span>
        <span className="timer-value">{timeLeft}s</span>
      </div>
      {timeLeft <= 10 && <p className="timer-warning">Hurry up!</p>}
    </div>
  );
}

export default Timer;
