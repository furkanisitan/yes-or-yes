import { useEffect, useRef, useState } from 'react';
import { useRefCurrent } from '../../hooks';
import type { Answer } from '../../models';
import Box from './Box';

export type EscapeBoxProps = {
  answer: Answer;
  ref?: React.Ref<HTMLDivElement>;
};

const EscapeBox = (props: EscapeBoxProps) => {
  const { answer } = props;
  const ref = props.ref ?? useRef<HTMLDivElement>(null);
  const refCurrent = useRefCurrent(ref);
  const [boxSize, setBoxSize] = useState({ width: 100, height: 100 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [boxStyle, setBoxStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (refCurrent) {
      setBoxSize({
        width: refCurrent.offsetWidth,
        height: refCurrent.offsetHeight,
      });
    }
  }, []);

  const handleChoice = () => {
    if (!boxStyle.position) {
      setBoxStyle({
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -boxSize.width / 2,
        marginTop: -boxSize.height / 2,
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
        ref={ref}
        label={answer.label}
        onChoice={handleChoice}
        animate={position}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }}
        style={boxStyle}
      />
    </div>
  );
};

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
