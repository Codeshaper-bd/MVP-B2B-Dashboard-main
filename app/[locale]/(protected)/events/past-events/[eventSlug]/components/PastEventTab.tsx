"use client";

import { useCallback } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import EventTab, { type TTabItem } from "@/components/modules/event/EventTab";
import PastEventAbout from "@/components/modules/event/forms/PastEventAbout";
import type { TTabOption } from "@/components/tab-card";
import ComingSoon from "@/components/templates/coming-soon";

import BudgetingAccounts from "./tabs-content/budgeting-accounts";
import Challenges from "./tabs-content/challenges";
import GuestLists from "./tabs-content/GuestLists";
import Promotions from "./tabs-content/promotions";
import ReportContent from "./tabs-content/report";
import Tickets from "./tabs-content/tickets";

type TTabValue =
  | "about"
  | "tickets"
  | "guestlist"
  | "challenges"
  | "table"
  | "budgeting"
  | "promotions"
  | "report";
export type TTabState = {
  tab?: TTabValue;
};
const tabs: TTabItem<TTabValue>[] = [
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
    label: "Challenges",
    value: "challenges",
    tabContent: <Challenges />,
  },
  {
    label: "Table",
    value: "table",
    tabContent: <ComingSoon />,
  },
  {
    label: "Budgeting Accounts",
    value: "budgeting",
    tabContent: <BudgetingAccounts />,
  },
  {
    label: "Promotions",
    value: "promotions",
    tabContent: <Promotions />,
  },
  {
    label: "Report",
    value: "report",
    tabContent: <ReportContent />,
  },
];
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

  return <EventTab tabs={tabs} value={tab} setTab={setTab} />;
}
