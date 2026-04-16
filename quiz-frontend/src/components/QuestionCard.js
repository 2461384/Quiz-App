import React from 'react';
import '../styles/QuestionCard.css';

function QuestionCard({ question, onAnswerSelect, selectedAnswer, questionNumber }) {
  return (
    <div className="question-card">
      <div className="question-text">
        <h3>{question.questionText}</h3>
      </div>

      <div className="options-container">
        {question.options.map((option) => (
          <label key={option.id} className="option-label">
            <input
              type="radio"
              name={`question-${questionNumber}`}
              value={option.id}
              checked={selectedAnswer === option.id}
              onChange={() => onAnswerSelect(option.id)}
              className="option-input"
            />
            <span className="option-text">{option.optionText}</span>
            {selectedAnswer === option.id && (
              <span className="checkmark">✓</span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
