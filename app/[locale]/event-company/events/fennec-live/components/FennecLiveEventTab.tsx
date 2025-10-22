"use client";

import { useCallback } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import EventTab, { type TTabItem } from "@/components/modules/event/EventTab";
import type { TTabOption } from "@/components/tab-card";

import Overview from "./Overview";

type TTabValue = "overview";
export type TTabState = {
  tab?: TTabValue;
};

const tabs: TTabItem<TTabValue>[] = [
  {
    label: "Overview",
    value: "overview",
    tabContent: <Overview />,
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
      <EventTab
        tabs={tabs}
        value={tab}
        setTab={setTab}
        TabListClassName="w-full"
      />
    </div>
  );
}
