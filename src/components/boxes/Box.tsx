import { motion } from "motion/react";
import React, { useImperativeHandle, useLayoutEffect, useRef, useState } from "react";

export interface BoxProps {
  ref?: React.Ref<BoxHandle>;
  label: string;
  backgroundColor?: string;
}

export interface MotionProps {
  animate?: any;
  style?: React.CSSProperties;
  transition?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface BoxHandle {
  getBoxSize: () => number;
}

function Box(props: BoxProps & MotionProps) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const [boxSize, setBoxSize] = useState(DEFAULT_BOX_SIZE);

  useLayoutEffect(() => {
    if (!labelRef.current) return;

    const width = labelRef.current.scrollWidth;
    const height = labelRef.current.scrollHeight;
    const size = Math.max(DEFAULT_BOX_SIZE, Math.ceil(Math.sqrt(width * height)));
    setBoxSize(size);
  }, [props.label]);

  useImperativeHandle(props.ref, () => ({
    getBoxSize: () => boxSize,
  }));

  return (
    <motion.div
      style={{
        ...DEFAULT_BOX_STYLE,
        width: boxSize,
        height: boxSize,
        ...props.style,
        backgroundColor: props.backgroundColor ?? DEFAULT_BOX_STYLE.backgroundColor,
      }}
      onClick={props.onClick}
      animate={props.animate}
      transition={props.transition}
    >
      <span ref={labelRef}>{props.label}</span>
    </motion.div>
  );
}

export default Box;

const DEFAULT_BOX_SIZE = 50;
const DEFAULT_BOX_STYLE: React.CSSProperties = {
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
