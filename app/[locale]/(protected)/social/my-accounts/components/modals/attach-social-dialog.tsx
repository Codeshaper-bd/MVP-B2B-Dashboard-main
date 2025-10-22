"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import AttachForm from "./attach-form";

const iconImage = (
  <Image
    src={"/assets/all/instagram.png"}
    alt=""
    width={60}
    height={60}
    className="size-12"
  />
);
function AttachSocialDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleSubmitButtonClick = useCallback(
    (submitButtonRef: React.RefObject<HTMLButtonElement | null>) => () => {
      if ("current" in submitButtonRef) {
        submitButtonRef.current?.click?.();
      }
    },
    [],
  );

  return (
    <DialogContextProvider>
      <DialogTrigger asChild>
        <Button type="button" color="primary">
          Connect
        </Button>
      </DialogTrigger>

      <CustomizedDialog
        maxWidth="512px"
        status="transparent-with-rounded-border"
        mode="grid-bg"
        position="left"
        title="Select Instagram Account type"
        description="Business or Creator Accounts"
        icon={iconImage}
        withCloseButton
        onClose={({ disableAutoClose, setClose }) => {
          if (!disableAutoClose) {
            setClose();
          }
        }}
      >
        <div className="custom-scrollbar max-h-[65vh]">
          <AttachForm
            ref={submitButtonRef}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        </div>

        <CustomizedDialog.Buttons>
          <CustomizedDialog.Buttons.SecondaryButton
            className="h-11"
            disabled={isSubmitting}
          >
            Cancel
          </CustomizedDialog.Buttons.SecondaryButton>

          <CustomizedDialog.Buttons.PrimaryButton
            className="h-11"
            // eslint-disable-next-line react-compiler/react-compiler
            onClick={handleSubmitButtonClick(submitButtonRef)}
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

export default AttachSocialDialog;
