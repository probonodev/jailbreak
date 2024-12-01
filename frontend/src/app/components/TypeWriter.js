import React, { useState, useEffect } from "react";

const Typewriter = ({ text = "", typingDelay = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let index = 0;

    console.log(`Typing text: "${text}"`); // Debug text value

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index += 1;
      } else {
        clearInterval(timer);
      }
    }, typingDelay);

    return () => clearInterval(timer);
  }, [text, typingDelay]);

  return <div>{displayedText}</div>;
};

export default Typewriter;
