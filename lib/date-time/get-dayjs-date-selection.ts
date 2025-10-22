import dayjs from "dayjs";
import type { DateRange } from "react-day-picker";
export const getQuickTimeRange = (value: string): DateRange => {
  switch (value) {
    case "today":
      return {
        from: dayjs().startOf("day").toDate(),
        to: dayjs().endOf("day").toDate(),
      };

    case "yesterday":
      return {
        from: dayjs().subtract(1, "day").startOf("day").toDate(),
        to: dayjs().subtract(1, "day").endOf("day").toDate(),
      };

    case "thisWeek":
      return {
        from: dayjs().startOf("week").toDate(),
        to: dayjs().endOf("week").toDate(),
      };

    case "lastWeek":
      return {
        from: dayjs().subtract(1, "week").startOf("week").toDate(),
        to: dayjs().subtract(1, "week").endOf("week").toDate(),
      };

    case "thisMonth":
      return {
        from: dayjs().startOf("month").toDate(),
        to: dayjs().endOf("month").toDate(),
      };

    case "lastMonth":
      return {
        from: dayjs().subtract(1, "month").startOf("month").toDate(),
        to: dayjs().subtract(1, "month").endOf("month").toDate(),
      };

    case "thisYear":
      return {
        from: dayjs().startOf("year").toDate(),
        to: dayjs().endOf("year").toDate(),
      };

    case "lastYear":
      return {
        from: dayjs().subtract(1, "year").startOf("year").toDate(),
        to: dayjs().subtract(1, "year").endOf("year").toDate(),
      };

    case "allTime":
      return { from: new Date("2000-01-01"), to: new Date() };

    default:
      return { from: undefined, to: undefined };
  }
};
