import "./Answer.css";

function Answer({
  answer,
  name,
  isSelected,
  isCorrect,
  onSelect,
  showResults,
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
      />
      <label htmlFor={answer} style={styles}>
        {answer}
      </label>
    </>
  );
}

export default Answer;
