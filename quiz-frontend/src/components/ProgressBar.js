import React from 'react';
import '../styles/ProgressBar.css';

function ProgressBar({ progress }) {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="progress-text">{Math.round(progress)}% Complete</p>
    </div>
  );
}

export default ProgressBar;
