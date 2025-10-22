"use client";

import { memo, useCallback, useMemo } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import EventTab, { type TTabItem } from "@/components/modules/event/EventTab";
import type { TTabOption } from "@/components/tab-card";

import Admin from "./tabs-contents/admin";
import Barback from "./tabs-contents/barback";
import Bartender from "./tabs-contents/bartender";
import BottleGirl from "./tabs-contents/bottle-girls";
import GuestsList from "./tabs-contents/guest-list";
import VipHost from "./tabs-contents/vip-host";

type TTabValue =
  | "admin"
  | "guest-list"
  | "bartender"
  | "vip-host"
  | "bottle-girls"
  | "barback";
export type TTabState = {
  tab?: TTabValue;
};

function ChecklistRoleTabs() {
  const { getAParamValue, updateAParam } = useManageSearchParams<TTabState>();
  const tab: TTabValue = getAParamValue("tab") || "admin";

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateAParam({
        key: "tab",
        value: value === "admin" ? undefined : value,
      }),
    [updateAParam],
  );

  const tabs: TTabItem<TTabValue>[] = useMemo(
    () => [
      {
        label: "Admin",
        value: "admin",
        tabContent: <Admin />,
      },

      {
        label: "Guestlist",
        value: "guest-list",
        tabContent: <GuestsList />,
      },
      {
        label: "Bartender",
        value: "bartender",
        tabContent: <Bartender />,
      },
      {
        label: "VIP Host",
        value: "vip-host",
        tabContent: <VipHost />,
      },
      {
        label: "Bottle Girls",
        value: "bottle-girls",
        tabContent: <BottleGirl />,
      },
      {
        label: "Barback",
        value: "barback",
        tabContent: <Barback />,
      },
    ],
    [],
  );

  const renderTabContent = useCallback(
    ({ tabContent }: TTabItem<TTabValue>) => <div>{tabContent}</div>,
    [],
  );

  return (
    <div className="w-full">
      <EventTab
        TabListClassName="w-full lg:grid lg:grid-cols-6 font-semibold"
        tabs={tabs}
        value={tab}
        setTab={setTab}
        renderTabContent={renderTabContent}
      />
    </div>
  );
}

export default memo(ChecklistRoleTabs);
