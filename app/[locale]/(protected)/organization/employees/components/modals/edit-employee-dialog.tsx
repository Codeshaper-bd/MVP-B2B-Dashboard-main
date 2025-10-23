"use client";

import { useRef, useState } from "react";

import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import { EditIcon as EditPenIcon } from "@/components/icons";
import PencilIcon from "@/components/icons/PencilIcon";
import CustomerIcon from "@/components/icons/sidebar/CustomerIcon";
import CreateEmployeeForm from "@/components/modules/employees/form";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const handleSubmitButtonClick =
  (submitButtonRef: React.RefObject<HTMLButtonElement | null>) => () =>
    submitButtonRef.current?.click();

function EditEmployeeDialog({
  employeeId,
  isEmployeeAnalytics,
}: {
  employeeId: TIdOrSlugOrIdentifier<"id">["id"];
  isEmployeeAnalytics?: boolean;
}) {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <DialogContextProvider>
      <div className="lg:h-full">
        <DialogTrigger asChild>
          {!isEmployeeAnalytics ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              color="primary"
              className="text-default-600"
              rounded="full"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <PencilIcon className="size-5" />
            </Button>
          ) : (
            <Button
              type="button"
              color="secondary"
              onClick={(event) => {
                event.stopPropagation();
              }}
              className="rounded-[8px] !px-3"
            >
              <EditPenIcon className="me-1 size-5" />
              Edit Employee Profile
            </Button>
          )}
        </DialogTrigger>
        <CustomizedDialog
          maxWidth="512px"
          status="transparent-with-rounded-border"
          mode="grid-bg"
          position="left"
          title="Edit Employees"
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
          <ScrollArea className="h-[calc(100vh-16rem)] lg:h-[calc(100vh-29rem)]">
            <CreateEmployeeForm
              isEdit={true}
              employeeId={employeeId}
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
                loadingContent="Updating Employee"
              />
            </CustomizedDialog.Buttons.PrimaryButton>
          </CustomizedDialog.Buttons>
        </CustomizedDialog>
      </div>
    </DialogContextProvider>
  );
}

export default EditEmployeeDialog;
