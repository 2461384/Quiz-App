import React, { useState, useEffect } from 'react';
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
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <button className="theme-toggle" onClick={toggleDarkMode} title="Toggle Dark Mode">
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home
                setUserName={setUserName}
                category={category}
                setCategory={setCategory}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                isDarkMode={isDarkMode}
              />
            }
          />
          <Route 
            path="/quiz" 
            element={
              <Quiz
                userName={userName}
                setQuizScore={setQuizScore}
                setTotalQuestions={setTotalQuestions}
                setIncorrectAnswers={setIncorrectAnswers}
                category={category}
                difficulty={difficulty}
                isDarkMode={isDarkMode}
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
                incorrectAnswers={incorrectAnswers}
                isDarkMode={isDarkMode}
              />
            } 
          />
          <Route 
            path="/leaderboard" 
            element={<Leaderboard isDarkMode={isDarkMode} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

  // - Creates 3 state variables shared across ALL pages:
  //     userName       → set by Home page, used by Quiz and Results
  //     quizScore      → set by Quiz page, used by Results
  //     totalQuestions  → set by Quiz page, used by Results

  // - <Router> enables client-side navigation (no page reload).
  // - <Routes> maps URL paths to page components:
  //     /              → Home page
  //     /quiz          → Quiz page
  //     /results       → Results page
  //     /leaderboard   → Leaderboard page

  // - Props are passed DOWN to child components:
  //     Home receives: setUserName (to save the name)
  //     Quiz receives: userName, setQuizScore, setTotalQuestions
  //     Results receives: userName, quizScore, totalQuestions
  //     Leaderboard receives: nothing (fetches its own data)