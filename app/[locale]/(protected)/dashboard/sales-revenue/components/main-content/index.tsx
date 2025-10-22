"use client";
import { memo } from "react";

import LatestEventRevenueViewTable from "@/components/modules/sales-revenue/table/latest-event-revenue-view-table";

import AverageBarRevenueChart from "./average-Bar-Revenue-chart";
import RevenueOverview from "./revenue-overview";
import SalesRevenueChart from "./sales-revenue-chart";
import TopCards from "./top-cards";

function MainContent() {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden pt-3">
        <TopCards />
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <SalesRevenueChart />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <AverageBarRevenueChart title="Average Bar Revenue" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <LatestEventRevenueViewTable />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <RevenueOverview />
        </div>
      </div>
    </div>
  );
}

export default memo(MainContent);
