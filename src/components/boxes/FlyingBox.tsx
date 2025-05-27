import { useState } from "react";
import Box, { type BoxProps } from "./Box";

function FlyingBox({ label }: BoxProps) {
  const [isFlying, setIsFlying] = useState(false);

  return (
    <Box
      label={label}
      animate={
        isFlying
          ? {
              y: -500,
              opacity: 0,
              scale: 1.2,
              rotate: 360,
              transition: { duration: 0.8, ease: "easeIn" },
            }
          : { rotate: 0 }
      }
      transition={{ duration: 1 }}
      onClick={() => setIsFlying(true)}
    />
  );
}

export default FlyingBox;
