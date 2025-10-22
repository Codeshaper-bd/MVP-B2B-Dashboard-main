export const createDelay = (delay: number): Promise<void> => {
  let timeoutId: NodeJS.Timeout | null = null;

  return new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = null;
      resolve();
    }, delay);
  });
};
