"use client";

import { useFetchFennecLiveData } from "@/hooks/data-fetch/useFetchFennecLiveData";
import FennecLiveEventHeader from "@/components/modules/fennec-live/FennecLiveEventHeader";
import FennecLiveEventNotFound from "@/components/modules/fennec-live/FennecLiveEventNotFound";

import FennecLiveEventTab from "./components/FennecLiveEventTab";

function FennecLivePageContent() {
  const { getFennecLiveB2BData, getFennecLiveB2BApiState } =
    useFetchFennecLiveData();
  if (!getFennecLiveB2BData && !getFennecLiveB2BApiState?.isLoading) {
    return <FennecLiveEventNotFound />;
  }
  return (
    <>
      <FennecLiveEventHeader
        getAnEventDetails={getFennecLiveB2BData?.details}
        apiState={getFennecLiveB2BApiState}
      />
      <FennecLiveEventTab />
    </>
  );
}

export default FennecLivePageContent;
