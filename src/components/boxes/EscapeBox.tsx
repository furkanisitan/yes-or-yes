import { useRef, useState } from "react";
import Box, { type BoxProps, type BoxHandle } from "./Box";

function EscapeBox(props: BoxProps) {
  const boxRef = useRef<BoxHandle>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClick = () => {
    const size = boxRef.current?.getBoxSize() ?? 50;
    setPosition((prev) => getRandomPosition(prev, size));
  };

  return <Box
    ref={boxRef}
    {...props}
    animate={position}
    transition={{ 
      type: "spring",
      stiffness: 400,
      damping: 20
    }}
    onClick={handleClick}
  />;
}

export default EscapeBox;

function getRandomPosition(prev: { x: number; y: number }, boxSize: number) {
  const width = window.innerWidth - boxSize - MARGIN;
  const height = window.innerHeight - boxSize - MARGIN;

  let x, y;
  let tries = 0;
  do {
    x = Math.floor(Math.random() * width) - width / 2;
    y = Math.floor(Math.random() * height) - height / 2;
    tries++;
  } while (Math.abs(x - prev.x) < boxSize + MARGIN && Math.abs(y - prev.y) < boxSize + MARGIN && tries < 10);
  return { x, y };
}

const MARGIN = 20;
