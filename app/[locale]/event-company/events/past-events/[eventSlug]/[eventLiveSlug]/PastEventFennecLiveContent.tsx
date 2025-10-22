"use client";

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import FennecLiveEventHeader from "@/components/modules/fennec-live/FennecLiveEventHeader";

import PastEventTab from "./past-event-tab";

function PastEventFennecLiveContent() {
  const { getAnEventData, getAnEventApiState } = useFetchAnEventData();
  return (
    <>
      <FennecLiveEventHeader
        getAnEventDetails={getAnEventData?.details}
        apiState={getAnEventApiState}
      />
      <PastEventTab />
    </>
  );
}

export default PastEventFennecLiveContent;
