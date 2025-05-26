import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export type BoxProps = {
  label: string;
  backgroundColor?: string;
  onSize?: (size: number) => void;
};

export type MotionProps = {
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  animate?: any;
  transition?: any;
};

function Box({ label, backgroundColor, style, onClick, animate, transition, onSize }: BoxProps & MotionProps) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const [boxSize, setBoxSize] = useState(50);

  useLayoutEffect(() => {
    if (labelRef.current) {
      const width = labelRef.current.scrollWidth;
      const height = labelRef.current.scrollHeight;
      const size = Math.max(50, Math.ceil(Math.sqrt(width * height)));
      setBoxSize(size);
      if (onSize) onSize(size);
    }
  }, [label, onSize]);

  return (
    <motion.div
      style={{
        ...boxStyle,
        backgroundColor: backgroundColor ?? boxStyle.backgroundColor,
        width: boxSize,
        height: boxSize,
        ...style,
      }}
      onClick={onClick}
      animate={animate}
      transition={transition}
    >
      <span ref={labelRef}>{label}</span>
    </motion.div>
  );
}

export default Box;

const boxStyle: React.CSSProperties = {
  backgroundColor: "#ff0088",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
  borderRadius: 8,
  fontWeight: "bold",
  fontSize: 12,
  perspective: 600,
};
