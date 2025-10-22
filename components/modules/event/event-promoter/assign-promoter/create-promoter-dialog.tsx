"use client";

import { memo, useRef, useState } from "react";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import TicketLinkIcon from "@/components/icons/TicketLinkIcon";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import AssignPromoterForm from "./forms";
import type { IAssignPromoter } from "./forms/types";

export interface ICreatePromoterDialogProps extends IAssignPromoter {
  triggerClassName?: string;
}
function CreatePromoterDialog({
  eventId,
  triggerClassName,
}: ICreatePromoterDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <DialogContextProvider>
      <DialogTrigger asChild>
        <Button
          color="secondary"
          size="sm"
          type="button"
          className={triggerClassName}
        >
          Assign Promoter
        </Button>
      </DialogTrigger>

      <CustomizedDialog
        maxWidth="512px"
        status="transparent-with-rounded-border"
        mode="grid-bg"
        position="left"
        title="Assign Promoter"
        description=""
        icon={<TicketLinkIcon className="size-6 text-default-700" />}
        withCloseButton
        onClose={({ disableAutoClose, setClose }) => {
          if (!disableAutoClose || !isSubmitting) {
            setClose();
          }
        }}
      >
        <AssignPromoterForm
          eventId={eventId}
          ref={submitButtonRef}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />

        <CustomizedDialog.Buttons>
          <CustomizedDialog.Buttons.SecondaryButton disabled={isSubmitting}>
            Cancel
          </CustomizedDialog.Buttons.SecondaryButton>

          <CustomizedDialog.Buttons.PrimaryButton
            onClick={() => {
              submitButtonRef.current?.click();
            }}
            disabled={isSubmitting}
          >
            <ButtonLoadingContent
              isLoading={isSubmitting}
              actionContent="Submit"
            />
          </CustomizedDialog.Buttons.PrimaryButton>
        </CustomizedDialog.Buttons>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default memo(CreatePromoterDialog);
