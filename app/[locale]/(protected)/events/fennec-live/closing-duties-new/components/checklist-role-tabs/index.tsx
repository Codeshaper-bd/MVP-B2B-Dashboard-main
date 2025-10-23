"use client";

import { memo, useCallback, useMemo, useState } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { CheckIcon as CheckIcon } from "@/components/icons";
import { InfoIcon as InfoIcon } from "@/components/icons";
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
  const [tabIconState, setTabIconState] = useState<
    Record<TTabValue, "info" | "check">
  >({
    admin: "info",
    "guest-list": "info",
    bartender: "info",
    "vip-host": "info",
    "bottle-girls": "info",
    barback: "info",
  });

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
        labelIcon:
          tabIconState["admin"] === "info" ? (
            <InfoIcon className="ms-2 size-4 text-warning" />
          ) : (
            <CheckIcon className="ms-2 size-4 text-success" />
          ),
      },

      {
        label: "Guestlist",
        value: "guest-list",
        tabContent: <GuestsList />,
        labelIcon:
          tabIconState["guest-list"] === "check" ? (
            <InfoIcon className="ms-2 size-4 text-warning" />
          ) : (
            <CheckIcon className="ms-2 size-4 text-success" />
          ),
      },
      {
        label: "Bartender",
        value: "bartender",
        tabContent: <Bartender />,
        labelIcon:
          tabIconState["bartender"] === "info" ? (
            <InfoIcon className="ms-2 size-4 text-warning" />
          ) : (
            <CheckIcon className="ms-2 size-4 text-success" />
          ),
      },
      {
        label: "VIP Host",
        value: "vip-host",
        tabContent: <VipHost />,
        labelIcon:
          tabIconState["vip-host"] === "info" ? (
            <InfoIcon className="ms-2 size-4 text-warning" />
          ) : (
            <CheckIcon className="ms-2 size-4 text-success" />
          ),
      },
      {
        label: "Bottle Girls",
        value: "bottle-girls",
        tabContent: <BottleGirl />,
        labelIcon:
          tabIconState["bottle-girls"] === "info" ? (
            <InfoIcon className="ms-2 size-4 text-warning" />
          ) : (
            <CheckIcon className="ms-2 size-4 text-success" />
          ),
      },
      {
        label: "Barback",
        value: "barback",
        tabContent: <Barback />,
        labelIcon:
          tabIconState["barback"] === "check" ? (
            <InfoIcon className="ms-2 size-4 text-warning" />
          ) : (
            <CheckIcon className="ms-2 size-4 text-success" />
          ),
      },
    ],
    [tabIconState],
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
