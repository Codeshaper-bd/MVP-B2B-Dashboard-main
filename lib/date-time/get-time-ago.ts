import dayjs from "dayjs";

export type TGetTimeAgoArgs = {
  inputDate: string | null | undefined;
};
export type TGetTimeAgoReturnType = string;
export function getTimeAgo({
  inputDate,
}: TGetTimeAgoArgs): TGetTimeAgoReturnType {
  if (!inputDate || typeof inputDate !== "string") {
    return "";
  }
  const date = dayjs(inputDate);
  const now = dayjs();

  const diffInMinutes = now.diff(date, "minute");
  const diffInHours = now.diff(date, "hour");
  const diffInDays = now.diff(date, "day");

  if (diffInMinutes < 1) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  } else {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }
}
