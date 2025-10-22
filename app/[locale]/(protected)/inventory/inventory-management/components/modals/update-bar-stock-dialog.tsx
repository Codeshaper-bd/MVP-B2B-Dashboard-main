"use client";
import { useRef, useState } from "react";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import CubeIcon from "@/components/icons/CubeIcon";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import BarStockForm, { type IBarStockFormProps } from "../forms/bar-stock-form";

const handleSubmitButtonClick =
  (submitButtonRef: React.RefObject<HTMLButtonElement | null>) => () =>
    submitButtonRef.current?.click();

function UpdateBarStockDialog({ item, currentStock }: IBarStockFormProps) {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <DialogContextProvider>
      <div className="lg:h-full">
        <DialogTrigger asChild>
          <Button color="secondary" size="sm">
            Update Stock
          </Button>
        </DialogTrigger>
        <CustomizedDialog
          maxWidth="512px"
          status="transparent-with-rounded-border"
          mode="grid-bg"
          position="left"
          title="Update Bar Stock"
          description="Please provide the required information to complete this form."
          icon={<CubeIcon className="size-5" />}
          withCloseButton
          iconRounded="10px"
          descriptionClassName="pt-0"
          onClose={({ disableAutoClose, setClose }) => {
            if (!disableAutoClose) {
              setClose();
            }
          }}
        >
          <ScrollArea>
            <BarStockForm
              item={item}
              currentStock={currentStock}
              setIsSubmitting={setIsSubmitting}
              ref={submitButtonRef}
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
                actionContent="Update Bar Stock"
              />
            </CustomizedDialog.Buttons.PrimaryButton>
          </CustomizedDialog.Buttons>
        </CustomizedDialog>
      </div>
    </DialogContextProvider>
  );
}

export default UpdateBarStockDialog;
