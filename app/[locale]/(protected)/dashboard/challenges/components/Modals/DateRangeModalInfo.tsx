import React from "react";

import CustomizedDialog from "@/components/CustomizedDialog";
import InfoIcon from "@/components/icons/InfoIcon";
import { Dialog } from "@/components/ui/dialog";

function DateRangeModalInfo({
  open,
  handleProceed,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleProceed: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <CustomizedDialog
        maxWidth="512px"
        mode="grid-bg"
        status="transparent-with-rounded-border"
        title="Date Range Info"
        description="All events outside the date of validity will be automatically unassigned to the event"
        descriptionClassName="pt-0"
        icon={<InfoIcon className="size-5 text-default-700" />}
        withCloseButton
        childrenContainerClassName="px-3"
        className="z-[1000]"
      >
        <CustomizedDialog.Buttons>
          <CustomizedDialog.Buttons.SecondaryButton>
            Cancel
          </CustomizedDialog.Buttons.SecondaryButton>

          <CustomizedDialog.Buttons.PrimaryButton onClick={handleProceed}>
            Proceed
          </CustomizedDialog.Buttons.PrimaryButton>
        </CustomizedDialog.Buttons>
      </CustomizedDialog>
    </Dialog>
  );
}

export default DateRangeModalInfo;
