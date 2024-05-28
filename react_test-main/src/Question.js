import React from 'react';
import './Question.css';

const Question = ({ question, answers, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className="question-container">
      <h3 className="question-title">{question}</h3>
      {answers && answers.map((answer, index) => (
        <div key={index} className="answer-option">
          <input
            type="radio"
            id={`answer${index}`}
            name={`question`}
            checked={selectedAnswer === index}
            onChange={() => onAnswerSelect(index)}
            className="radio-input"
          />
          <label htmlFor={`answer${index}`}>{answer.answer}</label>
        </div>
      ))}
    </div>
  );
};

export default Question;
