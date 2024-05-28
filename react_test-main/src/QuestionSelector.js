import React, { useState } from 'react';
import './QuestionSelector.css'; 

const QuestionSelector = ({ testData, onQuestionsSelect }) => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(testData.questions.length).fill(null));
  const [errorMessage, setErrorMessage] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerSelect = (answerIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);

    // Перевіряємо, чи існують наступні питання
    if (currentQuestionIndex + 1 < testData.questions.length) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleQuestionsSubmit = () => {
    if (selectedAnswers.includes(null)) {
      setErrorMessage("Please select an answer for each question.");
    } else {
      setErrorMessage("");
      onQuestionsSelect(selectedAnswers);
    }
  };

  return (
    <div className="question-selector-container">
      {currentQuestionIndex < testData.questions.length ? (
        <>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <h2 className="question-selector-header">{testData.questions[currentQuestionIndex].question}</h2>
          {testData.questions[currentQuestionIndex].answers.map((answer, answerIndex) => (
            <div key={answerIndex}>
              <input
                type="radio"
                id={`answer-${currentQuestionIndex}-${answerIndex}`}
                name={`answer-${currentQuestionIndex}`}
                onChange={() => handleAnswerSelect(answerIndex)}
                className="answer-radio"
              />
              <label htmlFor={`answer-${currentQuestionIndex}-${answerIndex}`}>{answer.answer}</label>
            </div>
          ))}
          <button onClick={handleQuestionsSubmit} className="start-test-button">Submit Answer</button>
        </>
      ) : (
        <button onClick={handleQuestionsSubmit} className="start-test-button">Submit Answers</button>
      )}
    </div>
  );
};

export default QuestionSelector;
