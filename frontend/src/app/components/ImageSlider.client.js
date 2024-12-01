"use client";
import React, { useState } from "react";
import "../../styles/slider.css";
export default function ImageSlider(props) {
  const [slides, setSlides] = useState(props.challenges);

  const nextSlide = () => {
    const next = slides.concat(slides.splice(0, 1));
    setSlides([...next]);
  };

  const prevSlide = () => {
    const last = slides.pop();
    setSlides([last, ...slides]);
  };

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const charLimit = !isMobile ? 5000 : 100;
  return (
    <div className="container">
      <div className="slider">
        {slides.map((item, index) => (
          <div
            className="slides"
            key={index}
            style={{
              backgroundImage:
                index < 2
                  ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.image})`
                  : `url(${item.image})`,
            }}
          >
            <div
              className="content"
              style={{
                textAlign: "left",
                zIndex: index < 2 ? 99 : 9,
                height: index < 2 ? "auto" : "0px",
              }}
            >
              <h2>{item.title}</h2>
              <span
                style={{
                  backgroundColor: "black",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  border: "2px solid",
                }}
              >
                {item.level}
              </span>
              <p>
                {isMobile ? item.label.slice(0, charLimit) + "..." : item.label}
              </p>
              <br />
              <a
                href={`/challenge/${item._id}`}
                style={{
                  zIndex: 99999999,
                  border: "2px solid",
                  padding: "0.8rem 2rem",
                  fontSize: "18px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  backgroundColor: "black",
                  color: "#ccc",
                  borderRadius: "50px",
                  textDecoration: "none",
                }}
                className="cta pointer"
              >
                Give it a try →
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <span className="prev pointer" onClick={prevSlide}></span>
        <span className="next pointer" onClick={nextSlide}></span>
      </div>
    </div>
  );
}
