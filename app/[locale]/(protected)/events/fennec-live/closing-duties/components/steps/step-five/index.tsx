import React from "react";

import InfoIcon from "@/components/icons/InfoIcon";

import BartenderTable from "./coatcheck-bartender-table";
import CoatcheckCheckListTable from "./coatcheck-checklist-table";

function StepFive() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <h2>Bartender</h2>
        <p className="flex gap-2 text-[#F97066]">
          <InfoIcon className="size-5" /> <span>Checklist is Pending</span>
        </p>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-auto lg:min-w-72 2xl:min-w-96">
          <BartenderTable />
        </div>
        <div className="flex-1">
          <CoatcheckCheckListTable />
        </div>
      </div>
    </div>
  );
}

export default StepFive;
