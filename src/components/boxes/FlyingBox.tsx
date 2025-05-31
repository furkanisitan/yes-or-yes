import { useState } from "react";
import Box from "./Box";

export type FlyingBoxProps = {
  label: string;
};

function FlyingBox({ label }: FlyingBoxProps) {
  const [isFlying, setIsFlying] = useState(false);

  const handleChoice = () => {
    setIsFlying(true);
  };

  return (
    <Box
      label={label}
      onChoice={handleChoice}
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
    />
  );
}

export default FlyingBox;
