"use client";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import ClockPlusIcon from "@/components/icons/ClockPlusIcon";
import { PlusIcon as PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import CreatePromotionForm from "../Forms/CreatePromotionForm";

const handleSubmitButtonClick =
  (submitButtonRef: React.RefObject<HTMLButtonElement | null>) => () =>
    submitButtonRef.current?.click();

interface ICreatePromotionModalProps {
  triggerButtonWithoutIcon?: boolean;
  triggerButtonHeight?: "40" | "48";
}

function CreatePromotionModal({
  triggerButtonWithoutIcon,
  triggerButtonHeight = "40",
}: ICreatePromotionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <DialogContextProvider disableAutoClose>
      <DialogTrigger asChild>
        <Button
          color="primary"
          className={cn("shrink-0 gap-2.5", {
            "h-full min-h-10": triggerButtonHeight === "40",
            "h-full min-h-12": triggerButtonHeight === "48",
          })}
        >
          {!triggerButtonWithoutIcon && (
            <PlusIcon className="h-full w-3 text-default-200" />
          )}
          Create a New Promotion
        </Button>
      </DialogTrigger>

      <CustomizedDialog
        maxWidth="512px"
        mode="grid-bg"
        status="transparent-with-rounded-border"
        title="Add Promotion"
        description="Please provide the required information to complete this form."
        descriptionClassName="pt-0"
        icon={<ClockPlusIcon className="size-5 text-default-700" />}
        withCloseButton
        childrenContainerClassName="px-3"
      >
        <ScrollArea className="h-[calc(100vh-27.5rem)] px-3">
          <CreatePromotionForm
            ref={submitButtonRef}
            isEditMode={false}
            editItemSlug={null}
            setIsSubmitting={setIsSubmitting}
          />
        </ScrollArea>

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
              actionContent="Submit"
            />
          </CustomizedDialog.Buttons.PrimaryButton>
        </CustomizedDialog.Buttons>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default CreatePromotionModal;
