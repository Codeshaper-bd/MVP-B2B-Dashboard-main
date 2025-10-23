"use client";
import { useRef, useState } from "react";

import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import type { TPromotion } from "@/store/api/promotion/promotion.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import { EditIcon as EditPenIcon } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";

import CreatePromotionForm from "../Forms/CreatePromotionForm";

const handleSubmitButtonClick =
  (submitButtonRef: React.RefObject<HTMLButtonElement | null>) => () =>
    submitButtonRef.current?.click();

interface IEditPromotionModalProps {
  open: boolean;
  onOpenChange: React.Dispatch<
    React.SetStateAction<boolean | void | null | undefined>
  >;
  editItemSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
  onSuccess?: (data: TPromotion) => void;
}

function EditPromotionModal({
  open,
  onOpenChange,
  editItemSlug,
  onSuccess,
}: IEditPromotionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <DialogContextProvider open={open} onOpenChange={onOpenChange}>
      <CustomizedDialog
        maxWidth="512px"
        mode="grid-bg"
        status="transparent-with-rounded-border"
        title="Edit Promotion"
        description="Please provide the required information to complete this form."
        icon={<EditPenIcon className="size-5 text-default-700" />}
        withCloseButton
        childrenContainerClassName="px-3"
      >
        <ScrollArea className="h-[calc(100vh-27.5rem)] px-3">
          <CreatePromotionForm
            ref={submitButtonRef}
            setIsSubmitting={setIsSubmitting}
            editItemSlug={editItemSlug}
            isEditMode
            onSuccess={onSuccess}
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

export default EditPromotionModal;
