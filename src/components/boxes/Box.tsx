import { motion, type MotionProps } from 'motion/react';
import React from 'react';

export type BoxProps = {
  type: 'text' | 'image';
  value: string;
  ref?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
  animate?: MotionProps['animate'];
  transition?: MotionProps['transition'];
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
};

function renderBoxContent(type: string, value: string) {
  if (type === 'image') {
    return <img src={`/images/${value}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  } else if (type === 'text') {
    return <span>{value}</span>;
  }
}

function Box(props: BoxProps) {
  const { type, value, ref, style, animate, transition, onClick, onMouseEnter } = props;

  const boxClass =
    type === 'image'
      ? 'flex items-center justify-center font-semibold text-lg cursor-default'
      : 'bg-yellow-100 text-red-700 rounded-xl flex items-center justify-center font-semibold text-lg cursor-default';

  return (
    <motion.div
      className={boxClass}
      ref={ref}
      style={style}
      animate={animate}
      transition={transition}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {renderBoxContent(type, value)}
    </motion.div>
  );
}

export default Box;
