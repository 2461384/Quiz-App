import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ProgressBar from '../components/ProgressBar';
import '../styles/Quiz.css';
 
function Quiz({ userName, setQuizScore, setTotalQuestions, setIncorrectAnswers, category, difficulty }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeExpiredForQuestions, setTimeExpiredForQuestions] = useState({}); // Track which questions timed out
  const navigate = useNavigate();
 
  // Fetch once at quiz start
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const params = { limit: 10 };
        if (category && category !== 'all') params.category = category;
        if (difficulty && difficulty !== 'all') params.difficulty = difficulty;

        const response = await axios.get('http://localhost:8080/api/questions/random', { params });

        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category, difficulty]);
 
  // Timer logic
  useEffect(() => {
    if (quizComplete) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Mark this question as timed out
          setTimeExpiredForQuestions(prev => ({
            ...prev,
            [currentQuestionIndex]: true
          }));
          
          setCurrentQuestionIndex(idx => {
            const nextIdx = idx + 1;
            if (nextIdx >= questions.length) {
              setQuizComplete(true);
            }
            return nextIdx < questions.length ? nextIdx : idx;
          });
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizComplete, currentQuestionIndex, questions.length]);  const handleAnswerSelect = (answerId) => { // User selects an answer
    const currentQuestion = questions[currentQuestionIndex]; // Get current question object
    setSelectedAnswers({ // Update selected answers state
      ...selectedAnswers, 
      [currentQuestionIndex]: answerId
    });
 
    if (answerId === currentQuestion.correctAnswerId) {
      setScore(prev => prev + 1);
    }
  };
 
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(60);
    } else {
      completeQuiz();
    }
  };
 
  const handlePrevious = () => {
    // Only allow going to previous question if current question didn't timeout
    if (currentQuestionIndex > 0 && !timeExpiredForQuestions[currentQuestionIndex]) {
      setCurrentQuestionIndex(prev => prev - 1);
      setTimeLeft(60);
    }
  };
 
  const completeQuiz = async () => {
    setQuizComplete(true);
    setTotalQuestions(questions.length);
    setQuizScore(score);

    const wrong = questions.reduce((acc, q, idx) => {
      const selectedId = selectedAnswers[idx];
      if (selectedId === q.correctAnswerId) return acc;
      const selectedOption = q.options.find(o => o.id === selectedId);
      const correctOption = q.options.find(o => o.id === q.correctAnswerId);
      acc.push({
        questionNumber: idx + 1,
        questionText: q.questionText,
        selectedAnswer: selectedOption ? selectedOption.optionText : (timeExpiredForQuestions[idx] ? '(time expired - no answer)' : '(not answered)'),
        correctAnswer: correctOption ? correctOption.optionText : ''
      });
      return acc;
    }, []);
    setIncorrectAnswers(wrong);

    try {
      await axios.post('http://localhost:8080/api/scores', {
        userName,
        score,
        totalQuestions: questions.length,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error saving score:', error);
    }

    setTimeout(() => {
      navigate('/results');
    }, 1000);
  };
 
  if (loading) {
    return <div className="quiz-container"><div className="loading">Loading questions...</div></div>;
  }
 
  if (questions.length === 0) {
    return <div className="quiz-container"><div className="loading">No questions available</div></div>;
  }
 
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
 
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-info">
          <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
          <p className="user-name">Welcome, <strong>{userName}</strong></p>
        </div>
        <div className="timer-section">
          <Timer timeLeft={timeLeft} />
        </div>
      </div>
 
      <ProgressBar progress={progress} />
 
      <div className="quiz-content">
        <QuestionCard
          question={currentQuestion}
          onAnswerSelect={handleAnswerSelect}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
        />
      </div>
 
      <div className="quiz-footer">
        <button
          className="btn btn-secondary"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0 || timeExpiredForQuestions[currentQuestionIndex]}
          title={timeExpiredForQuestions[currentQuestionIndex] ? 'Cannot go back - Time expired' : 'Go to previous question'}
        >
          ← Previous
        </button>
 
        <button
          className="btn btn-primary"
          onClick={currentQuestionIndex === questions.length - 1 ? completeQuiz : handleNext}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
 
export default Quiz;
 
//  STATE VARIABLES:
//     questions[]           → Array of 10 question objects from backend
//     currentQuestionIndex  → Which question is showing (0 to 9)
//     score                 → Running count of correct answers
//     selectedAnswers{}     → Object mapping {questionIndex: selectedOptionId}
//                             Example: {0: 45, 1: 23, 2: 67} means:
//                               Question 0 → selected option with ID 45
//                               Question 1 → selected option with ID 23
//                               Question 2 → selected option with ID 67
//     loading               → true while fetching questions
//     timeLeft              → Countdown from 60 to 0 (seconds)
//     quizComplete          → true when quiz is finished (stops timer)

// --- FETCHING QUESTIONS (runs once on page load) ---