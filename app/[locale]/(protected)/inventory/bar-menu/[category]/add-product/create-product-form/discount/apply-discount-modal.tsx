"use client";
import { memo, useRef } from "react";

import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import ClockIcon from "@/components/icons/ClockIcon";
import DiscountIcon from "@/components/icons/DiscountIcon";
import DollarIcon from "@/components/icons/DollarIcon";
import SelectInput from "@/components/SelectInput";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const hoursOption: IOption[] = [
  { value: "2hours", label: "2 Hours" },
  { value: "12 hours", label: "12 Hours" },
  { value: "24 hours", label: "24 Hours" },
];
const amountOption: IOption[] = [
  { value: "20", label: "20" },
  { value: "12", label: "12" },
  { value: "24", label: "24" },
];

function ApplyDiscountModal() {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <DialogContextProvider disableAutoClose>
      <DialogTrigger asChild>
        <Button className="rounded-[8px]">
          <DiscountIcon className="me-1 size-4" /> Apply Discount
        </Button>
      </DialogTrigger>
      <CustomizedDialog
        maxWidth="512px"
        mode="grid-bg"
        status="transparent-with-rounded-border"
        title="Apply Discount"
        description="Please provide the required information to complete this form."
        icon={<DiscountIcon className="size-5 text-default-700" />}
        withCloseButton
      >
        <form
          noValidate
          className="custom-scrollbar max-h-[50vh] space-y-6 overflow-y-scroll px-1 pb-2"
        >
          <Input
            type="text"
            size="md"
            placeholder="Discount Name"
            label="Discount Name"
          />
          <SelectInput
            options={hoursOption}
            label="Duration"
            placeholder="Select duration"
            leftContent={<ClockIcon className="size-5 text-default-600" />}
          />
          <SelectInput
            options={amountOption}
            label="Discount Amount"
            placeholder="Select Amount"
            leftContent={<DollarIcon className="size-5 text-default-600" />}
          />
        </form>

        <CustomizedDialog.Buttons>
          <CustomizedDialog.Buttons.SecondaryButton
            className="rounded-[8px]"
            size="lg"
            disabled
          >
            Cancel
          </CustomizedDialog.Buttons.SecondaryButton>

          <CustomizedDialog.Buttons.PrimaryButton
            className="rounded-[8px]"
            size="lg"
            onClick={() => submitButtonRef.current?.click()}
            disabled
          >
            Apply Discount
          </CustomizedDialog.Buttons.PrimaryButton>
        </CustomizedDialog.Buttons>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default memo(ApplyDiscountModal);
