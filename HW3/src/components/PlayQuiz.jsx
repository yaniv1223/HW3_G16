import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PlayQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

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

    setUserAnswers([...userAnswers, selectedAnswer]);
    setSelectedAnswer(null);

    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/quiz-summary', {
        state: {
          quizQuestions,
          userAnswers: [...userAnswers, selectedAnswer],
          score,
        },
      });
    }
  };

  if (quizQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-1000 dark:bg-gray-800">
        <p>Loading quiz...</p>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-1000 dark:bg-gray-800">
      <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Play the Quiz</h2>
      <div className={`bg-white dark:bg-gray-700 p-6 rounded shadow-md w-112 flex flex-col justify-between border border-gray-300 dark:border-gray-600`}>
        <div>
          <h3 className="text-lg mb-2 text-gray-900 dark:text-gray-300">{currentQuestion.question}</h3>
          <ul>
            {currentQuestion.incorrectAnswers.concat(currentQuestion.correctAnswer).map((answer, idx) => (
              <li 
                key={idx} 
                className={`border p-2 mb-2 text-gray-900 dark:text-gray-300 cursor-pointer flex items-center justify-between ${selectedAnswer === answer ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => handleAnswerChange(answer)}
              >
                <span>{answer}</span>
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
