import { useRef, useState } from "react";
import Box from "./Box";

type EscapeBoxProps = {
  label: string;
};

function EscapeBox({ label }: EscapeBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleChoice = () => {
    if (!boxRef.current) {
      console.warn("Box reference is not set.");
      return;
    }

    const width = boxRef.current.offsetWidth;
    const height = boxRef.current.offsetHeight;
    setPosition((prev) => getRandomPosition(prev, width, height));
  };

  return (
    <Box
      ref={boxRef}
      label={label}
      onChoice={handleChoice}
      animate={position}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
    />
  );
}

export default EscapeBox;

function getRandomPosition(
  prev: { x: number; y: number },
  boxWidth: number,
  boxHeight: number
) {
  const width = window.innerWidth - boxWidth - MARGIN;
  const height = window.innerHeight - boxHeight - MARGIN;

  let x, y;
  let tries = 0;
  do {
    x = Math.floor(Math.random() * width) - width / 2;
    y = Math.floor(Math.random() * height) - height / 2;
    tries++;
  } while (
    Math.abs(x - prev.x) < boxWidth + MARGIN &&
    Math.abs(y - prev.y) < boxHeight + MARGIN &&
    tries < 10
  );
  return { x, y };
}

const MARGIN = 20;
