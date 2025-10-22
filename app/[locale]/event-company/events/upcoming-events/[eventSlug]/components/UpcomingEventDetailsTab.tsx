"use client";

import { memo, useCallback } from "react";

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import EventTab, { type TTabItem } from "@/components/modules/event/EventTab";
import Tickets from "@/components/modules/event/tab-content/tickets";
import UpcomingEventAbout from "@/components/modules/event/tab-content/UpcomingEventAbout";
import RenderData from "@/components/render-data";
import type { TTabOption } from "@/components/tab-card";

import GuestList from "./tabs-content/guest-list";
type TTabValue = "about" | "tickets" | "guest-list";

export type TTabState = {
  tab?: TTabValue;
};

const MemoizedAbout = memo(UpcomingEventAbout);
const MemoizedTickets = memo(Tickets);
const MemoizedGuestList = memo(GuestList);
const tabs: TTabItem<TTabValue>[] = [
  {
    label: "About",
    value: "about",
    tabContent: <MemoizedAbout />,
  },
  {
    label: "Tickets",
    value: "tickets",
    tabContent: <MemoizedTickets />,
  },
  {
    label: "Guestlist",
    value: "guest-list",
    tabContent: <MemoizedGuestList />,
  },
];

function UpcomingEventDetailsTab() {
  const { getAnEventApiState, getAnEventData } = useFetchAnEventData();

  const { getAParamValue, updateAParam } = useManageSearchParams<TTabState>();
  const tab: TTabValue = getAParamValue("tab") || "about";

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateAParam({
        key: "tab",
        value: value === "about" ? undefined : value,
      }),
    [updateAParam],
  );

  const renderTabContent = useCallback(
    ({ tabContent }: TTabItem<TTabValue>) => (
      <RenderData
        {...getAnEventApiState}
        data={getAnEventData}
        expectedDataType="object"
      >
        {tabContent}
      </RenderData>
    ),
    [getAnEventData, getAnEventApiState],
  );

  return (
    <div className="w-full">
      <EventTab
        tabs={tabs}
        value={tab}
        setTab={setTab}
        renderTabContent={renderTabContent}
        TabListClassName="w-full"
      />
    </div>
  );
}

export default memo(UpcomingEventDetailsTab);
