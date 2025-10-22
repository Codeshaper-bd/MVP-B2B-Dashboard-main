"use client";
import Image from "next/image";

import ChecklistVolumeInputGroup from "@/components/features/checklist/ChecklistVolumeInputGroup";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function RecountDrawerContent() {
  return (
    <div className="p-6">
      <div className="flex flex-col items-center gap-5 pt-12">
        <Image
          width={180}
          height={142}
          className="h-[182px] w-[180px] rounded-[12px]"
          src="/images/all-img/product-alcohol.png"
          alt="product image"
        />
        <Card className="flex w-3/4 flex-col items-center bg-default-50 p-3">
          <h2 className="text-sm font-semibold">ETNA ROSSO VULKA</h2>
          <p className="text-sx font-medium text-primary">Volume</p>
        </Card>
      </div>
      <Card className="mt-4 bg-default-50 px-4 py-3">
        <div className="flex items-center justify-between gap-2 border-b border-default-100 py-2">
          <span>Status</span>
          <Badge className="statusOrange">Inconsistency</Badge>
        </div>
        <div className="flex items-center justify-between gap-2 border-b border-default-100 py-2">
          <span>Type</span>
          <Badge className="statusPink">Alcoholic</Badge>
        </div>
        <div className="flex items-center justify-between gap-2 border-b border-default-100 py-2">
          <span>Sold by the</span>
          <span>Volume</span>
        </div>
        <div>
          <div className="flex items-center justify-between gap-2 py-2">
            <span>Predicted Quantity</span>
            <span>200</span>
          </div>
          <Card className="bg-default-100 px-4">
            <div className="flex items-center justify-between gap-2 border-b border-default-200 py-2">
              <span>26 oz</span>
              <span>120</span>
            </div>
            <div className="flex items-center justify-between gap-2 py-2">
              <span>40 oz</span>
              <span>80</span>
            </div>
          </Card>
        </div>
      </Card>

      <Separator className="my-6" />
      <ChecklistVolumeInputGroup title="Opened" />

      <ChecklistVolumeInputGroup
        title="Closed"
        showInconsistency
        inputClassName="border-[#F97066]"
      />
    </div>
  );
}

export default RecountDrawerContent;
