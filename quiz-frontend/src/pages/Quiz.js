import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ProgressBar from '../components/ProgressBar';
import '../styles/Quiz.css';

function Quiz({ userName, setQuizScore, setTotalQuestions }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizComplete, setQuizComplete] = useState(false);
  const navigate = useNavigate();

  // Fetch once at quiz start
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/questions', {
          params: { limit: 50 } // request a large pool
        });

        // Deduplicate by ID
        const seen = new Set();
        const uniqueQuestions = response.data.filter(q => {
          if (seen.has(q.id)) return false;
          seen.add(q.id);
          return true;
        });

        // Shuffle AFTER deduplication
        const shuffled = [...uniqueQuestions].sort(() => Math.random() - 0.5);

        // Take only the first 10 for this quiz session
        const selected = shuffled.slice(0, 10);

        setQuestions(selected);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Timer logic
  useEffect(() => {
    if (quizComplete) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
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
  }, [quizComplete, currentQuestionIndex, questions.length]);

  const handleAnswerSelect = (answerId) => {
    const currentQuestion = questions[currentQuestionIndex];
    setSelectedAnswers({
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
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setTimeLeft(60);
    }
  };

  const completeQuiz = async () => {
    setQuizComplete(true);
    setTotalQuestions(questions.length);
    setQuizScore(score);

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
          disabled={currentQuestionIndex === 0}
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
