import { memo } from "react";

import { cn } from "@/lib/utils";
import type { TPromoter } from "@/store/api/promoters/promoters.types";

import AssignedEventCard from "./AssignedEventCard";
import Header, { type IHeaderProps } from "./Header";

type IAssignedEventsProps = TPromoter & {
  header: IHeaderProps;
  classname?: string;
};

function AssignedEvents({
  header,
  classname,
  latestEvent,
}: IAssignedEventsProps) {
  return (
    <div className={cn("grid gap-[18px]", classname)}>
      <Header {...header} />

      {latestEvent ? (
        <AssignedEventCard eventData={latestEvent} />
      ) : (
        <div className="rounded-[10px] bg-[#1F242F] px-4 py-5">
          <h5 className="text-sm font-medium text-[#F5F5F6]">
            No Event Assigned
          </h5>
        </div>
      )}
    </div>
  );
}

export default memo(AssignedEvents);
