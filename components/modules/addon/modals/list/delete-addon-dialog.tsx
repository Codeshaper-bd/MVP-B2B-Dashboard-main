"use client";

import { memo, useCallback } from "react";

import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import { useDeleteAnAddOnMutation } from "@/store/api/add-ons/add-ons-api";
import type {
  TAddOn,
  TDeleteAnAddOnMutation,
} from "@/store/api/add-ons/add-ons.types";
import type { TNullish } from "@/store/api/common-api-types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

interface IDeleteAddonDialogProps {
  open: boolean;
  setOpen: React.Dispatch<
    React.SetStateAction<boolean | void | null | undefined>
  >;
  data: TAddOn | TNullish;
  onDelete?: (item: TAddOn | TNullish) => void;
  setTargetAddon?: React.Dispatch<React.SetStateAction<TAddOn | null>>;
}

function DeleteAddonDialog({
  open,
  setOpen,
  data,
  onDelete,
  setTargetAddon,
}: IDeleteAddonDialogProps) {
  const { name = "Addon", slug } = data || {};
  const [deleteAnAddOn, { isLoading }] = useDeleteAnAddOnMutation();
  const toastProps = useToast();

  const handleDelete = useCallback(
    ({
      data,
      deleteAnAddOn,
      toastProps: { toast },
      onDelete,
      setTargetAddon,
      setOpen,
    }: {
      data: TAddOn | TNullish;
      deleteAnAddOn: TDeleteAnAddOnMutation;
      toastProps: TUseToastReturnType;
      onDelete?: IDeleteAddonDialogProps["onDelete"];
      setTargetAddon?: IDeleteAddonDialogProps["setTargetAddon"];
      setOpen: IDeleteAddonDialogProps["setOpen"];
    }) =>
      async () => {
        const { slug } = data || {};
        const toastId = toast({
          variant: "loading",
          title: "Deleting AddOn",
          description: "Please wait...",
        });

        try {
          if (!slug) {
            throw new Error("Slug is required to delete an AddOn.");
          }

          const response = await deleteAnAddOn({
            slug,
          }).unwrap();

          if (!response?.success) {
            throw new Error(response?.message || "Failed to delete an AddOn.");
          }
          onDelete?.(data);

          toastId.update({
            id: toastId.id,
            variant: "success",
            title: "Add-on Deleted Successfully!",
            description: getApiErrorMessage(
              undefined,
              "Congratulations! you have successfully deleted an add-on.",
            ),
          });
        } catch (error) {
          toastId.update({
            id: toastId.id,
            variant: "error",
            ...getApiErrorMessages({
              error,
              title: "Add-on Delete Failed",
              description: "Something went wrong while deleting an add-on.",
            }),
          });
        } finally {
          setTargetAddon?.(null);
          setOpen(false);
        }
      },
    [],
  );

  const handleCancel = useCallback(
    ({
      setOpen,
      setTargetAddon,
    }: {
      setOpen: IDeleteAddonDialogProps["setOpen"];
      setTargetAddon: IDeleteAddonDialogProps["setTargetAddon"];
    }) =>
      () => {
        setTargetAddon?.(null);
        setOpen?.(false);
      },
    [],
  );

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <StatusAlert
        status="destructive"
        withCloseButton
        icon={<DeleteIcon className="size-5" />}
        title={`Remove Add on  - ${name}`}
        description="Are you sure you want to delete this Add on?"
      >
        <div className="grid w-full grid-cols-2 gap-3">
          <Button
            fullWidth
            color="secondary"
            className="rounded-[8px] bg-default-50"
            size="lg"
            disabled={isLoading}
            onClick={handleCancel({ setOpen, setTargetAddon })}
          >
            Cancel
          </Button>

          <Button
            fullWidth
            color="primary"
            className="rounded-[8px]"
            size="lg"
            onClick={handleDelete({
              deleteAnAddOn,
              toastProps,
              onDelete,
              data,
              setTargetAddon,
              setOpen,
            })}
            disabled={isLoading}
          >
            <ButtonLoadingContent
              isLoading={isLoading}
              actionContent="Remove"
              loadingContent="Removing..."
            />
          </Button>
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default memo(DeleteAddonDialog);
