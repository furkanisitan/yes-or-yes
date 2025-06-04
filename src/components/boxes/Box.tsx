import { motion, type MotionProps } from 'motion/react';
import React from 'react';

export type BoxProps = {
  ref?: React.Ref<HTMLDivElement>;
  type: 'text' | 'image';
  value: string;
  className?: string;
  style?: React.CSSProperties;
  animate?: MotionProps['animate'];
  transition?: MotionProps['transition'];
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
};

function renderBoxContent(type: 'text' | 'image', value: string): React.ReactNode | null {
  switch (type) {
    case 'image':
      return (
        <img
          src={`/images/${value}`}
          alt={value}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none',
          }}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
        />
      );
    case 'text':
      return <span>{value}</span>;
    default:
      return null;
  }
}
function Box(props: BoxProps) {
  return (
    <motion.div
      className={`flex items-center justify-center cursor-default rounded-xl ${props.className}`}
      ref={props.ref}
      style={props.style}
      animate={props.animate}
      transition={props.transition}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onTouchStart={props.onTouchStart}
    >
      {renderBoxContent(props.type, props.value)}
    </motion.div>
  );
}

export default Box;
