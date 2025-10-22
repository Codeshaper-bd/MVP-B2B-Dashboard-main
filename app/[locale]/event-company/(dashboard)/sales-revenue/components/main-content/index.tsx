"use client";
import { memo } from "react";

import LatestEventRevenueViewTable from "@/components/modules/sales-revenue/table/latest-event-revenue-view-table";

import SalesRevenueChart from "./sales-revenue-chart";
import TopCards from "./top-cards";

function MainContent() {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden pt-3">
        <TopCards />
      </div>

      <SalesRevenueChart />
      <LatestEventRevenueViewTable />
    </div>
  );
}

export default memo(MainContent);
