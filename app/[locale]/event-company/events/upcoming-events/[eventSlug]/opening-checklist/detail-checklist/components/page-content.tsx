"use client";

import Image from "next/image";
import { useState } from "react";

import ChecklistBarCategorySelect from "@/components/features/checklist/ChecklistBarCategorySelect";
import ChecklistDetailsHeader from "@/components/features/checklist/ChecklistDetailsHeader";
import ChecklistStatusAlert from "@/components/features/checklist/ChecklistStatusAlert";
import ApproveSubmissionDialog from "@/components/features/checklist/modals/approve-submission";
import RejectSubmissionDialog from "@/components/features/checklist/modals/reject-submission";
import { Card } from "@/components/ui/card";

import ChecklistProductTable from "./checklist-table/checklist-product-table";

function PageContent() {
  const [openApprove, setOpenApprove] = useState<boolean>(false);
  const [openReject, setOpenReject] = useState<boolean>(false);
  const [categoryState, setCategoryState] = useState<string | null>("mainbar");
  return (
    <div className="space-y-6">
      <ChecklistDetailsHeader
        title="Task"
        subtitle="Inventory Tracking"
        description="Count and record all unopened bottles and canned goods, and measure the weight of all opened alcohol bottles and beverages in each bar."
      />
      <Card className="flex flex-wrap items-center justify-between gap-4 p-4">
        <div className="max-w-96">
          <ChecklistBarCategorySelect
            value={categoryState}
            onChange={setCategoryState}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <RejectSubmissionDialog open={openReject} setOpen={setOpenReject} />

          <ApproveSubmissionDialog
            open={openApprove}
            setOpen={setOpenApprove}
          />
        </div>
      </Card>
      <div className="space-y-4">
        <h4 className="font-semibold">Category</h4>
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-col items-center gap-3">
            <Image
              alt="product Image"
              width={88}
              height={88}
              className="h-[88px] w-[88px] rounded-[16px] border-[2px] border-primary object-cover"
              src="/images/all-img/product1.png"
            />
            <p className="text-sm font-medium text-default-700">Overall</p>
          </div>
        </div>
      </div>
      <ChecklistStatusAlert
        type="negative"
        title="Inconsistencies Detected"
        message="4 items have count mismatches. Please review before confirming."
      />

      <div>
        <ChecklistProductTable />
      </div>
    </div>
  );
}

export default PageContent;
