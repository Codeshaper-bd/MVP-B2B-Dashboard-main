import dayjs from "dayjs";

const TimeInterval = {
  Hour: "hour",
  Minute: "minute",
  Second: "second",
} as const;

export type TInterval = (typeof TimeInterval)[keyof typeof TimeInterval];

export type TGenerateTimeSlotsProps = {
  intervalUnit?: TInterval;
  duration?: number; // Duration in hours, default is 24
  interval: number; // Interval in minutes, e.g., 30
};

/**
 * Generate time slots for the given interval (hour, minute, second) and duration.
 * @param intervalUnit - The time unit (hour, minute, second)
 * @param duration - The duration in hours (default is 24 hours)
 * @param interval - The interval in minutes (e.g., 30 minutes)
 * @returns A list of time slots.
 */
export function generateTimeSlotsInADay({
  intervalUnit = TimeInterval.Minute,
  interval = 30,
  duration = 24,
}: TGenerateTimeSlotsProps): string[] {
  const timeSlots: string[] = [];

  const totalTimeUnits: number = (() => {
    switch (intervalUnit) {
      case TimeInterval.Hour:
        return duration;
      case TimeInterval.Minute:
        return (duration * 60) / interval;
      case TimeInterval.Second:
        return (duration * 3600) / interval;
      default:
        return 0;
    }
  })();

  for (let i = 0; i < totalTimeUnits; i++) {
    const totalSeconds =
      i * interval * (intervalUnit === TimeInterval.Second ? 1 : 60);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    timeSlots.push(
      intervalUnit === TimeInterval.Second
        ? `${timeString}:${String(seconds).padStart(2, "0")}`
        : timeString,
    );
  }

  return timeSlots;
}

export const getTodaysPastTimeSlots = (): string[] => {
  const timeSlots = generateTimeSlotsInADay({
    intervalUnit: "minute",
    interval: 30,
    duration: 24,
  });

  const currentTime = dayjs().format("HH:mm");

  const filteredTimeSlots = timeSlots.filter(
    (timeSlot) => timeSlot < currentTime,
  );

  return filteredTimeSlots;
};
