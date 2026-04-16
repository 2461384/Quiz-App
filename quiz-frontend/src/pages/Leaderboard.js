import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Leaderboard.css';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/scores/leaderboard');
      setLeaderboard(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLoading(false);
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-content">
        <div className="leaderboard-header">
          <h1>🏆 Leaderboard</h1>
          <p>Top Quiz Performers</p>
        </div>

        {loading ? (
          <div className="loading">Loading leaderboard...</div>
        ) : leaderboard.length === 0 ? (
          <div className="no-data">No scores yet. Be the first to take the quiz!</div>
        ) : (
          <div className="leaderboard-table">
            <div className="table-header">
              <div className="col rank">Rank</div>
              <div className="col name">User Name</div>
              <div className="col score">Score</div>
              <div className="col percentage">Percentage</div>
              <div className="col date">Date</div>
            </div>
            {leaderboard.map((entry, index) => (
              <div key={index} className={`table-row ${index < 3 ? `rank-${index + 1}` : ''}`}>
                <div className="col rank">
                  <span className="rank-badge">
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index >= 3 && (index + 1)}
                  </span>
                </div>
                <div className="col name">{entry.userName}</div>
                <div className="col score">{entry.score}/{entry.totalQuestions}</div>
                <div className="col percentage">
                  {Math.round((entry.score / entry.totalQuestions) * 100)}%
                </div>
                <div className="col date">
                  {new Date(entry.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          className="btn btn-primary"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;
