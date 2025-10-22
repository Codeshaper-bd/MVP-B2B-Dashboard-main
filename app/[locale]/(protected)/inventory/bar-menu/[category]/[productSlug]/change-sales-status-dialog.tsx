"use client";

import { type TExternalState } from "@/hooks/useBooleanState";
import InfoIcon from "@/components/icons/InfoIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";

interface IChangeSalesStatusDialogProps {
  isOpen: boolean;
  setIsStatusChangeAlertOpen: (
    props: Partial<TExternalState> | void,
  ) => () => void;
  setIsStatusChangeAlertClose: (
    props: Partial<TExternalState> | void,
  ) => () => void;
  onStatusChange: (isSaleable: boolean) => void;
  isSaleable: boolean;
}

function ChangeSalesStatusDialog({
  isOpen,
  setIsStatusChangeAlertOpen,
  setIsStatusChangeAlertClose,
  onStatusChange,
  isSaleable,
}: IChangeSalesStatusDialogProps) {
  // const {
  //   state: isDeleteAlertOpen,
  //   setOpen: setIsDeleteAlertOpen,
  //   setClose: setIsDeleteAlertClose,
  // } = useBooleanState();

  // const handleDelete =
  //   ({
  //     slug,
  //     toastProps: { toast },
  //     setIsDeleteAlertClose,
  //   }: {
  //     slug: TIdOrSlugOrIdentifier<"slug">["slug"];
  //     toastProps: TUseToastReturnType;
  //     setIsDeleteAlertClose: (
  //       props: Partial<TExternalState> | void,
  //     ) => () => void;
  //   }) =>
  //   async () => {
  //     const toastId = toast({
  //       variant: "loading",
  //       title: "Deleting Product",
  //       description: "Please wait...",
  //     });

  //     try {
  //       if (!checkIsValidId(slug, { type: "string" })) {
  //         throw new Error("Product ID is required to delete the produ");
  //       }

  //       const response = await deleteBarMenuItem({
  //         slug,
  //       }).unwrap();
  //       if (!response?.success) {
  //         throw new Error(response?.message || "Failed to delete the product.");
  //       }

  //       toastId.update({
  //         id: toastId.id,
  //         variant: "success",
  //         title: "Product Deleted Successfully!",
  //         description: getApiErrorMessage(
  //           undefined,
  //           "Congratulations! You have successfully deleted an the product..",
  //         ),
  //       });
  //       setIsDeleteAlertClose()();
  //     } catch (error) {
  //       console.error("🚀 ~ error:", error);
  //       toastId.update({
  //         id: toastId.id,
  //         variant: "error",
  //         ...getApiErrorMessages({
  //           error,
  //           title: "Product Deletion Failed",
  //           description: "An error occurred while deleting the product..",
  //         }),
  //       });
  //     }
  //   };

  return (
    <AlertDialog open={isOpen}>
      <StatusAlert
        status="destructive"
        withCloseButton
        disableInternallyClose
        onClose={setIsStatusChangeAlertClose?.()}
        icon={<InfoIcon className="size-5" />}
        title={`Change Sales Status`}
        description={`Are you sure you want to change sale status to ${isSaleable ? "off" : "on"}?`}
      >
        <StatusAlert.Buttons.SecondaryButton
          disableInternallyClose
          onClick={setIsStatusChangeAlertClose?.()}
        >
          Cancel
        </StatusAlert.Buttons.SecondaryButton>
        <StatusAlert.Buttons.PrimaryButton
          onClick={() => {
            onStatusChange?.(!isSaleable);
            setIsStatusChangeAlertClose?.()?.();
          }}
        >
          {isSaleable ? "Turn Off Sales" : "Turn On Sales"}
        </StatusAlert.Buttons.PrimaryButton>
      </StatusAlert>
    </AlertDialog>
  );
}

export default ChangeSalesStatusDialog;
