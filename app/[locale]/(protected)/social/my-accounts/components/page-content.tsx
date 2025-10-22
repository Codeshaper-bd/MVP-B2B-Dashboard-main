"use client";

import { useCallback } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import TabCard, { type TTabOption } from "@/components/tab-card";

import SocialList from "./social-list";

type TTabValue = "connect-account" | "my-account";
export type TTabState = {
  tab?: TTabValue;
};
const tabs: TTabOption<TTabValue>[] = [
  {
    label: "Connect Account",
    value: "connect-account",
  },
  {
    label: "My Account",
    value: "my-account",
  },
];

function PageContent() {
  const { getAParamValue, updateAParam } = useManageSearchParams<TTabState>();
  const tab: TTabValue = getAParamValue("tab") || "connect-account";

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateAParam({
        key: "tab",
        value: value === "connect-account" ? undefined : value,
      }),
    [updateAParam],
  );

  return (
    <div>
      <TabCard tabs={tabs} value={tab} setTab={setTab} />

      <div className="container mt-6">
        <SocialList />
      </div>
    </div>
  );
}

export default PageContent;
