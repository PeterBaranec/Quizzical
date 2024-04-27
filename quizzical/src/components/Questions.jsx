import { useEffect, useState } from "react";
import Question from "./Question";
import Answer from "./Answer";
import "./Questions.css";
import { motion } from "framer-motion";

function Questions() {
  const [quizData, setQuizData] = useState({
    questions: [],
    correctGuesses: 0,
  });

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newQuizz, setNewQuizz] = useState(true);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const API_URL = "https://opentdb.com/api.php?amount=5&type=multiple";

  useEffect(() => {
    const controller = new AbortController();
    const fetchQuestions = async () => {
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        const data = await res.json();
        setQuizData({
          ...quizData,
          questions: data.results.map((question) => ({
            ...question,
            incorrect_answers: shuffleArray([
              ...question.incorrect_answers,
              question.correct_answer,
            ]),
          })),
        });
        setLoading(false);
        setNewQuizz(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    if (newQuizz) {
      fetchQuestions();
    }

    return () => {
      controller.abort();
    };
  }, [newQuizz]);

  const handleAnswerSelection = (question, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [question]: answer,
    });
  };

  const checkAnswers = () => {
    let correctGuesses = 0;
    quizData.questions.forEach((question) => {
      if (selectedAnswers[question.question] === question.correct_answer) {
        correctGuesses++;
      }
    });
    setQuizData({
      ...quizData,
      correctGuesses: correctGuesses,
    });
    setShowResults(true);
  };

  const startNewQuizz = () => {
    setShowResults(false);
    setNewQuizz(true);
    setSelectedAnswers({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      className="questions"
    >
      {loading ? (
        "Loading..."
      ) : (
        <>
          {quizData.questions.map((question) => (
            <div className="container" key={question.question}>
              <Question question={question.question} />
              <div className="answers">
                {question.incorrect_answers.map((answer) => (
                  <Answer
                    answer={answer}
                    key={answer}
                    name={question.question}
                    isSelected={selectedAnswers[question.question] === answer}
                    isCorrect={
                      selectedAnswers[question.question] ===
                      question.correct_answer
                    }
                    isCorrectAnswer={answer === question.correct_answer}
                    onSelect={() =>
                      handleAnswerSelection(question.question, answer)
                    }
                    showResults={showResults}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="flex__flow">
            {showResults ? (
              <motion.button
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                onClick={startNewQuizz}
              >
                New Quizz
              </motion.button>
            ) : (
              <motion.button
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                onClick={checkAnswers}
              >
                Check Answers
              </motion.button>
            )}
            {showResults && (
              <motion.p
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
              >
                Number of correct answers: {quizData.correctGuesses} out of{" "}
                {quizData.questions.length}
              </motion.p>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}

export default Questions;
