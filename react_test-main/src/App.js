import React, { useState } from 'react';
import Question from './Question';
// import './App.css';
import './QuestionSelector.css'; // Підключаємо стилі

const testData = {
  testName: "Hiking and Trekking Test",
  questions: [
    {
      question: "What is the most essential item to bring on a hike?",
      answers: [
        { answer: "Water", isCorrect: true },
        { answer: "Snacks", isCorrect: false },
        { answer: "Map", isCorrect: false },
        { answer: "Camera", isCorrect: false }
      ]
    },
    {
      question: "Which of these mountains is the highest in the world?",
      answers: [
        { answer: "Mount Everest", isCorrect: true },
        { answer: "K2", isCorrect: false },
        { answer: "Kangchenjunga", isCorrect: false },
        { answer: "Lhotse", isCorrect: false }
      ]
    },
    {
      question: "What should you do if you encounter a bear during a hike?",
      answers: [
        { answer: "Stay calm and slowly back away", isCorrect: true },
        { answer: "Run away as fast as you can", isCorrect: false },
        { answer: "Throw rocks at the bear", isCorrect: false },
        { answer: "Play dead", isCorrect: false }
      ]
    },
    {
      question: "Which of the following is a popular trekking destination in Nepal?",
      answers: [
        { answer: "Annapurna Circuit", isCorrect: true },
        { answer: "Inca Trail", isCorrect: false },
        { answer: "Tour du Mont Blanc", isCorrect: false },
        { answer: "Pacific Crest Trail", isCorrect: false }
      ]
    },
    {
      question: "What is the primary purpose of a trekking pole?",
      answers: [
        { answer: "To provide stability and reduce strain on joints", isCorrect: true },
        { answer: "To ward off wild animals", isCorrect: false },
        { answer: "To test the depth of water crossings", isCorrect: false },
        { answer: "To mark the trail", isCorrect: false }
      ]
    }
  ]
};

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(testData.questions.length).fill(null));
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswersCount(0);
    setShowResult(false);
  };

  const handleAnswerSelect = (index) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = index;
    setSelectedAnswers(newSelectedAnswers);

    if (testData.questions[currentQuestionIndex].answers[index].isCorrect) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < testData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="App">
      {currentQuestionIndex === -1 ? (
        <button onClick={handleStartQuiz} className="start-test-button">Start Quiz</button>
      ) : showResult ? (
        <div className="test-results">
          <h2>Test Results</h2>
          <p>User Score: {correctAnswersCount}/{testData.questions.length}</p>
        </div>
      ) : (
        <div>
          <Question
            question={testData.questions[currentQuestionIndex].question}
            answers={testData.questions[currentQuestionIndex].answers}
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
          />
          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button onClick={handlePreviousQuestion} className="prev-question-button">Previous Question</button>
            )}
            {currentQuestionIndex < testData.questions.length - 1 && (
              <button onClick={handleNextQuestion} className="next-question-button">Next Question</button>
            )}
            {currentQuestionIndex === testData.questions.length - 1 && (
              <button onClick={() => setShowResult(true)} className="finish-test-button">Finish Test</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
