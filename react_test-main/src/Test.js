import React, { useState } from 'react';

const Test = ({ selectedQuestions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setCorrectAnswersCount(0);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }

    if (currentQuestionIndex === selectedQuestions.length - 1) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div>
      {!showQuiz && (
        <button onClick={handleStartQuiz}>Start Quiz</button>
      )}
      {showQuiz && !showResults && (
        <div>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <h3>{selectedQuestions[currentQuestionIndex].question}</h3>
          {selectedQuestions[currentQuestionIndex].answers.map((answer, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`answer-${index}`}
                name="answer"
                onChange={() => handleAnswer(answer.isCorrect)}
              />
              <label htmlFor={`answer-${index}`}>{answer.answer}</label>
            </div>
          ))}
          <button onClick={handleAnswer}>Next Question</button>
        </div>
      )}
      {showResults && (
        <div>
          <h2>Test Results</h2>
          <p>Correct Answers: {correctAnswersCount} out of {selectedQuestions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Test;
