"use client";
import { Fragment, useCallback, useMemo } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TEventStatus } from "@/store/api/events/events.types";
import HostEventButton from "@/components/Buttons/HostEventButton";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import EventList from "@/components/modules/event/EventList";
import FilterValue from "@/components/modules/event/page-tools/filter-value";
import TabCard, { type TTabOption } from "@/components/tab-card";

import PageTools from "./page-tools";

type TLocalTabState = TTabState & {
  status?: string;
  page?: string;
};
type TTabValue = TEventStatus | "upcoming" | "cancelled";
type TTabState = {
  tab?: TTabValue;
};

const tabs: TTabOption<TTabValue>[] = [
  {
    label: "Upcoming Events",
    value: "upcoming",
  },
  {
    label: "View Drafts",
    value: "Draft",
  },
  {
    label: "Cancelled Events",
    value: "cancelled",
  },
];

function EventListUpcomingContent() {
  const { getAParamValue, updateAParam, updateMultipleParam } =
    useManageSearchParams<TLocalTabState>();

  const tab: TTabValue = getAParamValue("tab") || "upcoming";
  const status = getAParamValue("status");

  const currentStatus = useMemo(() => {
    if (tab === "Draft" || tab === "cancelled") {
      if (status !== undefined) {
        updateAParam({ key: "status", value: undefined });
      }
    }
    return status;
  }, [tab, status, updateAParam]);

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateMultipleParam({
        tab: value === "upcoming" ? undefined : value,
        status: undefined,
        page: undefined,
      }),
    [updateMultipleParam],
  );

  const tabStatus = useMemo(() => {
    if (tab === "upcoming") {
      return currentStatus ?? "Published,Scheduled";
    } else if (tab === "cancelled") {
      return "Cancelled";
    }
    return "Draft";
  }, [tab, currentStatus]);

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
        <PageTools type="upcoming" />
        <HostEventButton />
      </div>
      <FilterValue />

      <EventList type="upcoming" status={tabStatus} />
    </Fragment>
  );
}

export default EventListUpcomingContent;
