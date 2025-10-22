"use client";

import { useMemo } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAllAssignedEventsQuery } from "@/store/api/promoter/promoter-api";
import type { TGetAllAssignedEventsArgs } from "@/store/api/promoter/promoter.types";
import PromoterEventList from "@/components/modules/promoter/PromoterEventList";

function PageContent() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllAssignedEventsArgs, void>>();
  const queryParams = useMemo(() => getAllParamValue(), [getAllParamValue]);
  const { data: getAllEventsRes, ...getAllEventApiState } =
    useGetAllAssignedEventsQuery({
      type: "upcoming",
      ...queryParams,
    });

  const getAllEventData = useMemo(
    () => getAllEventsRes?.data,
    [getAllEventsRes?.data],
  );
  const getAllEventPagination = useMemo(
    () => getAllEventsRes?.pagination,
    [getAllEventsRes?.pagination],
  );

  return (
    <div>
      <PromoterEventList
        getAllEventData={getAllEventData}
        getAllEventPagination={getAllEventPagination}
        getAllEventApiState={getAllEventApiState}
        eventType="upcoming"
        eventListType="upcoming"
      />
    </div>
  );
}

export default PageContent;
