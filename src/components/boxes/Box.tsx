import { motion, type MotionProps } from "motion/react";
import React, { useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
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
  const labelRef = useRef<HTMLSpanElement>(null);
  const [boxSize, setBoxSize] = useState(DEFAULT_BOX_SIZE);
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    if (!labelRef.current) return;

    const width = labelRef.current.scrollWidth;
    const height = labelRef.current.scrollHeight;
    const size = Math.max(DEFAULT_BOX_SIZE, Math.ceil(Math.sqrt(width * height)));
    setBoxSize(size);
  }, [label]);

  useImperativeHandle(ref, () => ({
    getBoxSize: () => boxSize,
  }));
console.log( isMobile);
  return (
    <motion.div
      style={{
        ...DEFAULT_BOX_STYLE,
        ...style,
        width: boxSize,
        height: boxSize,
      }}
      onClick={isMobile ? onChoice : undefined}
      onMouseEnter={isMobile ? undefined : onChoice}
      {...restProps}
    >
      <span ref={labelRef}>{label}</span>
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
  cursor: "default",
  userSelect: "none",
  borderRadius: 8,
  fontWeight: "bold",
  fontSize: 14,
  perspective: 600,
};
