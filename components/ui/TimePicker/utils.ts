export const getHours = () => Array.from({ length: 12 }, (_, i) => i + 1);
export const getMinutes = (interval: number) =>
  Array.from({ length: 60 / interval }, (_, i) => i * interval);
