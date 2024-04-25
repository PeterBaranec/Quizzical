import { useEffect, useState } from "react";
import Question from "./Question";
import Answer from "./Answer";
import "./Questions.css";

function Questions() {
  const [quizData, setQuizData] = useState({
    questions: [],
    correctGuesses: 0,
  });

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const [loading, setLoading] = useState(true);
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
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();

    return () => {
      controller.abort();
    };
  }, []);

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

  return (
    <div className="questions">
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
          <div className="flex">
            <button onClick={checkAnswers}>Check Answers</button>
            {showResults && (
              <p>
                Number of correct answers: {quizData.correctGuesses} out of{" "}
                {quizData.questions.length}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Questions;
