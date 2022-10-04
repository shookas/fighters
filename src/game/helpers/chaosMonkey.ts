export const getRandomInt = (minMax: [number, number]): number => {
  const [min, max] = minMax;
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is exclusive and the minimum is inclusive
};

export const tossACoin = (probability: number): boolean => {
  return Math.random() < probability;
};
