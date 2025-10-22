"use client";

import { useFetchFennecLiveData } from "@/hooks/data-fetch/useFetchFennecLiveData";
import GuestCheckedTime from "@/components/modules/fennec-live/GuestCheckedTime";
import NonGuestListContent from "@/components/modules/fennec-live/non-guestlist-content";
import TotalEntryContent from "@/components/modules/fennec-live/total-entry-content";
import RenderData from "@/components/render-data";

export default function GuestLists() {
  const { getFennecLiveB2BApiState, getFennecLiveB2BData } =
    useFetchFennecLiveData();
  return (
    <RenderData
      expectedDataType="object"
      data={getFennecLiveB2BData}
      {...getFennecLiveB2BApiState}
    >
      <div className="space-y-7">
        <GuestCheckedTime
          startTime={getFennecLiveB2BData?.details?.startTime}
          endTime={getFennecLiveB2BData?.details?.checkInEnd}
        />
        <TotalEntryContent />
        <NonGuestListContent />
      </div>
    </RenderData>
  );
}
