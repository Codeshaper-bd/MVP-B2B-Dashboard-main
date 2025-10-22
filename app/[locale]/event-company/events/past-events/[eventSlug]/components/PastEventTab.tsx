"use client";

import { useCallback, useMemo } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import EventTab, { type TTabItem } from "@/components/modules/event/EventTab";
import PastEventAbout from "@/components/modules/event/forms/PastEventAbout";
import type { TTabOption } from "@/components/tab-card";

import BudgetingAccounts from "./tabs-content/budgeting-accounts";
import GuestLists from "./tabs-content/GuestLists";
import ReportContent from "./tabs-content/report";
import Tickets from "./tabs-content/tickets";

type TTabValue = "about" | "tickets" | "guestlist" | "budgeting" | "report";
export type TTabState = {
  tab?: TTabValue;
};

export default function PastEventTab() {
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

  const tabs: TTabItem<TTabValue>[] = useMemo(
    () => [
      {
        label: "About",
        value: "about",
        tabContent: <PastEventAbout />,
      },
      {
        label: "Tickets",
        value: "tickets",
        tabContent: <Tickets />,
      },
      {
        label: "Guestlist",
        value: "guestlist",
        tabContent: <GuestLists />,
      },

      {
        label: "Budgeting Accounts",
        value: "budgeting",
        tabContent: <BudgetingAccounts />,
      },
      {
        label: "Report",
        value: "report",
        tabContent: <ReportContent />,
      },
    ],
    [],
  );

  return <EventTab tabs={tabs} value={tab} setTab={setTab} />;
}
