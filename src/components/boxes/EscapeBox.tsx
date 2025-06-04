import { useState } from 'react';
import type { Answer, Position } from '../../models';
import Box from './Box';
import { useIsMobile } from '../../hooks';

export type EscapeBoxProps = {
  ref?: React.Ref<HTMLDivElement>;
  answer: Answer;
  position: Position;
  onMove: () => void;
  onCorrect: () => void;
};

const EscapeBox = (props: EscapeBoxProps) => {
  const { ref, answer, position, onMove, onCorrect } = props;
  const [boxStyle, setBoxStyle] = useState<React.CSSProperties>({});
  const isMobile = useIsMobile();

  function handleClick() {
    if (isMobile) return;
    if (!answer.isCorrect) return;
    onCorrect?.();
  }

  function handleMouseEnter() {
    if (isMobile) return;
    if (answer.isCorrect) return;
    animateBox();
  }

  function handleTouchStart() {
    if (answer.isCorrect) {
      onCorrect?.();
      return;
    }
    animateBox();
  }

  function animateBox() {
    if (!boxStyle.position) {
      setBoxStyle({
        position: 'absolute',
        left: '0',
        top: '0',
      });
    }

    onMove();
  }

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
        className={answer.className}
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
        onTouchStart={handleTouchStart}
      />
    </div>
  );
};

export default EscapeBox;
