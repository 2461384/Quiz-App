import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Leaderboard from './pages/Leaderboard';
import './styles/App.css';

function App() {
  const [userName, setUserName] = useState('');
  const [quizScore, setQuizScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route 
            path="/" 
            element={<Home setUserName={setUserName} />} 
          />
          <Route 
            path="/quiz" 
            element={
              <Quiz 
                userName={userName} 
                setQuizScore={setQuizScore}
                setTotalQuestions={setTotalQuestions}
              />
            } 
          />
          <Route 
            path="/results" 
            element={
              <Results 
                userName={userName} 
                score={quizScore}
                totalQuestions={totalQuestions}
              />
            } 
          />
          <Route 
            path="/leaderboard" 
            element={<Leaderboard />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
