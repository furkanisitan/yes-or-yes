import { useState } from 'react';
import type { Answer, Position } from '../../models';
import Box from './Box';
import { useIsMobile } from '../../hooks';
import { useSurveyContext } from '../../contexts/SurveyContext';
import { surveyService } from '../../services';

export type EscapeBoxProps = {
  ref?: React.Ref<HTMLDivElement>;
  answer: Answer;
  position: Position;
  onMove: () => void;
  onCorrect: () => void;
};

const EscapeBox = (props: EscapeBoxProps) => {
  const { surveyId, theme } = useSurveyContext();
  const { ref, answer, position, onMove, onCorrect } = props;
  const [boxStyle, setBoxStyle] = useState<React.CSSProperties>({});
  const isMobile = useIsMobile();

  function handleClick() {
    if (isMobile) return;
    if (!answer.isCorrect) return;
    onCorrect?.();
    surveyService.addAnswerLog(surveyId, answer);
  }

  function handleMouseEnter() {
    if (isMobile) return;
    if (answer.isCorrect) return;
    animateBox();
  }

  function handleTouchStart() {
    if (answer.isCorrect) {
      onCorrect?.();
      surveyService.addAnswerLog(surveyId, answer);
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
    surveyService.addAnswerLog(surveyId, answer);
  }

  return (
    <div
      style={{
        width: answer.boxSize.width,
        height: answer.boxSize.height,
      }}
    >
      <Box
        ref={ref}
        type={answer.type}
        value={answer.value}
        className={theme.answer}
        style={{
          width: answer.boxSize.width,
          height: answer.boxSize.height,
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
