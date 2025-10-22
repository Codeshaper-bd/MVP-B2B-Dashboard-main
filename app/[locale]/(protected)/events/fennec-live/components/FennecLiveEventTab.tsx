"use client";

import { useCallback } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import DeviceContent from "@/components/modules/device-content";
import EventTab, { type TTabItem } from "@/components/modules/event/EventTab";
import type { TTabOption } from "@/components/tab-card";
import ComingSoon from "@/components/templates/coming-soon";

import Bar from "./Bar";
import GuestLists from "./GuestLists";
import Menu from "./menu";
import Overview from "./Overview";

type TTabValue = "overview" | "device" | "guestList" | "bar" | "table" | "menu";
export type TTabState = {
  tab?: TTabValue;
};

const tabs: TTabItem<TTabValue>[] = [
  {
    label: "Overview",
    value: "overview",
    tabContent: <Overview />,
  },
  {
    label: "Devices",
    value: "device",
    tabContent: <DeviceContent />,
  },
  {
    label: "Guest List",
    value: "guestList",
    tabContent: <GuestLists />,
  },
  {
    label: "Bar",
    value: "bar",
    tabContent: <Bar />,
  },
  {
    label: "Table",
    value: "table",
    tabContent: <ComingSoon />,
  },
  {
    label: "Menu",
    value: "menu",
    tabContent: <Menu />,
  },
];

export default function FennecLiveEventTab() {
  const { getAParamValue, updateAParam } = useManageSearchParams<TTabState>();
  const tab: TTabValue = getAParamValue("tab") || "overview";

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateAParam({
        key: "tab",
        value: value === "overview" ? undefined : value,
      }),
    [updateAParam],
  );

  return (
    <div className="w-full pt-6">
      <EventTab tabs={tabs} value={tab} setTab={setTab} />
    </div>
  );
}
