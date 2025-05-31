import { motion, type MotionProps } from 'motion/react';
import React from 'react';
import { useIsMobile } from '../../hooks';

export type BoxProps = {
  label: string;
  ref?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
  animate?: MotionProps['animate'];
  transition?: MotionProps['transition'];
  onChoice?: React.MouseEventHandler<HTMLDivElement>;
};

function Box(props: BoxProps) {
  const { label, ref, style, animate, transition, onChoice } = props;
  const isMobile = useIsMobile();

  return (
    <motion.div
      className="bg-yellow-100 text-red-700 rounded-xl flex items-center justify-center font-semibold text-lg cursor-default"
      ref={ref}
      style={{
        width: 100,
        height: 100,
        ...style,
      }}
      animate={animate}
      transition={transition}
      onClick={isMobile ? onChoice : undefined}
      onMouseEnter={isMobile ? undefined : onChoice}
    >
      <span>{label}</span>
    </motion.div>
  );
}

export default Box;
