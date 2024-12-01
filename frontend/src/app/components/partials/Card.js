import React, { useState } from "react";
import "../../../styles/Carousel.css";
import Image from "next/image";

const Card = ({ char }) => {
  return (
    <div className={`challengeCard active`}>
      <img src={char.image} alt={char.name} />

      <div className="challenge-card-info">
        <h2>{char.name}</h2>
        <hr />
        <p>{char.label}</p>
        <p className={`level ${char.level}`}>{char.level}</p>
        <button
          className="pointer"
          onClick={() => window.open(`/challenge/${char.id}`, "_blank")}
        >
          Break {char.name} →
        </button>
      </div>
    </div>
  );
};

export default Card;
