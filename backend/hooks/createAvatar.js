const generateRandomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;
const getRandomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const hairColors = [
  "#000",
  "#fff",
  "#77311D",
  "#FC909F",
  "#D2EFF3",
  "#506AF4",
  "#F48150",
];

export const generateAvatar = () => {
  const config = {
    sex: Math.random() > 0.5 ? "man" : "woman",
    faceColor: generateRandomColor(),
    earSize: Math.random() > 0.5 ? "small" : "big",
    hairStyle: ["thick", "normal", "mohawk", "bald"][
      Math.floor(Math.random() * 4)
    ],

    hairColor: getRandomFromArray(hairColors),
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
  return config;
};
