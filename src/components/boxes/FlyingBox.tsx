import React, { useState } from "react";
import { motion } from "motion/react";
import boxStyle from "./styles";

type FlyingBoxProps = {
  label: string;
};

function FlyingBox({ label }: FlyingBoxProps) {
  const [isFlying, setIsFlying] = useState(false);

  return (
    <>
      <motion.div
        style={boxStyle}
        animate={
          isFlying
            ? {
                y: -500,
                opacity: 0,
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.8, ease: "easeIn" },
              }
            : { rotate: 0 }
        }
        transition={{ duration: 1 }}
        onClick={() => setIsFlying(true)}
      >
        <span>{label}</span>
      </motion.div>
    </>
  );
}

export default FlyingBox;
