import { motion } from "framer-motion";
import "./Quizzical.css";

function Quizzical(props) {
  return (
    <div className="flex">
      <motion.h1
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        Quizzical
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        some description if needed
      </motion.p>
      <motion.button
        animate={{
          scale: [1, 2, 2, 1],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: 0,
          repeatDelay: 1,
        }}
        onClick={props.startQuiz}
      >
        Start quiz
      </motion.button>
    </div>
  );
}

export default Quizzical;
