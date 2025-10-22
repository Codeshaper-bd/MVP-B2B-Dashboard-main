import React from "react";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import InfoIcon from "@/components/icons/InfoIcon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import IconBorder from "@/components/ui/icon-border";

function DateRangeModalInfo({
  open,
  handleProceed,
  handleCancel,
  isLoading = false,
  setOpen,
}: {
  open: boolean;
  handleProceed: () => void;
  handleCancel: () => void;
  isLoading?: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6 md:max-w-[480px]">
        <div className="mb-4 flex justify-center">
          <IconBorder className="size-12 bg-[#D92D20] text-default-1000">
            <InfoIcon className="size-6" />
          </IconBorder>
        </div>
        <h2 className="mb-5 text-center text-lg font-semibold text-default-900">
          Confirm Date Range Change
        </h2>
        <div className="rounded-[9px] border border-[#D92D20]/30 bg-[#F044381A]/10 p-4">
          <div className="mb-4 flex items-center gap-2">
            <InfoIcon className="size-5 text-[#F04438]" />
            <p className="text-[#F5F5F6]">
              Changing the date range will result in the following updates to be
              applied:
            </p>
          </div>
          <ul className="list-disc space-y-2 px-5 text-base text-[#F5F5F6]">
            <li>All Automated Ticket Tiers will be deleted.</li>
            <li>
              Discount Codes which expire before the new event date will be
              deleted.
            </li>
            <li>
              All Challenges & Promotions previously linked to the event will be
              reset.
            </li>
          </ul>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button
            color="secondary"
            onClick={handleCancel}
            type="button"
            fullWidth
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={handleProceed}
            className="cursor-pointer"
            type="button"
          >
            <ButtonLoadingContent
              isLoading={isLoading}
              actionContent="Proceed"
            />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DateRangeModalInfo;
