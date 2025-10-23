import Link from "next/link";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getActivityLink } from "@/lib/get-activity-link";
import type { TGetAnEmployeeActivityData } from "@/store/api/employees-logs/employees-log.types";
import { ArrowLeftIcon as ArrowLeftIcon } from "@/components/icons";
interface IActivityItemProps {
  activity: TGetAnEmployeeActivityData;
}
function ActivityItem({ activity }: IActivityItemProps) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-default-600">
        •{" "}
        {convertUTCToLocal({
          utcDateTime: activity?.createdAt,
          format: "DD/MM/YYYY HH:MM:A",
        })}
        :
      </span>
      <span
        className={`${activity.event.includes("create") ? "text-success" : ""}`}
      >
        {activity?.description}
      </span>
      <span
        className={`${activity.event.includes("create") ? "text-success" : ""}`}
      >
        #{activity?.subjectId}
      </span>
      <Link href={getActivityLink(activity)}>
        <ArrowLeftIcon className="size-5 rotate-180 text-primary" />
      </Link>
    </li>
  );
}

export default ActivityItem;
