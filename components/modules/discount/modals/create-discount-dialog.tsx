"use client";
import { useRef, useState } from "react";

import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import DiscountIcon from "@/components/icons/DiscountIcon";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import CreateOrEditDiscountForm from "../forms";
import type { TCreateOrEditDiscountFormProps } from "../forms/types";

type TCreateDiscountDialogProps = TCreateOrEditDiscountFormProps & {
  triggerClassName?: string;
  triggerContent?: React.ReactNode;
  getAnEventData: TNullish | TEvent;
};

function CreateDiscountDialog({
  triggerClassName,
  triggerContent = (
    <Button size="sm" color="secondary" className={triggerClassName}>
      Create Discount Code
    </Button>
  ),
  ...restProps
}: TCreateDiscountDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <DialogContextProvider>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>

      <CustomizedDialog
        maxWidth="512px"
        status="transparent-with-rounded-border"
        mode="grid-bg"
        position="left"
        title="Create Discount"
        description="Please provide the required information to complete this form."
        icon={<DiscountIcon className="size-6 text-default-700" />}
        withCloseButton
        onClose={({ disableAutoClose, setClose }) => {
          if (!disableAutoClose) {
            setClose();
          }
        }}
      >
        <CreateOrEditDiscountForm
          {...restProps}
          ref={submitBtnRef}
          setIsSubmitting={setIsSubmitting}
        />

        <CustomizedDialog.Buttons>
          <CustomizedDialog.Buttons.SecondaryButton disabled={isSubmitting}>
            Cancel
          </CustomizedDialog.Buttons.SecondaryButton>

          <CustomizedDialog.Buttons.PrimaryButton
            onClick={() => {
              submitBtnRef.current?.click();
            }}
            disabled={isSubmitting}
          >
            <ButtonLoadingContent
              isLoading={isSubmitting}
              actionContent="Create"
            />
          </CustomizedDialog.Buttons.PrimaryButton>
        </CustomizedDialog.Buttons>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default CreateDiscountDialog;
