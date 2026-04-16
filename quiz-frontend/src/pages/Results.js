import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Results.css';

function Results({ userName, score, totalQuestions }) {
  const navigate = useNavigate();
  const [recentScores, setRecentScores] = useState([]);

  const fetchRecentScores = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/scores/user/' + userName);
      setRecentScores(response.data);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  }, [userName]);

  useEffect(() => {
    fetchRecentScores();
  }, [fetchRecentScores]);

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  const getGrade = () => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const getGradeColor = () => {
    const grade = getGrade();
    switch (grade) {
      case 'A':
        return '#4CAF50';
      case 'B':
        return '#2196F3';
      case 'C':
        return '#FF9800';
      case 'D':
        return '#FF5722';
      default:
        return '#F44336';
    }
  };

  return (
    <div className="results-container">
      <div className="results-content">
        <div className="results-header">
          <h1>Quiz Complete!</h1>
          <p className="result-user">Congratulations, <strong>{userName}</strong>!</p>
        </div>

        <div className="score-card">
          <div className="grade-badge" style={{ borderColor: getGradeColor() }}>
            <span className="grade-letter" style={{ color: getGradeColor() }}>
              {getGrade()}
            </span>
          </div>

          <div className="score-display-large">
            <h2>{score} / {totalQuestions}</h2>
            <p className="percentage">{percentage}%</p>
          </div>

          <div className="score-stats">
            <div className="stat-item">
              <span className="stat-label">Correct Answers</span>
              <span className="stat-value correct">{score}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Incorrect Answers</span>
              <span className="stat-value incorrect">{totalQuestions - score}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Accuracy</span>
              <span className="stat-value">{percentage}%</span>
            </div>
          </div>
        </div>

        <div className="performance-message">
          {percentage >= 90 && <p className="excellent">🎉 Excellent! You're a Quiz Master!</p>}
          {percentage >= 80 && percentage < 90 && <p className="good">👍 Great job! Keep it up!</p>}
          {percentage >= 70 && percentage < 80 && <p className="average">✓ Good effort! Practice more!</p>}
          {percentage < 70 && <p className="poor">💪 Keep practicing to improve!</p>}
        </div>

        {recentScores.length > 0 && (
          <div className="recent-scores">
            <h3>Your Recent Attempts</h3>
            <div className="scores-list">
              {recentScores.slice(0, 5).map((scoreRecord, index) => (
                <div key={index} className="score-row">
                  <span className="attempt-number">Attempt {index + 1}</span>
                  <span className="score-percentage">
                    {scoreRecord.score}/{scoreRecord.totalQuestions} ({Math.round((scoreRecord.score / scoreRecord.totalQuestions) * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="results-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/leaderboard')}
          >
            View Leaderboard
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
