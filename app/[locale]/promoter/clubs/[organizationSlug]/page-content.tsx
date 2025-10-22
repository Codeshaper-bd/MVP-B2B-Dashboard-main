"use client";

import { useParams } from "next/navigation";
import { useCallback } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TEventType } from "@/store/api/events/events.types";
import { useGetAllEventsInOrganizationQuery } from "@/store/api/promoter/promoter-api";
import type { TGetAllEventsInOrganizationArgs } from "@/store/api/promoter/promoter.types";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PromoterEventList from "@/components/modules/promoter/PromoterEventList";
import TabCard, { type TTabOption } from "@/components/tab-card";

type TLocalTabState = TTabState & {
  status?: string;
};
type TTabValue = TEventType;
type TTabState = {
  tab?: TTabValue;
};
const tabs: TTabOption<TTabValue>[] = [
  {
    label: "Upcoming Events",
    value: "upcoming",
  },
  {
    label: "Past Events",
    value: "past",
  },
];
function PageContent() {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllEventsInOrganizationArgs, void>>();
  const queryParams = getAllParamValue();

  const { getAParamValue, updateAParam } =
    useManageSearchParams<TLocalTabState>();

  const tab: TTabValue = getAParamValue("tab") || "upcoming";

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateAParam({
        key: "tab",
        value: value === "upcoming" ? undefined : value,
      }),
    [updateAParam],
  );
  const { data: getAllEventsRes, ...getAllEventApiState } =
    useGetAllEventsInOrganizationQuery({
      organizationSlug,
      type: tab,
      ...queryParams,
    });

  const getAllEventData = getAllEventsRes?.data;
  const getAllEventPagination = getAllEventsRes?.pagination;

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <DynamicBreadcrumb className="!mb-0" />
        <TabCard
          tabs={tabs}
          value={tab}
          setTab={setTab}
          triggerClassName="h-7"
        />
      </div>
      <PromoterEventList
        getAllEventData={getAllEventData}
        getAllEventPagination={getAllEventPagination}
        getAllEventApiState={getAllEventApiState}
        eventType={tab}
      />
    </div>
  );
}

export default PageContent;
