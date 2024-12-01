"use client";
import React, { useState, useEffect } from "react";
import "../page.module.css";
import Header from "../components/Header";
import ImageSlider from "../components/ImageSlider.client";
import { SERVER_URL } from "../Config.js";
import { RingLoader } from "react-spinners";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [challenges, setChallenges] = useState([]);

  const getChellenges = async () => {
    setLoading(true);
    const data = await axios
      .get(`/api/challenges`)
      .then((res) => res.data)
      .catch((err) => err);
    setChallenges(data);
    setLoading(false);
  };

  useEffect(() => {
    getChellenges();
  }, []);

  return (
    <main className="main" style={{ height: "100vh" }}>
      <Header />
      <h2 style={{ margin: "0px" }}>EXPLORE CHALLENGES</h2>
      {challenges && challenges.length > 0 ? (
        <ImageSlider challenges={challenges} />
      ) : (
        loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "75vh",
            }}
          >
            <RingLoader
              color="#ccc"
              cssOverride={{
                margin: "2rem auto",
              }}
            />
          </div>
        )
      )}
    </main>
  );
}
