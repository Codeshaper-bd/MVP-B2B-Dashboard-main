"use client";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { TChallenge } from "@/store/api/challenges/challenges.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import FlashIcon from "@/components/icons/FlashIcon";
import { PlusIcon as PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import CreateChallengeForm, {
  type TCreateChallengeFormProps,
} from "../Forms/CreateChallengeForm";

type TCreateChallengeModalProps = TCreateChallengeFormProps & {
  triggerButtonWithoutIcon?: boolean;
  triggerButtonHeight?: "40" | "48";
  triggerButton?: React.ReactNode;
  onSuccess?: (data: TChallenge) => void;
};

function CreateChallengeModal({
  triggerButtonWithoutIcon,
  triggerButtonHeight = "40",
  triggerButton = (
    <Button
      color="primary"
      className={cn("shrink-0 gap-1.5", {
        "h-full min-h-10": triggerButtonHeight === "40",
        "h-full min-h-12": triggerButtonHeight === "48",
      })}
    >
      {!triggerButtonWithoutIcon && (
        <PlusIcon className="size-4 h-full text-default-200" />
      )}
      Create Challenge
    </Button>
  ),
  ...restProps
}: TCreateChallengeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <DialogContextProvider disableAutoClose>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>

      <CustomizedDialog
        maxWidth="512px"
        mode="grid-bg"
        status="transparent-with-rounded-border"
        title="Add Challenges"
        description="Please provide the required information to complete this form."
        descriptionClassName="pt-0"
        icon={<FlashIcon className="size-5 text-default-700" />}
        withCloseButton
      >
        <ScrollArea className="-mx-6 h-[calc(100vh-26.5rem)] px-4">
          <CreateChallengeForm
            {...restProps}
            ref={submitButtonRef}
            setIsSubmitting={setIsSubmitting}
          />
        </ScrollArea>

        <CustomizedDialog.Buttons>
          <CustomizedDialog.Buttons.SecondaryButton disabled={isSubmitting}>
            Cancel
          </CustomizedDialog.Buttons.SecondaryButton>

          <CustomizedDialog.Buttons.PrimaryButton
            onClick={() => submitButtonRef.current?.click()}
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

export default CreateChallengeModal;
