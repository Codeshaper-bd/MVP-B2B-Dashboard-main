"use client";

import { useRef, useState } from "react";

import type { TAddOn } from "@/store/api/add-ons/add-ons.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import TicketIcon from "@/components/icons/TicketIcon";

import AddonForm, { type IAddonFormProps } from "./../forms";
export interface IEditAddonDialog extends IAddonFormProps {
  open: boolean;
  onOpenChange?: React.Dispatch<
    React.SetStateAction<boolean | void | null | undefined>
  >;
  onCreateOrEditSuccess?: (data: TAddOn) => void;
}

const handleSubmitButtonClick =
  (submitButtonRef: React.RefObject<HTMLButtonElement | null>) => () =>
    submitButtonRef.current?.click();

function EditAddonDialog({
  isEdit,
  selectedSlug,
  onCreateOrEditSuccess,
  open,
  onOpenChange,
}: IEditAddonDialog) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <DialogContextProvider open={open} onOpenChange={onOpenChange}>
      <CustomizedDialog
        maxWidth="480px"
        status="warning"
        mode="ring-bg"
        title=""
        description=""
        descriptionClassName="pt-0"
        icon={<TicketIcon className="size-6 text-[#0C111D]" />}
        withCloseButton
        onClose={({ disableAutoClose, setClose }) => {
          if (!disableAutoClose) {
            setClose();
          }
        }}
        className="no-scrollbar max-h-[90vh]"
      >
        <div className="no-scrollbar -mt-[100px] h-[400px]">
          <AddonForm
            isEdit={isEdit}
            ref={submitButtonRef}
            selectedSlug={selectedSlug}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            onSuccess={onCreateOrEditSuccess}
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

export default EditAddonDialog;
