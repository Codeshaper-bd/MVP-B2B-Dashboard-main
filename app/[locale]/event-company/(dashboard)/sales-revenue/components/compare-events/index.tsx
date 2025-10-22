"use client";
import { memo } from "react";

import CompareSelect from "@/components/modules/sales-revenue/Forms/CompareSelect";

import EventOneContent from "./event-one-content";
import EventTwoContent from "./event-two-content";

function CompareEvents() {
  return (
    <div className="mt-6 space-y-6">
      <CompareSelect />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <EventOneContent />
        <EventTwoContent />
      </div>
    </div>
  );
}

export default memo(CompareEvents);
