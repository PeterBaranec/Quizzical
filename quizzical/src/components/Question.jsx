import "./Question.css";

function Question(props) {
  return (
    <>
      <h2 className="question">{props.question}</h2>
    </>
  );
}

export default Question;
