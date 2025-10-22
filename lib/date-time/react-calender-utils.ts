import dayjs from "dayjs";

import { convertUTCToLocal, convertUTCToLocalDate } from "./utc-date";

const reactCalenderMinTime = new Date("1970-01-01T00:00:00");

const getReactCalenderMinTime = (selectedDate: string | null | undefined) => {
  const today = dayjs().startOf("day");

  // Always check if today is selected, regardless of whether a date is explicitly set
  // This handles both manual selection and default calendar behavior
  const isTodaySelected = selectedDate
    ? dayjs(selectedDate).startOf("day").isSame(today, "day")
    : false;

  if (isTodaySelected) {
    const currentTime = dayjs();
    const currentHour = currentTime.hour();
    const currentMinute = currentTime.minute();

    // Round up to the next 30-minute interval
    const roundedMinute = Math.ceil(currentMinute / 30) * 30;
    const adjustedHour = roundedMinute === 60 ? currentHour + 1 : currentHour;
    const adjustedMinute = roundedMinute === 60 ? 0 : roundedMinute;

    return new Date(
      `1970-01-01T${adjustedHour.toString().padStart(2, "0")}:${adjustedMinute.toString().padStart(2, "0")}:00`,
    );
  }

  return reactCalenderMinTime;
};

const getReactCalenderMaxTime = (
  formDate: string,
  endTime: string | undefined,
) => {
  const maxTimeString = convertUTCToLocal({
    utcDateTime: endTime,
    format: "HH:mm:ss",
  });
  const eventLastDay = dayjs(
    convertUTCToLocalDate({ utcDateTime: endTime }),
  ).startOf("day");

  const isEventLastDay =
    formDate && dayjs(formDate).startOf("day").isSame(eventLastDay, "day");

  return isEventLastDay
    ? new Date(`1970-01-01T${maxTimeString}`)
    : new Date("1970-01-01T23:59:59");
};

export {
  reactCalenderMinTime,
  getReactCalenderMinTime,
  getReactCalenderMaxTime,
};
