import "./Answer.css";

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
  return (
    <>
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
    </>
  );
}

export default Answer;
