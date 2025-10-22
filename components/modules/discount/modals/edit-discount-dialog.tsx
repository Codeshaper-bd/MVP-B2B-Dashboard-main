"use client";

import { memo, useCallback, useRef, useState } from "react";

import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import DiscountIcon from "@/components/icons/DiscountIcon";

import CreateOrEditDiscountForm from "../forms";
import type { TCreateOrEditDiscountFormProps } from "../forms/types";

export type TEditDiscountDialogFormProps = TCreateOrEditDiscountFormProps & {
  open: boolean;
  setOpen: React.Dispatch<
    React.SetStateAction<boolean | void | null | undefined>
  >;
  getAnEventData: TNullish | TEvent;
};

function EditDiscountDialog({
  open,
  setOpen,
  ...restProps
}: TEditDiscountDialogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const handleSubmitButtonClick = useCallback(
    (submitButtonRef: React.RefObject<HTMLButtonElement | null>) => () =>
      submitButtonRef.current?.click(),
    [],
  );

  return (
    <DialogContextProvider open={open} onOpenChange={setOpen}>
      <CustomizedDialog
        maxWidth="512px"
        status="transparent-with-rounded-border"
        mode="grid-bg"
        position="left"
        title="Edit Discount"
        description="Please provide the required information to complete this form."
        icon={<DiscountIcon className="size-6 text-default-700" />}
        withCloseButton
        onClose={({ disableAutoClose, setClose }) => {
          if (!disableAutoClose) {
            setClose();
          }
        }}
      >
        <div className="no-scrollbar h-[460px]">
          <CreateOrEditDiscountForm
            {...restProps}
            ref={submitBtnRef}
            setIsSubmitting={setIsSubmitting}
          />
        </div>

        <CustomizedDialog.Buttons>
          <CustomizedDialog.Buttons.SecondaryButton disabled={isSubmitting}>
            Cancel
          </CustomizedDialog.Buttons.SecondaryButton>

          <CustomizedDialog.Buttons.PrimaryButton
            // eslint-disable-next-line react-compiler/react-compiler
            onClick={handleSubmitButtonClick(submitBtnRef)}
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

export default memo(EditDiscountDialog);
