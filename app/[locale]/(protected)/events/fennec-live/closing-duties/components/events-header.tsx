"use client";
import Image from "next/image";
import { useState } from "react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import { ClockIcon as ClockIcon } from "@/components/icons";
import LockLockedIcon from "@/components/icons/LockLockedIcon";
import { Button } from "@/components/ui/button";

import { fennecLiveData } from "../../data";
import LockEventDialog from "./modals/lock-event-dialog";
interface IEventsHeaderProps {
  isLockEvent: boolean;
  setLockEvent: React.Dispatch<React.SetStateAction<boolean>>;
}

function EventsHeader({ isLockEvent, setLockEvent }: IEventsHeaderProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div className="mt-6 flex flex-col justify-start gap-4 md:flex-row md:items-center md:gap-8">
        <div className="w-full md:w-4/12">
          <Image
            src={fennecLiveData.image}
            alt={fennecLiveData.title}
            className="w-full rounded-t-xl"
          />
        </div>

        <div className="md:w-8/12">
          <h1 className="mb-2 text-xl font-bold md:text-3xl">
            {fennecLiveData.title}
          </h1>
          <p className="text-normal mb-4 flex items-center gap-2 text-sm text-white">
            <CalenderIcon className="h-4 w-4" />
            {convertUTCToLocal({
              utcDateTime: fennecLiveData?.startDate,
              format: "DD MMMM YYYY",
            })}
          </p>
          <p className="text-normal flex items-center gap-2 text-sm text-white">
            <ClockIcon className="h-4 w-4" />
            {convertUTCToLocal({
              utcDateTime: fennecLiveData?.startDate,
              format: "HH:mm A",
            })}
            {` - `}
            {convertUTCToLocal({
              utcDateTime: fennecLiveData?.endDate,
              format: "HH:mm A",
            })}
          </p>
          <div className="mt-10 space-y-4">
            <div>
              <div className="text-[#F97066]">Event Over</div>
            </div>
            <div>
              {!isLockEvent && (
                <Button
                  type="button"
                  color="primary"
                  onClick={() => setOpen(true)}
                >
                  <LockLockedIcon className="me-1 size-5" /> Lock Event
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <LockEventDialog
        open={open}
        setOpen={setOpen}
        setLockEvent={setLockEvent}
      />
    </>
  );
}

export default EventsHeader;
