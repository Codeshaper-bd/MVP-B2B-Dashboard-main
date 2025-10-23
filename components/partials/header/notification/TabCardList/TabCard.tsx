import React, { memo } from "react";

import { cn } from "@/lib/utils";
import type { TNotificationType } from "@/store/api/notifications/notifications.types";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import CubeIcon from "@/components/icons/CubeIcon";
import ListIcon from "@/components/icons/ListIcon";

// type TNotificationType = "todoList" | "upcomingEvents" | "inventory" | "refund";

const ICONS: Record<TNotificationType, JSX.Element> = {
  TODO: <ListIcon className="h-[14.17px] w-[15px] text-default-700" />,
  EVENT: <CalenderIcon className="h-[16.67px] w-[15px] text-default-700" />,
  STOCK: <CubeIcon className="h-[16.43px] w-[15px] text-default-700" />,
  REFUND: <CubeIcon className="h-[16.43px] w-[15px] text-default-700" />,
  FRIEND: <CubeIcon className="h-[16.43px] w-[15px] text-default-700" />,
} as const;

export interface ITabCardProps {
  id: string | number;
  type?: TNotificationType;
  title: string | number;
  // description: {
  //   firstPart?: string | number;
  //   secondPart?: string | number;
  //   reverse?: boolean;
  // };
  descriptionFirstPart?: string | number;
  descriptionSecondPart?: string | number;
  descriptionReverse?: boolean;
}

function TabCard({
  title,
  descriptionFirstPart,
  descriptionSecondPart,
  descriptionReverse,
  type,
}: ITabCardProps) {
  return (
    <div className="w-full cursor-pointer border-b border-b-[#1F242F] hover:bg-[#1F242F]">
      <div className="flex items-center gap-4 px-6 py-[22px]">
        <div className="w-fit shrink-0 rounded-lg border border-border bg-secondary p-3">
          {!!type && ICONS?.[type]}
        </div>

        <div>
          <h3 className="mb-1 text-wrap break-words text-sm font-semibold leading-5 text-white">
            {title}
          </h3>

          <p className={cn("flex w-full gap-x-1.5 text-start")}>
            <span
              className={cn(
                "text-wrap break-words text-sm leading-5",
                descriptionReverse || type === "STOCK"
                  ? "font-medium text-primary"
                  : "font-normal text-default-700",
              )}
            >
              {descriptionFirstPart}
            </span>

            {!!descriptionSecondPart && (
              <span
                className={cn(
                  "text-wrap break-words text-sm leading-5",
                  descriptionReverse || type === "STOCK"
                    ? "font-normal text-default-700"
                    : "font-medium text-primary",
                )}
              >
                {descriptionSecondPart}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(TabCard);
