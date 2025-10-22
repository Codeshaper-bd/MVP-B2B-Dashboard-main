"use client";
import { useRef, useState } from "react";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import DiamondIcon from "@/components/icons/DiamondIcon";
import PackageIcon from "@/components/icons/PackageIcon";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import CreateShipmentForm from "./form";

const handleSubmitButtonClick =
  (submitButtonRef: React.RefObject<HTMLButtonElement | null>) => () =>
    submitButtonRef.current?.click();

function AddShipmentDialog() {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  return (
    <DialogContextProvider>
      <div className="lg:h-full">
        <DialogTrigger asChild>
          <Button color="secondary" type="button">
            <DiamondIcon className="me-1.5 size-4" /> Add Shipment
          </Button>
        </DialogTrigger>
        <CustomizedDialog
          maxWidth="800px"
          status="transparent-with-rounded-border"
          mode="grid-bg"
          position="left"
          title="Add Shipment"
          icon={<PackageIcon className="size-5" />}
          withCloseButton
          iconRounded="10px"
          descriptionClassName="pt-0"
          onClose={({ disableAutoClose, setClose }) => {
            if (!disableAutoClose) {
              setClose();
            }
          }}
        >
          <div className="no-scrollbar max-h-[calc(100vh-30rem)] min-h-[calc(100vh-18rem)] overflow-y-auto">
            <CreateShipmentForm
              setIsSubmitting={setIsSubmitting}
              setIsDisabled={setIsDisabled}
              ref={submitButtonRef}
            />
          </div>

          <CustomizedDialog.Buttons>
            <CustomizedDialog.Buttons.SecondaryButton disabled={isSubmitting}>
              Cancel
            </CustomizedDialog.Buttons.SecondaryButton>

            <CustomizedDialog.Buttons.PrimaryButton
              // eslint-disable-next-line react-compiler/react-compiler
              onClick={handleSubmitButtonClick(submitButtonRef)}
              disabled={isDisabled || isSubmitting}
            >
              <ButtonLoadingContent
                isLoading={isSubmitting}
                actionContent="Add Shipment"
              />
            </CustomizedDialog.Buttons.PrimaryButton>
          </CustomizedDialog.Buttons>
        </CustomizedDialog>
      </div>
    </DialogContextProvider>
  );
}

export default AddShipmentDialog;
