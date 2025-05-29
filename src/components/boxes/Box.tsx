import { motion, type MotionProps } from "motion/react";
import React, { useImperativeHandle } from "react";
import { useIsMobile } from "../../hooks";

export interface BoxProps {
  label: string;
  ref?: React.Ref<BoxHandle>;
  width?: number;
  height?: number;
  onChoice?: React.MouseEventHandler<HTMLDivElement>;
}

export interface BoxHandle {
  width: number;
  height: number;
}

function Box(props: BoxProps & MotionProps) {
  const { label, ref, width = 100, height = 100, onChoice, ...restProps } = props;
  const isMobile = useIsMobile();

  useImperativeHandle(ref, () => ({
    width,
    height,
  }));

  console.log(isMobile);
  return (
    <motion.div
      className="bg-yellow-100 text-red-700 rounded-xl flex items-center justify-center font-semibold text-lg cursor-default"
      style={{
        width,
        height,
      }}
      onClick={isMobile ? onChoice : undefined}
      onMouseEnter={isMobile ? undefined : onChoice}
      {...restProps}
    >
      <span>{label}</span>
    </motion.div>
  );
}

export default Box;
