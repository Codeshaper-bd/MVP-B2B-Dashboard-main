"use client";

import { memo, useRef, useState } from "react";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import GridIcon from "@/components/icons/GridIcon";
import SquarePenIcon from "@/components/icons/SquarePenIcon";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import CreateBarForm, { type ICreateBarFormProps } from "../forms/bar-form";

const handleSubmitButtonClick =
  (submitButtonRef: React.RefObject<HTMLButtonElement | null>) => () =>
    submitButtonRef.current?.click();

function EditBarDialog({ barSlug }: ICreateBarFormProps) {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <DialogContextProvider>
      <DialogTrigger asChild>
        <Button
          type="button"
          color="secondary"
          className="hover:border-primary hover:text-primary"
        >
          <SquarePenIcon className="me-1.5 size-3.5 text-default-700" /> Edit
          Bar
        </Button>
      </DialogTrigger>

      <CustomizedDialog
        maxWidth="512px"
        status="transparent-with-rounded-border"
        mode="grid-bg"
        position="left"
        title="Update Bar"
        description=""
        icon={<GridIcon className="size-6 text-default-700" />}
        withCloseButton
      >
        <CreateBarForm
          ref={submitButtonRef}
          isEdit
          barSlug={barSlug}
          setIsSubmitting={setIsSubmitting}
        />
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
              actionContent="Update Bar"
            />
          </CustomizedDialog.Buttons.PrimaryButton>
        </CustomizedDialog.Buttons>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default memo(EditBarDialog);
