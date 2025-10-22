"use client";

import OrderListTable from "./order-table";
import TopCard from "./top-card";

function PageContent() {
  return (
    <div className="space-y-5">
      <TopCard />
      <OrderListTable />
    </div>
  );
}

export default PageContent;
