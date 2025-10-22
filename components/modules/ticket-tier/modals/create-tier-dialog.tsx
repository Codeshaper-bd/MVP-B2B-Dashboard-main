"use client";

import React, { memo, useCallback, useRef, useState } from "react";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import TierIcon from "@/components/icons/TierIcon";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import CreateTierForm from "./../form";
import { type ICreateTierFormProps } from "./../form/types";

export type TCreateTierDialogProps = Omit<
  ICreateTierFormProps,
  "selectedSlug"
> & {
  triggerClassName?: string;
};
function CreateTierDialog({
  eventId,
  triggerClassName,
  onSubmitSuccess,
}: TCreateTierDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleSubmitButtonClick = useCallback(() => {
    submitButtonRef.current?.click?.();
  }, []);

  return (
    <DialogContextProvider>
      <DialogTrigger asChild>
        <Button size="sm" color="secondary" className={triggerClassName}>
          Create Tier
        </Button>
      </DialogTrigger>

      <CustomizedDialog
        maxWidth="512px"
        status="transparent-with-rounded-border"
        mode="grid-bg"
        position="left"
        title="Create Tier"
        description="Please provide the required information to complete this form."
        childrenContainerClassName="!px-0"
        icon={<TierIcon className="size-6" />}
        withCloseButton
        onClose={({ disableAutoClose, setClose }) => {
          if (!disableAutoClose || !isSubmitting) {
            setClose();
          }
        }}
      >
        <ScrollArea className="h-[37.5dvh] !overflow-visible">
          <div className="px-6">
            <CreateTierForm
              ref={submitButtonRef}
              eventId={eventId}
              selectedSlug={null}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              onSubmitSuccess={onSubmitSuccess}
            />
          </div>
        </ScrollArea>

        <CustomizedDialog.Buttons className="px-6">
          <CustomizedDialog.Buttons.SecondaryButton disabled={isSubmitting}>
            Cancel
          </CustomizedDialog.Buttons.SecondaryButton>

          <CustomizedDialog.Buttons.PrimaryButton
            onClick={handleSubmitButtonClick}
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

export default memo(CreateTierDialog);
