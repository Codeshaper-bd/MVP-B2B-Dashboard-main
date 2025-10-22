"use client";

import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import { useDeleteAEmployeeMutation } from "@/store/api/employees/employees-api";
import type {
  TDeleteAEmployeeArgs,
  TEmployee,
} from "@/store/api/employees/employees.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import DeleteIcon from "@/components/icons/DeleteIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import BgRings from "@/components/ui/BgRings";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface IDeleteEmployeeDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: TDeleteAEmployeeArgs["id"];
  firstName: TEmployee["firstName"];
  lastName: TEmployee["lastName"];
}

function DeleteEmployeeDialog({
  open,
  setOpen,
  id,
  firstName,
  lastName,
}: IDeleteEmployeeDialogProps) {
  const [deleteAEmployee, { isLoading }] = useDeleteAEmployeeMutation();
  const { toast } = useToast();

  const handleDelete = async (id: TIdOrSlugOrIdentifier<"id">["id"]) => {
    if (!id) {
      return;
    }
    const toastId = toast({
      variant: "loading",
      title: "Deleting Employee",
      description: "Please wait...",
    });
    try {
      const response = await deleteAEmployee({
        id,
      }).unwrap();

      if (response?.success) {
        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Employee Deleted Successfully!",
          description: getApiErrorMessage(
            undefined,
            "Congratulations! You have successfully deleted an employee.",
          ),
        });
      } else {
        toastId.update({
          id: toastId.id,
          variant: "error",
          title: "Employee Delete Failed",
          description: getApiErrorMessage(
            response?.message,
            "Something went wrong while deleting an employee.",
          ),
        });
      }
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Error Deleting Employee",
          description: "An error occurred while deleting the employee.",
        }),
      });
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <StatusAlert
        status="destructive"
        withCloseButton
        icon={<DeleteIcon className="size-5" />}
        title={`Delete - ${firstName} ${lastName}?`}
        description="Are you sure you want to delete this employee?"
      >
        <div className="space-y-8">
          <div className="flex items-center gap-4 overflow-hidden rounded-[12px] border border-[#F97066] bg-default-50 py-4 pe-4 ps-2">
            <BgRings className="transparent-with-rounded-border mx-auto flex size-8 items-center justify-center rounded-full border-[2px] border-warning border-opacity-30 bg-transparent p-6">
              <BgRings className="transparent-with-rounded-border mx-auto flex size-5 items-center justify-center rounded-full border-[2px] border-warning border-opacity-60 bg-transparent">
                <BgRings.Content>
                  <InfoIcon className="size-5 text-warning" />
                </BgRings.Content>
              </BgRings>
            </BgRings>
            <div>The employee will be deleted permanently</div>
          </div>
          <div className="grid w-full grid-cols-2 gap-3">
            <Button
              fullWidth
              color="secondary"
              className="rounded-[8px] bg-default-50"
              size="lg"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button
              fullWidth
              color="primary"
              className="rounded-[8px]"
              size="lg"
              onClick={() => handleDelete(id)}
              disabled={isLoading}
            >
              <ButtonLoadingContent
                isLoading={isLoading}
                actionContent="Delete"
                loadingContent="Deleting"
              />
            </Button>
          </div>
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default DeleteEmployeeDialog;
