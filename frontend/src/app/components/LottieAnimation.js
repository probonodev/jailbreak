import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";

const LottieAnimation = ({ animationData }) => {
  const animationRef = useRef(null);

  const handleScroll = () => {
    if (animationRef.current && animationRef.current.animationItem) {
      console.log(animationRef.current.animationItem);
      animationRef.current.setSpeed(5);
    }

    const scrollPercentage =
      (window.scrollY / (document.body.offsetHeight - window.innerHeight)) *
      100;

    const totalFrames = animationRef.current.animationItem.totalFrames;
    const frameToGo = (scrollPercentage * totalFrames) / window.innerHeight;
    animationRef.current.goToAndStop(frameToGo, true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const style = {
    width: 300,
    position: "relative",
    top: "-150vh",
    margin: "auto",
    zIndex: 99,
  };

  return (
    <Lottie
      lottieRef={animationRef}
      animationData={animationData}
      style={style}
      autoplay={false}
    />
  );
};

export default LottieAnimation;
