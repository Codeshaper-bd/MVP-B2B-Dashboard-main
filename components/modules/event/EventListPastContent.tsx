"use client";
import { Fragment, useCallback, useMemo } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import HostEventButton from "@/components/Buttons/HostEventButton";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import EventList from "@/components/modules/event/EventList";
import PageTools from "@/components/modules/event/page-tools";
import FiltersValue from "@/components/modules/event/page-tools/filter-value";
import TabCard, { type TTabOption } from "@/components/tab-card";

type TTabValue = "pastEvent" | "cancelled";
type TTabState = {
  tab?: TTabValue;
};
const tabs: TTabOption<TTabValue>[] = [
  {
    label: "Past Events",
    value: "pastEvent",
  },
  {
    label: "Cancelled Events",
    value: "cancelled",
  },
];
function EventListPastContent() {
  const { getAParamValue, updateAParam } = useManageSearchParams<TTabState>();
  const tab: TTabValue = getAParamValue("tab") || "pastEvent";

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateAParam({
        key: "tab",
        value: value === "pastEvent" ? undefined : value,
      }),
    [updateAParam],
  );
  const tabStatus = useMemo(() => {
    if (tab === "pastEvent") {
      return "Completed";
    }
    return "Cancelled";
  }, [tab]);
  return (
    <Fragment>
      <div className="relative my-4 flex w-full flex-col justify-between gap-3 md:flex-row md:items-center md:gap-3">
        <DynamicBreadcrumb className="!mb-0" />
        <TabCard
          tabs={tabs}
          value={tab}
          setTab={setTab}
          triggerClassName="h-7"
        />
        <PageTools type="past" />
        <HostEventButton />
      </div>
      <FiltersValue />

      <div className="mb-4 mt-6">
        <EventList type="past" status={tabStatus} />
      </div>
    </Fragment>
  );
}

export default EventListPastContent;
