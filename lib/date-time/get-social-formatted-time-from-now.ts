import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function getSocialFormattedTimeFromNow(
  date: dayjs.ConfigType,
  fallback: string = "",
): string {
  if (!date) {
    return fallback;
  }
  return dayjs(date).fromNow();
}
