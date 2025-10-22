"use client";
import { useRef, useState } from "react";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import ClockPlusIcon from "@/components/icons/ClockPlusIcon";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import AnEventTimeExtendForm from "./forms";
import type { IAnEventTimeExtendFormProps } from "./forms/types";

const handleSubmitButtonClick =
  (submitButtonRef: React.RefObject<HTMLButtonElement | null>) => () =>
    submitButtonRef.current?.click();
function ExtendTimeDialog({ eventSummery }: IAnEventTimeExtendFormProps) {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <DialogContextProvider>
      <DialogTrigger asChild>
        <Button type="button" color="secondary">
          <ClockPlusIcon className="me-2 size-5" /> Extend Time
        </Button>
      </DialogTrigger>

      <CustomizedDialog
        maxWidth="512px"
        status="warning"
        mode="ring-bg"
        position="left"
        title="Extend Time"
        description=""
        icon={<ClockPlusIcon className="size-5" />}
        withCloseButton
        iconRounded="10px"
        descriptionClassName="pt-0"
      >
        <div className="custom-scrollbar max-h-[65vh]">
          <AnEventTimeExtendForm
            eventSummery={eventSummery}
            ref={submitButtonRef}
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
              actionContent="Add Time"
            />
          </CustomizedDialog.Buttons.PrimaryButton>
        </CustomizedDialog.Buttons>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default ExtendTimeDialog;
