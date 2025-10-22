import type { TTimeRange } from "@/store/api/common-api-types";

type TFilterText = TTimeRange | "custom";
const getFilterText = (text: TFilterText) => {
  switch (text) {
    case "12h":
      return "vs last 12 hours";
    case "24h":
      return "vs yesterday";
    case "7d":
      return "vs last week";
    case "30d":
      return "vs last month";
    case "3m":
      return "vs last 3 months";
    case "6m":
      return "vs last 6 months";
    case "1y":
      return "vs last year";
    case "all":
      return "all time";
    case "custom":
      return "within the selected time period";
    default:
      return "all time";
  }
};
const getFilterTextDetails = (text: TFilterText) => {
  switch (text) {
    case "12h":
      return "In the time range of the past 12 hours";
    case "24h":
      return "In the time range of the past 24 hours";
    case "7d":
      return "In the time range of the past 7 days";
    case "30d":
      return "In the time range of the past 30 days";
    case "3m":
      return "In the time range of the past 3 months";
    case "6m":
      return "In the time range of the past 6 months";
    case "1y":
      return "In the time range of the past 1 year";
    case "all":
      return "In the time range of all time";
    case "custom":
      return "In the custom time range selected";
    default:
      return "All Time";
  }
};

export { getFilterText, getFilterTextDetails };
