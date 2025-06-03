import { useState, useRef, useEffect } from 'react';
import type { Answer, Position } from '../../models';
import EscapeBox from '../boxes/EscapeBox';
import { ResponsiveHelper } from '../../utils/helpers';

export type AnswerContainerProps = {
  answers: Answer[];
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

  const handleMove = (id: number, boxWidth: number, boxHeight: number) => {
    const allPositions = Object.values(positions);
    const newPosition = getRandomPosition(allPositions, boxWidth, boxHeight);

    setPositions((prev) => ({
      ...prev,
      [id]: newPosition,
    }));
  };

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
          onMove={() => handleMove(answer.id, answer.width, answer.height)}
        />
      ))}
    </div>
  );
};

function getRandomPosition(existingPositions: Position[], boxWidth: number, boxHeight: number): Position {
  const margin = 10;
  const width = window.innerWidth - boxWidth - margin;
  const height = window.innerHeight - boxHeight - margin;
  let tries = 0;
  let pos: Position;
  do {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    pos = { x, y };
    tries++;
  } while (existingPositions.some((p) => Math.abs(p.x - pos.x) < boxWidth + margin && Math.abs(p.y - pos.y) < boxHeight + margin) && tries < 100);
  return pos;
}

export default AnswerContainer;
