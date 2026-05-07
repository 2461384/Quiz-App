import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Home.css';

function Home({ setUserName, category, setCategory, difficulty, setDifficulty }) {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [cats, diffs] = await Promise.all([
          fetch('http://localhost:8080/api/questions/categories').then(r => r.json()),
          fetch('http://localhost:8080/api/questions/difficulties').then(r => r.json())
        ]);
        setCategories(Array.isArray(cats) ? cats : []);
        setDifficulties(Array.isArray(diffs) ? diffs : []);
      } catch (err) {
        console.error('Error loading filters:', err);
      }
    };
    loadOptions();
  }, []);

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

            <div className="filter-row">
              <div className="filter-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="difficulty">Difficulty</label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Levels</option>
                  {difficulties.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary">START QUIZ</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;

// STEP-BY-STEP FLOW:
//   1. Page loads with an empty text input and "START QUIZ" button.
//   2. User types their name → stored in local state "name".
//   3. User clicks START QUIZ → handleStart() runs.
//   4. VALIDATION: If name is empty → show error toast → stop.
//   5. API CALL: GET /api/scores/check/{name}
//      → Backend checks if this name exists in quiz_scores table.
//      → Returns true (already attempted) or false (new user).
//   6. IF ALREADY ATTEMPTED:
//      → Show error toast: "No retries allowed!"
//      → Clear the input field.
//      → User CANNOT proceed.
//   7. IF NEW USER:
//      → Show success toast: "Welcome! Starting your quiz..."
//      → Call setUserName(name) → saves name in App.js state.
//      → navigate('/quiz') → goes to the Quiz page.
//   8. IF BACKEND IS DOWN (catch block):
//      → Still lets user proceed (graceful fallback).

// UI ELEMENTS:
//   - Left section: Quiz illustration image
//   - Right section: Title "Quiz Master", tagline, timeline steps, name input, button
//   - Timeline shows 4 steps: Get Ready → Take Quiz → Check Answers → View Results
//   - Toast notifications for errors/success (react-toastify library)


