import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PlayQuiz = () => {
  const { quizId } = useParams();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const quizData = localStorage.getItem(quizId);
    if (quizData) {
      setQuizQuestions(JSON.parse(quizData));
    } else {
      console.error('Quiz not found');
    }
  }, [quizId]);

  const handleAnswerChange = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  if (quizQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-1000 dark:bg-gray-800">
        <p>Loading quiz...</p>
      </div>
    );
  }

  const windowSizeClass = "w-112 h-112"; // 28rem x 28rem

  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-1000 dark:bg-gray-800">
        <div className={`bg-white dark:bg-gray-700 p-20 rounded shadow-md ${windowSizeClass} flex flex-col items-center justify-center border border-gray-300 dark:border-gray-800`}>
          <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Quiz Results</h2>
          <p className="text-lg mb-4 text-gray-800 dark:text-gray-300">Your Score: {score} / {quizQuestions.length}</p>
          <button
            onClick={handleRestartQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-1000 dark:bg-gray-800">
      <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Play the Quiz</h2>
      <div className={`bg-white dark:bg-gray-700 p-6 rounded shadow-md ${windowSizeClass} flex flex-col justify-between border border-gray-300 dark:border-gray-600`}>
        <div>
          <h3 className="text-lg mb-2 text-gray-900 dark:text-gray-300">{currentQuestion.question}</h3>
          <ul>
            {currentQuestion.incorrectAnswers.concat(currentQuestion.correctAnswer).map((answer, idx) => (
              <li key={idx} className="border p-2 mb-2 text-gray-900 dark:text-gray-300">
                <label>
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={answer}
                    onChange={() => handleAnswerChange(answer)}
                    checked={selectedAnswer === answer}
                    className="mr-2"
                  />
                  {answer}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 self-center"
        >
          {currentQuestionIndex + 1 === quizQuestions.length ? 'Submit Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default PlayQuiz;
