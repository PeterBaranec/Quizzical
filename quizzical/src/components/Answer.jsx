import { useEffect } from "react";
import "./Answer.css";
import { motion } from "framer-motion";
import { useAnimate, usePresence } from "framer-motion";

function Answer({
  answer,
  name,
  isSelected,
  isCorrect,
  onSelect,
  showResults,
  isCorrectAnswer,
}) {
  const styles = {
    backgroundColor: showResults
      ? isSelected
        ? isCorrect
          ? "green"
          : "red"
        : ""
      : "",
  };

  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(
          scope.current,
          { opacity: [0, 1] },
          { duration: 1, ease: "backIn", delay: 0.5 }
        );
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate(
          scope.current,
          { opacity: [1, 0] },
          { duration: 1, ease: "backOut", delay: 0.5 }
        );
        safeToRemove();
      };
      exitAnimation();
    }
  }, [isPresent]);

  return (
    <div ref={scope}>
      <input
        type="radio"
        id={answer}
        name={name}
        checked={isSelected}
        onChange={onSelect}
        disabled={showResults ? true : false}
      />
      <label
        htmlFor={answer}
        style={styles}
        className={showResults ? (isCorrectAnswer ? "green" : "") : ""}
      >
        {answer}
      </label>
    </div>
  );
}

export default Answer;
