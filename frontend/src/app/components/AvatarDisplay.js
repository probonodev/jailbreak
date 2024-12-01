import React, { useState, useEffect } from "react";
import NiceAvatar from "react-nice-avatar";

const AvatarDisplay = ({ address }) => {
  const [avatarConfig, setAvatarConfig] = useState(null);

  const generateRandomColor = () =>
    `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`;

  const generateAvatar = () => {
    const config = {
      sex: Math.random() > 0.5 ? "man" : "woman",
      faceColor: generateRandomColor(),
      earSize: Math.random() > 0.5 ? "small" : "big",
      hairStyle: ["thick", "normal", "mohawk", "bald"][
        Math.floor(Math.random() * 4)
      ],
      hairColor: generateRandomColor(),
      eyeStyle: ["circle", "oval", "smile", "star", "round"][
        Math.floor(Math.random() * 5)
      ],
      glassesStyle: ["round", "square", "none"][Math.floor(Math.random() * 3)],
      noseStyle: Math.random() > 0.5 ? "short" : "long",
      mouthStyle: ["smile", "laugh", "peace", "serious"][
        Math.floor(Math.random() * 4)
      ],
      shirtStyle: ["hoody", "short", "polo", "formal"][
        Math.floor(Math.random() * 4)
      ],
      shirtColor: generateRandomColor(),
      bgColor: generateRandomColor(),
    };
    setAvatarConfig(config);
  };

  useEffect(() => {
    generateAvatar();
  }, []);

  return <NiceAvatar style={{ width: 30, height: 30 }} {...avatarConfig} />;
};

export default AvatarDisplay;
