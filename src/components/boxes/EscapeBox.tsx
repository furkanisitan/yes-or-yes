import { useState } from 'react';
import type { Answer, Position } from '../../models';
import Box from './Box';

export type EscapeBoxProps = {
  answer: Answer;
  ref?: React.Ref<HTMLDivElement>;
  position: Position;
  onMove: () => void;
};

const EscapeBox = (props: EscapeBoxProps) => {
  const { answer, ref, position, onMove } = props;
  const [boxStyle, setBoxStyle] = useState<React.CSSProperties>({});

  const handleClick = () => {
    if (answer.isCorrect) {
      alert('this is the correct answer!');
      return;
    }
  };

  const handleMouseEnter = () => {
    if (answer.isCorrect) return;

    if (!boxStyle.position) {
      setBoxStyle({
        position: 'absolute',
        left: '0',
        top: '0'
      });
    }

    onMove();
  };

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
        animate={boxStyle.position ? position : undefined}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }}
        style={{
          width: answer.width,
          height: answer.height,
          ...boxStyle,
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      />
    </div>
  );
};

export default EscapeBox;
