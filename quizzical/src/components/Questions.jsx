import { useEffect, useState } from "react";
import Question from "./Question";

function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchQuestions() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple",
        { signal: controller.signal }
      );
      const data = await res.json();
      setQuestions(data.results);
    }
    fetchQuestions();
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const questionsArray = questions.map((question) => (
    <Question question={question.question} key={question.question} />
  ));

  return (
    <>
      <p>Questions</p>
      <div>{!questions.length ? "Loading..." : questionsArray}</div>
    </>
  );
}

export default Questions;
