"use client";
import { memo, useRef, useState } from "react";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import { LocationIcon as LocationIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import AddOrEditVenueForm from "../AddOrEditVenueForm";
import type { IAddOrEditVenueProps } from "../AddOrEditVenueForm/types";

const defaultTargetButton = (
  <Button
    color="secondary"
    type="button"
    className="mb-1 w-full rounded-[6px] border-default-200 bg-default-100 hover:bg-default-200"
  >
    + Add New Venue
  </Button>
);

function AddOrEditVenueDialog({
  isEditMode = false,
  slug,
  targetButton = defaultTargetButton,
  isPrimaryMode,
  onSuccessAddVenue,
}: IAddOrEditVenueProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <DialogContextProvider>
        <DialogTrigger asChild>{targetButton}</DialogTrigger>

        <CustomizedDialog
          maxWidth="720px"
          status="transparent-with-rounded-border"
          mode="grid-bg"
          title={isEditMode ? "Edit Venue" : "Add Venue"}
          description="Please provide the required information to complete this form."
          descriptionClassName="pt-0"
          icon={<LocationIcon className="size-5 text-default-700" />}
          withCloseButton
          onClose={({ disableAutoClose, setClose }) => {
            if (!disableAutoClose) {
              setClose();
            }
          }}
        >
          <AddOrEditVenueForm
            isEditMode={isEditMode}
            isPrimaryMode={isPrimaryMode}
            slug={slug}
            ref={submitBtnRef}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            onSuccessAddVenue={onSuccessAddVenue}
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
                actionContent={isEditMode ? "Update Venue" : "Add Venue"}
              />
            </CustomizedDialog.Buttons.PrimaryButton>
          </CustomizedDialog.Buttons>
        </CustomizedDialog>
      </DialogContextProvider>
    </div>
  );
}

export default memo(AddOrEditVenueDialog);
