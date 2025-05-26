import React, { useState } from "react";
import { motion } from "motion/react";
import boxStyle from "./styles";

type ShakyBoxProps = {
  label: string;
};

function ShakyBox({ label }: ShakyBoxProps) {
  const [isShaking, setIsShaking] = useState(false);

  return (
    <motion.div
      style={boxStyle}
      animate={
        isShaking
          ? {
              // Akışkan, kısa kısa titreşim ve yavaşça yok olma
              x: [0, -10, 10, -9, 9, -8, 8, -7, 7, -6, 6, -5, 5, -4, 4, -3, 3, -2, 2, -1, 1, 0],
              y: Array(22).fill(0),
              scale: [
                1, 0.98, 0.96, 0.94, 0.92, 0.90, 0.88, 0.86, 0.84, 0.82, 0.80,
                0.78, 0.76, 0.74, 0.72, 0.70, 0.65, 0.6, 0.5, 0.35, 0.2, 0
              ],
              opacity: [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0, 0
              ],
              rotate: [
                0, -8, 8, -7, 7, -6, 6, -5, 5, -4, 4,
                -3, 3, -2, 2, -1, 1, 0, 0, 0, 0, 0
              ],
              transition: {
                duration: 1.2,
                times: [
                  0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.50,
                  0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95, 0.98, 1
                ],
                ease: "easeInOut",
              },
            }
          : { scale: 1, x: 0, y: 0, opacity: 1, rotate: 0 }
      }
      transition={{ duration: 1.4 }}
      onClick={() => setIsShaking(true)}
    >
      <span>{label}</span>
    </motion.div>
  );
}

export default ShakyBox;
