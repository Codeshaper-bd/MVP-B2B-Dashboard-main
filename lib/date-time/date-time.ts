import dayjs from "dayjs";

import type { TNullish } from "@/store/api/common-api-types";

const getDateWithCurrentTime = (selectedDate: Date | TNullish): Date => {
  if (!selectedDate) {
    throw new Error("selectedDate is required.");
  }
  const now = dayjs();
  return dayjs(selectedDate)
    .hour(now.hour())
    .minute(now.minute())
    .second(now.second())
    .millisecond(now.millisecond())
    .toDate();
};

const isWithinTwoHours = ({
  dateTime,
}: {
  dateTime: string | TNullish;
}): boolean => {
  if (!dateTime) {
    return false;
  }
  const now = dayjs();
  const eventTime = dayjs(dateTime);
  const twoHoursAgo = now.subtract(2, "hour");
  const twoHoursFromNow = now.add(2, "hour");

  // Check if event is within the 2-hour window (both past and future)
  return eventTime.isAfter(twoHoursAgo) && eventTime.isBefore(twoHoursFromNow);
};

const convertToAMPM = (time24: string) => {
  const [hours, minutes] = time24.split(":").map(Number);

  if (hours === 0) {
    return `12:${minutes.toString().padStart(2, "0")} AM`;
  } else if (hours < 12) {
    return `${hours}:${minutes.toString().padStart(2, "0")} AM`;
  } else if (hours === 12) {
    return `12:${minutes.toString().padStart(2, "0")} PM`;
  } else {
    return `${hours - 12}:${minutes.toString().padStart(2, "0")} PM`;
  }
};

export { getDateWithCurrentTime, isWithinTwoHours, convertToAMPM };
