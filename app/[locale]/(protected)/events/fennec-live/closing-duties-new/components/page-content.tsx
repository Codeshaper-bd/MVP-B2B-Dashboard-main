import Image from "next/image";
import React from "react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import CalendarIcon from "@/components/icons/CalendarIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import FileX from "@/components/icons/FileX";
import MoonIcon from "@/components/icons/MoonIcon";
import { Button } from "@/components/ui/button";

import ChecklistRoleTabs from "./checklist-role-tabs";

function PageContent() {
  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-10">
        <Image
          src={getImageFallback({
            src: "/images/all-img/event2.png",
            fallbackImageSize: 500,
          })}
          alt={""}
          width={300}
          height={270}
          className="h-[270px] rounded-xl object-cover"
        />

        <div className="flex-1">
          <h3 className="mb-2 text-xl font-semibold leading-9 md:mb-2 md:text-3xl">
            Pit Wednesday
          </h3>

          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-default-1000">
            <CalendarIcon className="size-6" />
            {convertUTCToLocal({
              utcDateTime: "2025-06-25T09:52:21.194Z",
              format: "DD MMMM YYYY",
            })}
          </p>
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-default-1000">
            <ClockIcon className="size-6" />
            {convertUTCToLocal({
              utcDateTime: "2025-06-25T09:52:21.194Z",
              format: "HH:MM A",
            })}
          </p>
          <p className="mb-4 mt-6 font-medium text-[#F97066]">Event Locked</p>
          <div className="my-4">
            <Button disabled color="secondary">
              <MoonIcon className="me-1 size-5" /> Close Night
            </Button>
          </div>
          <div className="my-4">
            <Button color="secondary" className="!px-4 !py-2.5">
              <FileX className="me-1.5 size-5" />
              Ignore Checklist & Launch
            </Button>
          </div>
        </div>
        <ChecklistRoleTabs />
      </div>
    </div>
  );
}

export default PageContent;
