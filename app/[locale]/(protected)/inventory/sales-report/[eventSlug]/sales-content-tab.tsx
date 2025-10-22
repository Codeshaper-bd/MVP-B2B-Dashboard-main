"use client";

import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import EventTab, { type TTabItem } from "@/components/modules/event/EventTab";
import { type TTabOption } from "@/components/tab-card";

import EventSalesSummery from "./components/event-sales-summery";
import EventTopCard from "./components/event-top-card";
import PaymentMethodsOverview from "./components/payment-methods-overview";
import ProductSalesTable from "./components/product-sales-table";

type TTabValue =
  | "eventSalesSummary"
  | "productSalesBreakdown"
  | "paymentMethodsOverview";

export type TTabState = {
  tab?: TTabValue;
};
type TPageParams = Params & {
  eventSlug: string;
};
function SalesContentTab() {
  const { getAParamValue, updateAParam } = useManageSearchParams<TTabState>();
  const tab: TTabValue = getAParamValue("tab") || "eventSalesSummary";
  const { eventSlug } = useParams<TPageParams>();

  const setTab = useCallback(
    ({ value }: TTabOption<TTabValue>) =>
      updateAParam({
        key: "tab",
        value: value === "eventSalesSummary" ? undefined : value,
      }),
    [updateAParam],
  );

  const tabs: TTabItem<TTabValue>[] = useMemo(
    () => [
      {
        label: "Event Sales Summary",
        value: "eventSalesSummary",
        tabContent: <EventSalesSummery eventSlug={eventSlug} />,
      },
      {
        label: "Product Sales Breakdown",
        value: "productSalesBreakdown",
        tabContent: <ProductSalesTable />,
      },
      {
        label: "Payment Methods Overview",
        value: "paymentMethodsOverview",
        tabContent: <PaymentMethodsOverview />,
      },
    ],
    [eventSlug],
  );

  return (
    <EventTab
      tabs={tabs}
      value={tab}
      setTab={setTab}
      extraContent={<EventTopCard eventSlug={eventSlug} />}
    />
  );
}

export default SalesContentTab;
