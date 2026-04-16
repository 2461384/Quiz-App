import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Home.css';

function Home({ setUserName }) {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = async (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      toast.error('Please enter your name');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/scores/check/${encodeURIComponent(name)}`);
      const hasAttempted = await response.json();

      if (hasAttempted) {
        console.log('User has already attempted the quiz:', name);
        toast.error('❌ No retries allowed!\n\nYou have already attempted this quiz once.\nEach person can attempt the quiz only once.', {
          position: 'top-center',
          autoClose: 4000,
        });
        setName('');
        return;
      }

      toast.success('Welcome! Starting your quiz...', {
        position: 'top-center',
        autoClose: 2000,
      });

      setTimeout(() => {
        setUserName(name);
        navigate('/quiz');
      }, 500);
    } catch (error) {
      console.error('Error checking attempts:', error);
      setUserName(name);
      navigate('/quiz');
    }
  };

  return (
    <div className="home-container">
      <ToastContainer />
      <div className="split-screen">
        
        {/* LEFT SECTION */}
        <div className="left-section">
          <div className="illustration">
            <img src="/images/quiz-side.png" alt="Quiz Illustration" />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="right-section">
          <div className="logo-section">
            <h1 className="app-title">Quiz Master</h1>
            <p className="tagline">Prepare, Play, and Perform!</p>
          </div>

          {/* Timeline */}
          <div className="timeline-container">
            <div className="timeline-step" data-tooltip="Step 1: Prepare for 10 questions">
              <div className="timeline-icon">📝</div>
              <p className="timeline-label">Get Ready</p>
              <span className="timeline-desc">10 Questions</span>
            </div>
            <div className="timeline-step" data-tooltip="Step 2: Answer within the time limit">
              <div className="timeline-icon">⏱</div>
              <p className="timeline-label">Take the Quiz</p>
            </div>
            <div className="timeline-step" data-tooltip="Step 3: Review your answers">
              <div className="timeline-icon">📄</div>
              <p className="timeline-label">Check Answers</p>
            </div>
            <div className="timeline-step" data-tooltip="Step 4: See your final score">
              <div className="timeline-icon">🏆</div>
              <p className="timeline-label">View Results</p>
              <span className="timeline-desc">See Your Scores</span>
            </div>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleStart}>
            <label htmlFor="username">Enter Your Name:</label>
            <input
              type="text"
              id="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name here..."
              className="input-field"
            />
            <button type="submit" className="btn-primary">START QUIZ</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
