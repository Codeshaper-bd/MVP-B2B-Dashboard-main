import Image from "next/image";
import { Fragment } from "react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { cn } from "@/lib/utils";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import { LocationIcon as LocationIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export type TStatus = "scheduled" | "draft" | "published";

export const statusColor: Record<TStatus, string> = {
  scheduled: "border-[#932F19] text-[#F7B27A] bg-[#511C10]",
  draft: "border-[#333741] text-white bg-[#161B26]",
  published: "border-[#085D3A] text-[#75E0A7] bg-[#053321]",
};

export interface IEventProps {
  id: number | string;
  title: string;
  location: string;
  date?: string | Date;
  status?: TStatus;
  image?: string;
  selectedId: string | number | null | undefined;
  onClick?: (value: Omit<IEventProps, "selectedId" | "onClick"> | null) => void;
}

function Event({
  id,
  selectedId,
  title,
  location,
  status,
  image,
  date,
  onClick,
}: IEventProps) {
  return (
    <div
      className={cn(
        "relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-transparent hover:border-primary",
        {
          "border-primary": selectedId === id,
        },
      )}
      onClick={() =>
        onClick?.(
          selectedId === id
            ? null
            : { id, image, title, location, status, date },
        )
      }
    >
      <Fragment>
        <Card className="group relative overflow-hidden rounded-xl transition-all duration-200 hover:shadow-hover">
          {/* card status  */}
          <div className="absolute right-3 top-4 z-30">
            <Badge
              color="secondary"
              className={cn(
                `border py-[3px] text-sm font-normal`,
                status ? statusColor?.[status] : "",
              )}
            >
              {status}
            </Badge>
          </div>

          <div className="relative h-fit w-full overflow-hidden">
            <Image
              src={image || ""}
              alt={`${title} Icon`}
              width={415}
              height={300}
              className="h-full w-full rounded-t-xl object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <CardTitle className="text-md cursor-pointer break-words px-3 pb-1 pt-3 font-semibold hover:text-primary">
            {title}
          </CardTitle>

          <CardContent className="flex flex-wrap justify-between gap-y-3 p-3">
            <div className="line-clamp-1 flex w-8/12 items-center gap-2 text-xs font-medium text-white">
              <LocationIcon className="h-4 w-4" />
              <div className="line-clamp-1 break-words">{location}</div>
            </div>

            <div className="flex w-full items-center gap-2 text-[12px] font-medium text-white">
              <CalenderIcon className="h-4 w-4" />
              {convertUTCToLocal({
                utcDateTime: date?.toString(),
                format: "DD MMM YYYY",
              })}
            </div>
          </CardContent>
        </Card>
      </Fragment>
    </div>
  );
}

export default Event;
