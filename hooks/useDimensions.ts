import { useState, useEffect } from "react";

type Dimensions = {
  width: number;
  screenWidth: number;
  height: number;
  screenHeight: number;
};

const getDimensions = (): Dimensions => {
  const { innerWidth: width, innerHeight: height, screen } = window;
  const { width: screenWidth, height: screenHeight } = screen;

  return {
    width,
    screenWidth,
    height,
    screenHeight
  };
};

const useDimensions = (): Dimensions => {
  const [dimensions, setDimensions] = useState(getDimensions());

  useEffect(() => {
    function handleResize() {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions;
};

export default useDimensions;
