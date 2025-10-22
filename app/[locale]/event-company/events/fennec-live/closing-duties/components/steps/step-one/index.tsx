import React from "react";

import Category from "./category";
import CashoutSummaryTable from "./category-cashout-summary-table";
import MissingTable from "./missing-table";
import Promos from "./promos";
import SpillageWastage from "./spillage-wastage";

function StepOne() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="space-y-6 md:flex-1">
        <CashoutSummaryTable />
        <Category />
        <Promos />
        <SpillageWastage />
      </div>
      <div className="w-auto lg:min-w-72 2xl:min-w-96">
        <MissingTable />
      </div>
    </div>
  );
}

export default StepOne;
