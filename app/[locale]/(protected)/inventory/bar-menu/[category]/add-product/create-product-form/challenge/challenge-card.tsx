import React from "react";

import ClockIcon from "@/components/icons/ClockIcon";
import DataBaseIcon from "@/components/icons/DataBaseIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import DocumentIcon from "@/components/icons/DocumentIcon";
import EditPenIcon from "@/components/icons/EditPenIcon";
import FlashIcon from "@/components/icons/FlashIcon";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SingleDiscountProps {
  id: number | string;
  title: string;
  points: string;
  duration: string;
  description: string;
}

interface DiscountProps {
  item: SingleDiscountProps;
  enableChallengeActions?: boolean;
  editDiscountHandler?: () => void;
  deleteDiscountHandler?: () => void;
  editButton?: React.ReactNode;
  deleteButton?: React.ReactNode;
}

function ChallengeCard({
  item,
  deleteDiscountHandler,
  editDiscountHandler,
  enableChallengeActions = false,
  editButton = (
    <button type="button" onClick={editDiscountHandler}>
      <EditPenIcon className="h-5 w-5 cursor-pointer" stroke="#F79009" />
    </button>
  ),
  deleteButton = (
    <button type="button" onClick={deleteDiscountHandler}>
      <DeleteIcon className="h-5 w-5 cursor-pointer text-[#F04438]" />
    </button>
  ),
}: DiscountProps) {
  return (
    <Card className="col-span-1 rounded-lg border-default-200 bg-secondary p-4 shadow-none">
      <div className="mb-3 flex items-center justify-between">
        <CardTitle className="flex items-center justify-start gap-3 text-base font-normal">
          <FlashIcon className="h-5 w-5" />
          {item.title}
        </CardTitle>
        {enableChallengeActions && (
          <div className="flex items-center gap-3">
            {editButton}
            {deleteButton}
          </div>
        )}
      </div>
      <Separator className="bg-default-200" />
      <div className="mt-3 flex items-center justify-between text-sm">
        <p className="flex items-center justify-start gap-2">
          <DataBaseIcon className="h-[14px] w-[14px]" />
          Points Earned
        </p>
        <span>{item.points}</span>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <p className="flex items-center justify-start gap-2">
          <ClockIcon className="h-[14px] w-[14px]" />
          Duration
        </p>
        <span>{item.duration}</span>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <p className="flex items-center justify-start gap-2">
          <DocumentIcon className="h-[14px] w-[14px]" />
          Description
        </p>
        <span>{item.description}</span>
      </div>
    </Card>
  );
}

export default ChallengeCard;
