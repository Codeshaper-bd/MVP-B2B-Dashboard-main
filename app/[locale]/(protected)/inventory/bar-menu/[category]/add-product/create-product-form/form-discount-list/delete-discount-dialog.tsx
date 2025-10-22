"use client";

import useBooleanState from "@/hooks/useBooleanState";
import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import { useDeleteADiscountMutation } from "@/store/api/discounts/discounts-api";
import InfoIcon from "@/components/icons/InfoIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

interface IDeleteDiscountDialogProps {
  open: boolean;
  setOpen: React.Dispatch<
    React.SetStateAction<boolean | undefined | null | void>
  >;
  id: TIdOrSlugOrIdentifier<"id">["id"];
}

function DeleteDiscountDialog({
  open,
  setOpen,
  id,
}: IDeleteDiscountDialogProps) {
  const {
    state: isDeleteAlertOpen,
    setOpen: setIsDeleteAlertOpen,
    setClose: setIsDeleteAlertClose,
  } = useBooleanState();
  const [deleteDiscount, { isLoading }] = useDeleteADiscountMutation();
  const { toast } = useToast();

  const handleDelete = async (id: TIdOrSlugOrIdentifier<"id">["id"]) => {
    const toastId = toast({
      variant: "loading",
      title: "Deleting Discount",
      description: "Please wait...",
    });

    try {
      if (!checkIsValidId(id, { type: "number" })) {
        throw new Error("Discount ID is required to delete discount");
      }

      const response = await deleteDiscount({
        id,
      }).unwrap();
      if (!response?.success) {
        throw new Error(response?.message || "Failed to delete discount");
      }

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Discount Deleted Successfully!",
        description: getApiErrorMessage(
          undefined,
          "Congratulations! You have successfully deleted an discount.",
        ),
      });
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Discount Deletion Failed",
          description: "An error occurred while deleting the discount.",
        }),
      });
    }
  };

  return (
    <AlertDialog open={isDeleteAlertOpen}>
      <StatusAlert
        status="destructive"
        withCloseButton
        disableInternallyClose
        onClose={setIsDeleteAlertClose({
          // afterExecute: handleClearData(setCardData),
        })}
        icon={<InfoIcon className="size-5" />}
        title="Delete Promotion"
        description="Are you sure you want to delete this promotion? This action cannot be undone."
      >
        <StatusAlert.Buttons.SecondaryButton
          disableInternallyClose
          onClick={setIsDeleteAlertClose({
            // afterExecute: handleClearData(setCardData),
          })}
        >
          Close
        </StatusAlert.Buttons.SecondaryButton>
        <StatusAlert.Buttons.PrimaryButton
        // onClick={handleDelete({
        //   toastProps,
        //   deleteAPromotion,
        //   data: cardData,
        //   setIsDeleteAlertClose,
        //   setCardData,
        // })}
        >
          Continue
        </StatusAlert.Buttons.PrimaryButton>
      </StatusAlert>
    </AlertDialog>
  );
}

export default DeleteDiscountDialog;
