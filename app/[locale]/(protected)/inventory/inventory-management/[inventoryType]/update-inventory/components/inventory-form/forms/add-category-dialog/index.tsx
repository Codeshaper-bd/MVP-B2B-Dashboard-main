"use client";
import { memo, useRef, useState } from "react";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import { PlusIcon as PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import AddInventoryCategoryForm from "./AddInventoryCategoryForm";
import type { IAddInventoryCategoryProps } from "./AddInventoryCategoryForm/types";

const defaultTargetButton = (
  <Button
    color="secondary"
    type="button"
    className="mb-1 w-full rounded-[6px] border-default-200 bg-default-100 hover:bg-default-200"
  >
    + Add New Category
  </Button>
);

function AddInventoryCategoryDialog({
  targetButton = defaultTargetButton,
  isPrimaryMode,
  slug,
  isEditMode,
  categoryType,
}: Omit<IAddInventoryCategoryProps, "isSubmitting" | "setIsSubmitting">) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <DialogContextProvider>
        <DialogTrigger asChild>{targetButton}</DialogTrigger>

        <CustomizedDialog
          maxWidth="480px"
          status="transparent-with-rounded-border"
          mode="grid-bg"
          title={isEditMode ? "Edit Category" : "Add New Category"}
          description="Please provide the required information to complete this form."
          descriptionClassName="pt-0"
          icon={<PlusIcon className="size-5 text-default-700" />}
          withCloseButton
          onClose={({ disableAutoClose, setClose }) => {
            if (!disableAutoClose) {
              setClose();
            }
          }}
        >
          <AddInventoryCategoryForm
            isPrimaryMode={isPrimaryMode}
            ref={submitBtnRef}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            slug={slug}
            isEditMode={isEditMode}
            categoryType={categoryType}
          />

          <CustomizedDialog.Buttons>
            <CustomizedDialog.Buttons.SecondaryButton disabled={isSubmitting}>
              Cancel
            </CustomizedDialog.Buttons.SecondaryButton>

            <CustomizedDialog.Buttons.PrimaryButton
              onClick={() => {
                submitBtnRef.current?.click();
              }}
              disabled={isSubmitting}
            >
              <ButtonLoadingContent
                isLoading={isSubmitting}
                actionContent={
                  isEditMode ? "Update Category" : "Create Category"
                }
              />
            </CustomizedDialog.Buttons.PrimaryButton>
          </CustomizedDialog.Buttons>
        </CustomizedDialog>
      </DialogContextProvider>
    </div>
  );
}

export default memo(AddInventoryCategoryDialog);
