import React from "react";
import { motion } from "motion/react";

export type BoxProps = {
  label: string;
};

export type MotionProps = {
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  animate?: any;
  transition?: any;
};

function Box({ label, style, onClick, animate, transition }: BoxProps & MotionProps) {
  return (
    <motion.div style={{ ...boxStyle, ...style }} onClick={onClick} animate={animate} transition={transition}>
      <span>{label}</span>
    </motion.div>
  );
}

export default Box;

const boxStyle: React.CSSProperties = {
  width: 75,
  height: 75,
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
