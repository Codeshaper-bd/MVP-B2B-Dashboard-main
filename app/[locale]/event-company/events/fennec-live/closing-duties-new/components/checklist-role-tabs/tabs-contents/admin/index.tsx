"use client";
import { useState } from "react";

import ChecklistBarCategorySelect from "@/components/features/checklist/ChecklistBarCategorySelect";
import { ChecklistItemCard } from "@/components/features/checklist/checklistItemCard";
import CashOutSummaryDialog from "@/components/features/checklist/modals/cashout-summary-modal";
import DiscountAmountDialog from "@/components/features/checklist/modals/discount-amount-modal";
import DiscountPercentageDialog from "@/components/features/checklist/modals/discount-percentage-modal";
import InfoIcon from "@/components/icons/InfoIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import VueSaxArrowCircleUpIcon from "@/components/icons/VueSaxArrowCircleUpIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import AdminCashOutTable from "./admin-cashout-table";
import CashOutSummaryTable from "./cashout-summary-table";
import PromosTable from "./promos-table";

function Admin() {
  const [openCashOutSummary, setCashOutSummary] = useState<boolean>(false);
  const [openDiscountPercentage, setDiscountPercentage] =
    useState<boolean>(false);
  const [openDiscountAmount, setDiscountAmount] = useState<boolean>(false);
  const [categoryState, setCategoryState] = useState<string | null>("mainbar");
  return (
    <div className="space-y-10">
      <CashOutSummaryTable />
      <Card className="bg-secondary p-6">
        <div className="flex items-center justify-between gap-5">
          <CardTitle>Cashout</CardTitle>

          <ChecklistBarCategorySelect
            value={categoryState}
            onChange={setCategoryState}
          />
        </div>

        <CardContent className="mt-4 p-0">
          <AdminCashOutTable />
          <Card className="mt-4 space-y-2 px-6 py-5 font-semibold">
            <h3 className="uppercase text-default-900">
              Debit Terminal Close-Out
            </h3>
            <p className="text-default-700">$ 520.00</p>
          </Card>
          <Card className="mt-4 space-y-2 px-6 py-5 font-semibold">
            <h3 className="uppercase text-default-900">POS Read Amount</h3>
            <p className="text-default-700">$ 320.00</p>
          </Card>
          <Card className="mt-4 space-y-2 px-6 py-5 font-semibold">
            <div className="flex items-center justify-between gap-2">
              <h3 className="mb-3 uppercase text-default-900">Promos</h3>
              <VueSaxArrowCircleUpIcon className="size-5" />
            </div>

            <PromosTable />
            <Button color="secondary">
              <PlusIcon className="me-1 size-5" /> Add Promo
            </Button>
          </Card>
          <Card className="mt-4 flex flex-wrap items-center justify-between gap-2 space-y-2 px-6 py-5 font-semibold">
            <h3 className="uppercase text-default-900">Spillage/Wastage</h3>
            <Button color="secondary">
              <PlusIcon className="me-1 size-5" /> Add Promo
            </Button>
          </Card>
          <div className="mt-4 flex items-center justify-end gap-4">
            {/* can make a component for this part when api is ready */}
            <DiscountPercentageDialog
              open={openDiscountPercentage}
              setOpen={setDiscountPercentage}
            />
            <DiscountAmountDialog
              open={openDiscountAmount}
              setOpen={setDiscountAmount}
            />
            <InfoIcon className="size-5" />
            <CashOutSummaryDialog
              open={openCashOutSummary}
              setOpen={setCashOutSummary}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardTitle className="p-5 text-[16px] font-semibold">
          Checklist
        </CardTitle>
        <CardContent className="space-y-4">
          <ChecklistItemCard
            stepNumber={1}
            title="Incident Report"
            description="Don’t forget to clear out Valet space"
            status="Completed"
          >
            <div className="ms-12 space-y-4">
              <Separator className="h-0.5" />

              <div className="flex gap-2">
                <Label
                  htmlFor="yes"
                  className="flex cursor-pointer flex-row items-center gap-2 text-base font-normal text-default-700"
                >
                  <Checkbox className="rounded-full" id="yes" checked={false} />
                  <span className="min-w-[56px] text-sm font-medium">Yes</span>
                </Label>
                <Label
                  htmlFor="no"
                  className="flex cursor-pointer flex-row items-center gap-2 text-base font-normal text-default-700"
                >
                  <Checkbox className="rounded-full" id="yes" checked={true} />
                  <span className="min-w-[56px] text-sm font-medium">No</span>
                </Label>
              </div>
              <div className="space-y-2">
                <h5 className="text-xs font-medium text-default-700">Notes</h5>
                <div className="rounded-xl bg-default-100 p-4 text-sm font-normal text-default-900">
                  Bar cleaned at 6:00 PM, floor still a bit slippery.
                </div>
              </div>
            </div>
          </ChecklistItemCard>
        </CardContent>
      </Card>
    </div>
  );
}

export default Admin;
