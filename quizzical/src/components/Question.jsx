import { useEffect } from "react";
import "./Question.css";
import { useAnimate, usePresence } from "framer-motion";

function Question(props) {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(
          scope.current,
          { opacity: [0, 1] },
          { duration: 1, ease: "backIn", delay: 0.2 }
        );
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate(
          scope.current,
          { opacity: [1, 0] },
          { duration: 1, ease: "backOut", delay: 0.2 }
        );
        safeToRemove();
      };
      exitAnimation();
    }
  }, [isPresent]);

  return (
    <>
      <h2 className="question" ref={scope}>
        {props.question}
      </h2>
    </>
  );
}

export default Question;
