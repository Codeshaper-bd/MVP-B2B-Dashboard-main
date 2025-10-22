import Image from "next/image";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import CalendarIcon from "@/components/icons/CalendarIcon";
import FileX from "@/components/icons/FileX";
import LocationIcon from "@/components/icons/LocationIcon";
import { Button } from "@/components/ui/button";

function EventInfo() {
  return (
    <div className="space-y-5">
      <Image
        src={"/images/all-img/event2.png"}
        alt={""}
        width={320}
        height={240}
        className="h-[240px] max-w-[320px] rounded-xl object-cover"
      />

      <div>
        <h3 className="mb-3 text-[16px] font-semibold leading-9">
          Pit Wedensday
        </h3>

        <div className="mb-2 flex items-center gap-2 text-sm font-normal">
          <LocationIcon className="size-5" /> Venue :
          <span className="font-medium text-default-1000">
            {" "}
            Gelora Bung Karno Stadium
          </span>
        </div>

        <div className="mb-2 flex items-center gap-2 text-sm font-normal">
          <CalendarIcon className="size-5" />
          Time :
          <span className="font-medium text-default-1000">
            {convertUTCToLocal({
              utcDateTime: "2025-06-22T13:20:43.375Z",
              format: "DD MMMM YYYY",
            })}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button asChild className="cursor-pointer bg-default-100">
            <span>
              <span className="me-1 h-2 w-2 rounded-full bg-default-1000"></span>
              Launch Fennec Live
            </span>
          </Button>
          <Button asChild className="cursor-pointer bg-default-50">
            <span>
              <FileX className="me-1.5 size-5" />
              Ignore Checklist & Launch
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EventInfo;
