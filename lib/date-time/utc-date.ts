/*

 - UTC Date and Time Utility Functions
 - convert utc time to local
 - convert local time to UTC

*/

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import type { TNullish } from "@/store/api/common-api-types";

import { getDateWithCurrentTime } from "./date-time";

dayjs.extend(utc);
dayjs.extend(timezone);

// get timezone
const getUserTimeZone = () => {
  if (typeof Intl !== "object" || !Intl.DateTimeFormat) {
    throw new Error("Intl.DateTimeFormat is not supported in this environment");
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!timeZone) {
    throw new Error("Could not resolve the user's time zone");
  }

  return timeZone;
};

// convert utc time to local

export type TConvertUTCToLocalArgs = {
  utcDateTime?: string | TNullish;
  timeZone?: string;
  format?: string;
};

const convertUTCToLocal = ({
  utcDateTime,
  timeZone,
  format = "MMM DD, YYYY",
}: TConvertUTCToLocalArgs): string => {
  if (!utcDateTime) {
    return "";
  }
  const tz = timeZone ?? getUserTimeZone();
  return dayjs.utc(utcDateTime).tz(tz).format(format);
};

export type TConvertLocalToUTCArgs = {
  localDateTime?: Date;
  timeZone?: string;
  format?: string;
  type?: "endOfDay" | "withCurrentTime" | "startOfDay";
};

// convert local time to UTC
const convertLocalToUTC = ({
  localDateTime,
  timeZone,
  format,
  type,
}: TConvertLocalToUTCArgs): string => {
  if (!localDateTime) {
    return "";
  }
  const tz = timeZone ?? getUserTimeZone();

  if (type === "withCurrentTime") {
    const getDateTime = getDateWithCurrentTime(localDateTime);
    return dayjs.tz(getDateTime, tz).utc().toISOString();
  }

  if (type === "endOfDay") {
    return dayjs.tz(localDateTime, tz).endOf("day").utc().toISOString();
  }
  if (type === "startOfDay") {
    return dayjs.tz(localDateTime, tz).startOf("day").utc().toISOString();
  }

  if (format && format !== "") {
    return dayjs.tz(localDateTime, tz).utc().format(format);
  }
  return dayjs.tz(localDateTime, tz).utc().toISOString();
};

// convert utc string to local date

const convertUTCToLocalDate = ({
  utcDateTime,
}: {
  utcDateTime?: string;
}): Date | undefined => dayjs(convertUTCToLocal({ utcDateTime })).toDate();

const combineDateAndTimeToUTC = ({
  date,
  time,
}: {
  date: TNullish | Date;
  time: string;
}): string => {
  if (!date || !time) {
    throw new Error("Both date and time are required.");
  }

  const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
  if (!timeRegex.test(time)) {
    throw new Error(
      `Invalid time format: "${time}". Please use 'HH:mm' format.`,
    );
  }

  const formattedDate = dayjs(date).format("YYYY-MM-DD");

  const combinedDateTime = `${formattedDate}T${time}`;

  const convertedDateTime = convertLocalToUTC({
    localDateTime: new Date(combinedDateTime),
  });
  return convertedDateTime;
};

export {
  getUserTimeZone,
  convertLocalToUTC,
  convertUTCToLocal,
  convertUTCToLocalDate,
  combineDateAndTimeToUTC,
};
