export const data = [
  {
    id: crypto.randomUUID(),
    name: "ETNA ROSSO VULKA",
    category: "Wines",
    soldBy: "Volume",
    predictedCount: "Alchohol",
    barbackCount: "26 oz",
  },
];

export type TDataProps = (typeof data)[0];
