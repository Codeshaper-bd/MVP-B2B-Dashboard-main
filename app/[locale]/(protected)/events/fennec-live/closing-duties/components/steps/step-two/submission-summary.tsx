import Image from "next/image";
import React from "react";

import DeleteIcon from "@/components/icons/DeleteIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type SummaryItemProps = {
  quantity: string;
  name: string;
  price: string;
  imageSrc: string;
  onDelete?: () => void;
};
const promos = [
  {
    quantity: "2x",
    name: "Promo A",
    price: "$100",
    imageSrc: "/assets/all/p1.png",
  },
];

const spills = [
  {
    quantity: "2x",
    name: "Promo A",
    price: "$100",
    imageSrc: "/assets/all/p1.png",
  },
  {
    quantity: "2x",
    name: "Promo A",
    price: "$100",
    imageSrc: "/assets/all/p1.png",
  },
];

function SummaryItem({
  quantity,
  name,
  price,
  imageSrc,
  onDelete,
}: SummaryItemProps) {
  return (
    <div className="flex items-center gap-2 text-default-700">
      <span>{quantity}</span>
      <Image
        src={imageSrc}
        alt={name}
        width={20}
        height={20}
        className="size-5 rounded-[4px]"
      />
      <span className="w-auto lg:min-w-44">{name}</span>
      <span>{price}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        className="p-1 hover:text-red-500"
      >
        <DeleteIcon className="size-4" />
      </Button>
    </div>
  );
}

type SummaryListProps = {
  items: Omit<SummaryItemProps, "onDelete">[];
};

function SummaryList({ items }: SummaryListProps) {
  return (
    <div className="rounded-[12px] bg-default-50">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex gap-3 px-3 py-4">
            <SummaryItem {...item} />
          </div>
          {index < items.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
}

function SubmissionSummary() {
  return (
    <Card className="shadow-none">
      <CardTitle className="p-6">Submission Summary</CardTitle>
      <Separator />
      <CardContent className="space-y-6 !p-6 text-default-700">
        <div className="flex justify-between">
          <span>Overages :</span>
          <span>$100</span>
        </div>

        <div className="flex flex-col justify-between md:flex-row">
          <span>Promos :</span>
          <SummaryList items={promos} />
        </div>

        <div className="flex flex-col justify-between md:flex-row">
          <span>Spills/Wastage :</span>
          <SummaryList items={spills} />
        </div>
      </CardContent>
    </Card>
  );
}

export default SubmissionSummary;
