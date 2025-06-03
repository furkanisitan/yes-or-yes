import { useState, useRef, useEffect } from 'react';
import type { Answer, Position } from '../../models';
import EscapeBox from '../boxes/EscapeBox';
import { ResponsiveHelper } from '../../utils/helpers';

export type AnswerContainerProps = {
  answers: Answer[];
  onCorrect: () => void;
};

const AnswerContainer = (props: AnswerContainerProps) => {
  const [positions, setPositions] = useState<Record<number, Position>>({});
  const boxRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const scale = ResponsiveHelper.getScale();
  const answers = props.answers.map((answer) => ({
    ...answer,
    width: answer.width * scale,
    height: answer.height * scale,
  }));

  useEffect(() => {
    if (answers.length > 0 && Object.keys(positions).length === 0) {
      setPositions(getRealPositions());
    }
  }, [answers]);

  function handleMove(answer: Answer) {
    const allPositions = Object.values(positions);
    const newPosition = getRandomPosition(allPositions, answer.width, answer.height);

    setPositions((prev) => ({
      ...prev,
      [answer.id]: newPosition,
    }));
  }

  function getRealPositions(): Record<number, Position> {
    const positions: Record<number, Position> = {};
    Object.entries(boxRefs.current).forEach(([id, el]) => {
      if (el) {
        positions[Number(id)] = {
          x: el.offsetLeft,
          y: el.offsetTop,
        };
      }
    });
    return positions;
  }

  return (
    <div className="flex flex-wrap justify-center gap-1 md:gap-2 lg:gap-4">
      {answers.map((answer) => (
        <EscapeBox
          ref={(el) => {
            boxRefs.current[answer.id] = el;
          }}
          key={answer.id}
          answer={answer}
          position={positions[answer.id]}
          onMove={() => handleMove(answer)}
          onCorrect={props.onCorrect}
        />
      ))}
    </div>
  );
};

function getRandomPosition(existingPositions: Position[], width: number, height: number): Position {
  const margin = 10;
  const maxX = window.innerWidth - width - margin;
  const maxY = window.innerHeight - height - margin;
  let tries = 0;
  let pos: Position;
  do {
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    pos = { x, y };
    tries++;
  } while (existingPositions.some((p) => Math.abs(p.x - pos.x) < width + margin && Math.abs(p.y - pos.y) < height + margin) && tries < 100);
  return pos;
}

export default AnswerContainer;
