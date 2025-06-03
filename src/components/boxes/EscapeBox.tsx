import { useState, useCallback } from 'react';
import type { Answer, Position } from '../../models';
import Box from './Box';

export type EscapeBoxProps = {
  ref?: React.Ref<HTMLDivElement>;
  answer: Answer;
  position: Position;
  onMove: () => void;
};

const EscapeBox = (props: EscapeBoxProps) => {
  const { answer, ref, position, onMove } = props;
  const [boxStyle, setBoxStyle] = useState<React.CSSProperties>({});

  const handleClick = useCallback(() => {
    if (answer.isCorrect) {
      alert('this is the correct answer!');
      return;
    }
  }, [answer.isCorrect]);

  const handleMouseEnter = useCallback(() => {
    if (answer.isCorrect) return;

    if (!boxStyle.position) {
      setBoxStyle({
        position: 'absolute',
        left: '0',
        top: '0',
      });
    }

    onMove();
  }, [answer.isCorrect, boxStyle.position, onMove]);

  return (
    <div
      style={{
        width: answer.width,
        height: answer.height,
      }}
    >
      <Box
        ref={ref}
        type={answer.type}
        value={answer.value}
        style={{
          width: answer.width,
          height: answer.height,
          ...boxStyle,
        }}
        animate={boxStyle.position ? position : undefined}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      />
    </div>
  );
};

export default EscapeBox;
