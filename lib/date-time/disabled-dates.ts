import dayjs from "dayjs";

import type { TNullish } from "@/store/api/common-api-types";

export const disablePastDates = (date: Date): boolean =>
  dayjs(date).isBefore(dayjs().startOf("day"));

export type TDisableDatesOutsideRange = {
  date: Date;
  rangeStart: Date | TNullish;
  rangeEnd: Date | TNullish;
};
export const disableDatesOutsideRange = ({
  date,
  rangeStart,
  rangeEnd,
}: TDisableDatesOutsideRange): boolean => {
  if (!rangeStart || !rangeEnd) {
    return false;
  }

  const d = dayjs(date);
  const start = dayjs(rangeStart).startOf("day");
  const end = dayjs(rangeEnd).endOf("day");

  return d.isBefore(start) || d.isAfter(end);
};

export const disablePastDatesWithCurrentDate = (date: Date): boolean => {
  const inputDate = dayjs(date).startOf("day").valueOf();
  const today = dayjs().startOf("day").valueOf();
  return inputDate <= today;
};

export const disableFutureDates = (date: Date): boolean =>
  dayjs(date).isAfter(dayjs().startOf("day"));
