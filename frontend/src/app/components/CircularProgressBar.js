import React from "react";
import CountUp from "react-countup";

const CircularProgressBar = ({ progress, decimals }) => {
  const radius = 60; // Increased radius for padding
  const strokeWidth = 10;
  const padding = 10; // Added padding
  const normalizedRadius = radius - strokeWidth / 2 - padding;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="circular-progress-container">
      <svg
        height={(radius + padding) * 2}
        width={(radius + padding) * 2}
        className="circular-progress-bar"
      >
        {/* Background circle (unfilled part) */}
        <circle
          stroke="lightgrey"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius + padding}
          cy={radius + padding}
        />
        {/* Foreground circle (filled part), color changed to #181825 */}
        <circle
          stroke="#181825" // Changed filled color
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius + padding}
          cy={radius + padding}
        />
      </svg>
      <span className="progress-value">
        <CountUp end={progress} duration={5} suffix="%" decimals={decimals} />
      </span>
    </div>
  );
};

export default CircularProgressBar;
