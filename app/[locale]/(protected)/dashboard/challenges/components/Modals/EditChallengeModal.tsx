"use client";
import { useRef, useState } from "react";

import type { TChallenge } from "@/store/api/challenges/challenges.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import { EditIcon as EditPenIcon } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";

import CreateChallengeForm, {
  type TCreateChallengeFormProps,
} from "../Forms/CreateChallengeForm";

const handleSubmitButtonClick =
  (submitButtonRef: React.RefObject<HTMLButtonElement | null>) => () =>
    submitButtonRef.current?.click();

type TEditChallengeModalProps = TCreateChallengeFormProps & {
  open: boolean;
  onOpenChange: React.Dispatch<
    React.SetStateAction<boolean | void | null | undefined>
  >;
  onSuccess?: (data: TChallenge) => void;
};

function EditChallengeModal({
  open,
  onOpenChange,
  ...restProps
}: TEditChallengeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <DialogContextProvider open={open} onOpenChange={onOpenChange}>
      <CustomizedDialog
        maxWidth="512px"
        mode="grid-bg"
        status="transparent-with-rounded-border"
        title="Edit Challenges"
        description="Please provide the required information to complete this form."
        icon={<EditPenIcon className="size-5 text-default-700" />}
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

export default EditChallengeModal;
