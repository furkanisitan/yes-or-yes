import React, { useState } from "react";
import { motion } from "motion/react";
import boxStyle from "../styles";

type EscapeBoxProps = {
  label: string;
};

const BOX_SIZE = 100;
const MARGIN = 20;

function getRandomPosition(prev: { x: number; y: number }) {
  // Ekran boyutunu al
  const width = window.innerWidth - BOX_SIZE - MARGIN;
  const height = window.innerHeight - BOX_SIZE - MARGIN;

  let x, y;
  let tries = 0;
  do {
    x = Math.floor(Math.random() * width) - width / 2;
    y = Math.floor(Math.random() * height) - height / 2;
    tries++;
    // Önceki pozisyona çok yakınsa tekrar dene
  } while (
    Math.abs(x - prev.x) < BOX_SIZE + MARGIN &&
    Math.abs(y - prev.y) < BOX_SIZE + MARGIN &&
    tries < 10
  );
  return { x, y };
}

function EscapeBox({ label }: EscapeBoxProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClick = () => {
    setPosition((prev) => getRandomPosition(prev));
  };

  return (
    <motion.div
      style={{
        ...boxStyle,
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: -BOX_SIZE / 2,
        marginTop: -BOX_SIZE / 2,
      }}
      animate={position}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={handleClick}
    >
      <span>{label}</span>
    </motion.div>
  );
}

export default EscapeBox;