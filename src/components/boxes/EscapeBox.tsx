import { useState, useEffect } from 'react';
import type { Answer } from '../../models';
import Box from './Box';
import useIsMobile from '../../hooks/useIsMobile';

export type EscapeBoxProps = {
  answer: Answer;
  ref?: React.Ref<HTMLDivElement>;
};

const EscapeBox = (props: EscapeBoxProps) => {
  const isMobile = useIsMobile();

  const answer: Answer = {
    ...props.answer,
    width: (props.answer.width ?? 100) * (isMobile ? 0.6 : 1),
    height: (props.answer.height ?? 100) * (isMobile ? 0.6 : 1),
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [boxStyle, setBoxStyle] = useState<React.CSSProperties>({
    width: answer.width,
    height: answer.height,
  });

  useEffect(() => {
    setBoxStyle((prev) => ({
      ...prev,
      width: answer.width,
      height: answer.height,
    }));
  }, [isMobile, answer.width, answer.height]);

  const handleClick = () => {
    if (answer.isCorrect) {
      alert(isMobile);
      return;
    }
  };

  const handleMouseEnter = () => {
    if (answer.isCorrect) {
      return;
    }

    if (!boxStyle.position) {
      setBoxStyle((prev) => ({
        ...prev,
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -answer.width! / 2,
        marginTop: -answer.height! / 2,
      }));
    }

    setPosition(getRandomPosition());
  };

  function getRandomPosition() {
    const margin = 20;
    const width = window.innerWidth - answer.width! - margin;
    const height = window.innerHeight - answer.height! - margin;

    let x, y;
    let tries = 0;
    do {
      x = Math.floor(Math.random() * width) - width / 2;
      y = Math.floor(Math.random() * height) - height / 2;
      tries++;
    } while (Math.abs(x - position.x) < answer.width! + margin && Math.abs(y - position.y) < answer.height! + margin && tries < 10);
    return { x, y };
  }

  return (
    <div
      style={{
        width: boxStyle.width,
        height: boxStyle.height,
      }}
    >
      <Box
        ref={props.ref}
        type={answer.type}
        value={answer.value}
        animate={position}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }}
        style={{
          width: boxStyle.width,
          height: boxStyle.height,
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      />
    </div>
  );
};

export default EscapeBox;
