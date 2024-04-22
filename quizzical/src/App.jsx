import { useState } from "react";
import "./App.css";
import Quizzical from "./components/Quizzical";
import Questions from "./components/Questions";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <>{!quizStarted ? <Quizzical startQuiz={startQuiz} /> : <Questions />}</>
  );
}

export default App;
