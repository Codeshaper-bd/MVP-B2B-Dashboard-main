import Image from "next/image";
import React from "react";

import { CalendarIcon as CalendarIcon } from "@/components/icons";
import FileX from "@/components/icons/FileX";
import { LocationIcon as LocationIcon } from "@/components/icons";

function VenueInfos() {
  return (
    <div className="col-span-1 space-y-5">
      <Image
        src="/assets/all/event-card-2.png"
        alt="event image"
        width={320}
        height={240}
        className="h-60 w-80 rounded-xl object-fill"
      />
      <h2 className="text-[16px] font-semibold">Pit Wedensday</h2>

      <div className="space-y-2">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="flex gap-2.5">
            <LocationIcon className="size-5" /> <span>Venue :</span>
          </span>
          <span className="font-medium text-default-1000">
            Gelora Bung Karno Stadium
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-sm">
          <span className="flex gap-2.5">
            <CalendarIcon className="size-5" /> <span>Time :</span>
          </span>
          <span className="font-medium text-default-1000">
            November 15, 2024, 7:00 PM
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex w-fit cursor-pointer items-center gap-2 rounded-[8px] bg-default-100 px-3.5 py-2.5">
          <span className="relative block h-2 w-2 rounded-full bg-[#85888E] before:absolute before:start-0 before:top-0 before:h-full before:w-full before:rounded-full"></span>
          <p className="text-[16px] font-semibold">Launch Fennec Live</p>
        </div>
        <div className="flex w-fit cursor-pointer items-center gap-2 rounded-[8px] bg-default-100 px-3.5 py-2.5 text-default-700">
          <FileX className="size-5" />
          <p className="text-[16px] font-semibold">Ignore Checklist & Launch</p>
        </div>
      </div>
    </div>
  );
}

export default VenueInfos;
