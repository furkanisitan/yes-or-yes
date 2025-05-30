import { motion, type MotionProps } from "motion/react";
import React, { useImperativeHandle, useRef, forwardRef } from "react";
import { useIsMobile } from "../../hooks";

export interface BoxProps {
  label: string;
  onChoice?: React.MouseEventHandler<HTMLDivElement>;
}

const Box = forwardRef<HTMLDivElement, BoxProps & MotionProps>((props, ref) => {
  const { label, onChoice, style, ...restProps } = props;
  const isMobile = useIsMobile();
  const divRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => divRef.current as HTMLDivElement);

  return (
    <motion.div
      ref={divRef}
      className="bg-yellow-100 text-red-700 rounded-xl flex items-center justify-center font-semibold text-lg cursor-default"
      style={{
        width: 100,
        height: 100,
        ...style
      }}
      onClick={isMobile ? onChoice : undefined}
      onMouseEnter={isMobile ? undefined : onChoice}
      {...restProps}
    >
      <span>{label}</span>
    </motion.div>
  );
});

export default Box;
