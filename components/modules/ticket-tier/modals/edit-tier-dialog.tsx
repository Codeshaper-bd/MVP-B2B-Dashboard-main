"use client";

import { memo, useRef, useState } from "react";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import TierIcon from "@/components/icons/TierIcon";

import CreateTierForm from "./../form";
import { type ICreateTierFormProps } from "./../form/types";

const handleSubmitButtonClick =
  (submitButtonRef: React.RefObject<HTMLButtonElement | null>) => () =>
    submitButtonRef.current?.click();

export interface ICreateTierDialogFormProps extends ICreateTierFormProps {
  open: boolean;
  setOpen: React.Dispatch<
    React.SetStateAction<boolean | void | null | undefined>
  >;
}
function EditTierDialog({
  eventId,
  open,
  setOpen,
  selectedSlug,
}: ICreateTierDialogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <DialogContextProvider open={open} onOpenChange={setOpen}>
      <CustomizedDialog
        maxWidth="512px"
        status="transparent-with-rounded-border"
        mode="grid-bg"
        position="left"
        title="Update Tier"
        description="Please provide the required information to complete this form."
        icon={<TierIcon className="size-6" />}
        withCloseButton
        onClose={({ disableAutoClose, setClose }) => {
          if (!disableAutoClose) {
            setClose();
          }
        }}
      >
        <div className="no-scrollbar h-[360px]">
          <CreateTierForm
            ref={submitButtonRef}
            eventId={eventId}
            selectedSlug={selectedSlug}
            isEditMode
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        </div>

        <CustomizedDialog.Buttons>
          <CustomizedDialog.Buttons.SecondaryButton disabled={isSubmitting}>
            Cancel
          </CustomizedDialog.Buttons.SecondaryButton>

          <CustomizedDialog.Buttons.PrimaryButton
            // eslint-disable-next-line react-compiler/react-compiler
            onClick={handleSubmitButtonClick(submitButtonRef)}
            disabled={isSubmitting}
          >
            <ButtonLoadingContent
              isLoading={isSubmitting}
              actionContent="Update"
            />
          </CustomizedDialog.Buttons.PrimaryButton>
        </CustomizedDialog.Buttons>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default memo(EditTierDialog);
