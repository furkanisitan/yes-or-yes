import { useRef, useState, useEffect } from "react";
import Box from "./Box";

type EscapeBoxProps = {
  label: string;
};

function EscapeBox({ label }: EscapeBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxSize, setBoxSize] = useState({ width: 100, height: 100 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [boxStyle, setBoxStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (boxRef.current) {
      setBoxSize({
        width: boxRef.current.offsetWidth,
        height: boxRef.current.offsetHeight,
      });
    }
  }, []);

  const handleChoice = () => {
    if (!boxRef.current) return;

    if (!boxStyle.position) {
      setBoxStyle({
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: -(boxSize.width) / 2,
        marginTop: -(boxSize.height) / 2,
      });
    }

    setPosition((prev) => getRandomPosition(prev, boxSize.width, boxSize.height));
  };

  return (
    <div
      style={{
        width: boxSize.width,
        height: boxSize.height,
      }}
    >
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
        style={boxStyle}
      />
    </div>
  );
}

export default EscapeBox;

function getRandomPosition(prev: { x: number; y: number }, boxWidth: number, boxHeight: number) {
  const width = window.innerWidth - boxWidth - MARGIN;
  const height = window.innerHeight - boxHeight - MARGIN;

  let x, y;
  let tries = 0;
  do {
    x = Math.floor(Math.random() * width) - width / 2;
    y = Math.floor(Math.random() * height) - height / 2;
    tries++;
  } while (Math.abs(x - prev.x) < boxWidth + MARGIN && Math.abs(y - prev.y) < boxHeight + MARGIN && tries < 10);
  return { x, y };
}

const MARGIN = 20;
