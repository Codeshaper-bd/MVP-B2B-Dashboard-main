"use client";
import { useSalesRevenueFilterContext } from "@/components/modules/sales-revenue/SalesRevenueFilterContext";

import CompareEvents from "./compare-events";
import MainContent from "./main-content";

function SalesRevenueContent() {
  const filterContextValues = useSalesRevenueFilterContext();
  const {
    values: { tempFilterType },
  } = filterContextValues;

  if (tempFilterType?.value?.value === "compareEvents") {
    return <CompareEvents />;
  }

  return <MainContent />;
}

export default SalesRevenueContent;
