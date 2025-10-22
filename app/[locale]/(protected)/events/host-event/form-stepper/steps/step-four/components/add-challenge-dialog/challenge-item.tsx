import { memo } from "react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getChallengeStatusColor } from "@/lib/get-status-colors";
import { cn } from "@/lib/utils";
import type { TChallenge } from "@/store/api/challenges/challenges.types";
import CalenderIcon from "@/components/icons/CalenderIcon";
import DataBaseIcon from "@/components/icons/DataBaseIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface IChallengeItemProps {
  item: TChallenge;
  handleSelected?: (data: IChallengeItemProps["item"]) => void;
  setOpen: (open: boolean) => void;
  isSelected?: boolean;
  isNotSelectable?: boolean;
}

function ChallengeItem({
  setOpen,
  handleSelected,
  item: { name, pointsEarned, endDate, status },
  item,
  isSelected,
  isNotSelectable,
}: IChallengeItemProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer rounded-[8px] border border-transparent bg-default-50 hover:bg-default-100/90",
        {
          "border-primary": isSelected,
          "cursor-not-allowed border-destructive": isNotSelectable,
        },
      )}
      onClick={() => {
        if (isNotSelectable) {
          return;
        }
        handleSelected?.(item);
        setOpen(false);
      }}
    >
      <CardContent className="space-y-4 px-4 py-5">
        <div>
          <h3 className="line-clamp-1 text-sm font-semibold text-default-900">
            {name}
          </h3>
        </div>

        <Separator className="bg-default-200/40" />

        <div className="flex flex-col gap-3 text-sm font-normal">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <DataBaseIcon className="h-4 w-4" /> <span>Points</span>
            </div>

            <p>{pointsEarned}</p>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2">
              <CalenderIcon className="h-4 w-4" />
              <span className="text-sm font-normal">Valid Until</span>
            </div>

            <p>
              {convertUTCToLocal({
                format: "DD MMM YYYY",
                utcDateTime: endDate,
              })}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <InfoIcon className="h-4 w-4" />
              <span className="text-sm font-normal">Status</span>
            </div>
            <div>
              <Badge className={getChallengeStatusColor(status)}>
                {status}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(ChallengeItem);
