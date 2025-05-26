import React, { useState } from "react";
import { motion } from "motion/react";

interface AnswerBoxProps {
  label: string;
}

function AnswerBox({ label }: AnswerBoxProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      style={{
        width: 150,
        height: 100,
        backgroundColor: "#61dafb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
        borderRadius: 8,
        fontWeight: "bold",
        fontSize: 20,
        perspective: 600,
      }}
      animate={{
        rotate: isFlipped ? 360 : 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {label}
    </motion.div>
  );
}

export default AnswerBox;
