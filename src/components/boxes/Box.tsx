import { motion, type MotionProps } from "motion/react";
import React, { useImperativeHandle } from "react";
import { useIsMobile } from "../../hooks";

export interface BoxProps {
  ref?: React.Ref<BoxHandle>;
  label: string;
  onChoice?: React.MouseEventHandler<HTMLDivElement>;
}

export interface BoxHandle {
  getBoxSize: () => number;
}

function Box(props: BoxProps & MotionProps) {
  const { label, ref, style, onChoice, ...restProps } = props;
  const isMobile = useIsMobile();

  useImperativeHandle(ref, () => ({
    getBoxSize: () => 100,
  }));

  console.log(isMobile);
  return (
    <motion.div
      className="bg-yellow-100 text-red-700 rounded-xl w-[100px] h-[100px] flex items-center justify-center font-semibold text-lg cursor-default"
      onClick={isMobile ? onChoice : undefined}
      onMouseEnter={isMobile ? undefined : onChoice}
      {...restProps}
    >
      <span>{label}</span>
    </motion.div>
  );
}

export default Box;
