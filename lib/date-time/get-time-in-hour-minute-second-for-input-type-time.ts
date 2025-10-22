const padZero = (num: string) => num.padStart(2, "0");

export const getTimeInHourMinuteSecondForInputTypeTime = (
  time: string | undefined | null | void,
  fallback: string = "",
) => {
  if (!time) {
    return fallback;
  }

  const timeParts = time.split(":");

  if (timeParts.length === 1) {
    const [hours] = timeParts;
    return `${padZero(hours)}:00:00`;
  } else if (timeParts.length === 2) {
    const [hours, minutes] = timeParts;
    return `${padZero(hours)}:${padZero(minutes)}:00`;
  } else if (timeParts.length === 3) {
    const [hours, minutes, seconds] = timeParts;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  }

  return fallback;
};
