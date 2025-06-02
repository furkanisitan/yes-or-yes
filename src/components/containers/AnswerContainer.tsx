import { useState } from 'react';
import { useIsMobile } from '../../hooks';
import type { Answer, Position } from '../../models';
import EscapeBox from '../boxes/EscapeBox';

export type AnswerContainerProps = {
  answers: Answer[];
};

const MOBILE_SCALE = 0.6;

const AnswerContainer = ({ answers }: AnswerContainerProps) => {
  const isMobile = useIsMobile();

  const [positions, setPositions] = useState<Record<number, Position>>({});

  const handleMove = (id: number, boxWidth: number, boxHeight: number) => {
    const allPositions = Object.values(positions);
    const newPosition = getRandomPosition(allPositions, boxWidth, boxHeight);

    setPositions((prev) => ({
      ...prev,
      [id]: newPosition,
    }));
  };

  return (
    <div className="flex flex-wrap justify-center gap-1 md:gap-2 lg:gap-4">
      {answers.map((answer) => {
        const width = isMobile ? answer.width * MOBILE_SCALE : answer.width;
        const height = isMobile ? answer.height * MOBILE_SCALE : answer.height;
        return (
          <EscapeBox
            key={answer.id}
            answer={{ ...answer, width, height }}
            position={positions[answer.id] || { x: 0, y: 0 }}
            onMove={() => handleMove(answer.id, width, height)}
          />
        );
      })}
    </div>
  );
};

function getRandomPosition(existingPositions: Position[], boxWidth: number, boxHeight: number): Position {
  const margin = 20;
  const width = window.innerWidth - boxWidth - margin;
  const height = window.innerHeight - boxHeight - margin;
  let tries = 0;
  let pos: Position;
  do {
    const x = Math.floor(Math.random() * width) - width / 2;
    const y = Math.floor(Math.random() * height) - height / 2;
    pos = { x, y };
    tries++;
  } while (existingPositions.some((p) => Math.abs(p.x - pos.x) < boxWidth + margin && Math.abs(p.y - pos.y) < boxHeight + margin) && tries < 100);
  return pos;
}

export default AnswerContainer;
