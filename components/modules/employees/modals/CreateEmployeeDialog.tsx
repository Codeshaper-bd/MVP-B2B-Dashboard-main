"use client";
import { useRef, useState } from "react";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import { PlusIcon as PlusIcon } from "@/components/icons";
import CustomerIcon from "@/components/icons/sidebar/CustomerIcon";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import CreateEmployeeForm from "../form";

const handleSubmitButtonClick =
  (submitButtonRef: React.RefObject<HTMLButtonElement | null>) => () =>
    submitButtonRef.current?.click();
function CreateEmployeeDialog() {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <DialogContextProvider>
      <div className="lg:h-full">
        <DialogTrigger asChild>
          <Button
            color="primary"
            className="font-semibold text-default"
            size="lg"
          >
            <PlusIcon className="size-5" /> Add New Employee
          </Button>
        </DialogTrigger>
        <CustomizedDialog
          maxWidth="512px"
          status="transparent-with-rounded-border"
          mode="grid-bg"
          position="left"
          title="Add Employees"
          description="Please provide the required information to complete this form."
          icon={<CustomerIcon className="size-5" />}
          withCloseButton
          iconRounded="10px"
          descriptionClassName="pt-0"
          onClose={({ disableAutoClose, setClose }) => {
            if (!disableAutoClose) {
              setClose();
            }
          }}
        >
          <ScrollArea className="h-[calc(100vh-14rem)] lg:h-[calc(100vh-26rem)]">
            <CreateEmployeeForm
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
                actionContent="Create Account"
              />
            </CustomizedDialog.Buttons.PrimaryButton>
          </CustomizedDialog.Buttons>
        </CustomizedDialog>
      </div>
    </DialogContextProvider>
  );
}

export default CreateEmployeeDialog;
