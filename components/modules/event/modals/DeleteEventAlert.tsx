"use client";

import { memo, useCallback } from "react";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import type { TNullish } from "@/store/api/common-api-types";
import { useDeleteAnEventMutation } from "@/store/api/events/events-api";
import type {
  TDeleteAnEventMutation,
  TEvent,
} from "@/store/api/events/events.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

interface IDeleteEventAlertProps {
  event: TEvent | TNullish;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  onDeleteSuccess?: (event: IDeleteEventAlertProps["event"]) => void;
}

function DeleteEventAlert({
  event,
  isOpen,
  setIsOpen,
  onDeleteSuccess,
}: IDeleteEventAlertProps) {
  const toastProps = useToast();
  const [deleteAnEvent, { isLoading }] = useDeleteAnEventMutation();

  const handleDelete = useCallback(
    ({
      event,
      onDeleteSuccess,
      setIsOpen,
      toastProps: { toast },
      deleteAnEvent,
    }: Pick<
      IDeleteEventAlertProps,
      "event" | "onDeleteSuccess" | "setIsOpen"
    > & {
      toastProps: TUseToastReturnType;
      deleteAnEvent: TDeleteAnEventMutation;
    }) =>
      async () => {
        const toastId = toast({
          title: "Deleting Event",
          description: "Please wait...",
          variant: "loading",
        });

        try {
          const deleteAnEventRes = await deleteAnEvent({
            slug: event?.details?.slug,
          }).unwrap();
          if (!deleteAnEventRes?.success) {
            throw new Error(
              deleteAnEventRes?.message || "Failed to delete event",
            );
          }

          toastId.update({
            id: toastId?.id,
            title: "Event Deleted",
            variant: "success",
            description: "Event has been successfully deleted",
          });

          onDeleteSuccess?.(event);
          setIsOpen?.(false);
        } catch (error) {
          console.error("Error deleting event", error);
          toastId.update({
            id: toastId?.id,
            variant: "error",
            ...getApiErrorMessages({
              error,
              title: "Failed to Delete Event",
              description: "Something went wrong while deleting the event.",
            }),
          });
        }
      },
    [],
  );

  const handleClose = useCallback(
    ({
      setIsOpen,
      isLoading,
    }: Pick<IDeleteEventAlertProps, "setIsOpen"> & { isLoading: boolean }) =>
      () => {
        if (!isLoading) {
          setIsOpen?.(false);
        }
      },
    [],
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <StatusAlert
        status="destructive"
        withCloseButton
        disableInternallyClose
        onClose={handleClose({ setIsOpen, isLoading })}
        icon={<DeleteIcon className="size-5" />}
        title={`Remove Event - ${event?.details?.name}`}
        description="Are you sure you want to delete this event? You cannot undo this action"
      >
        <div className="grid w-full grid-cols-2 gap-3">
          <Button
            fullWidth
            color="secondary"
            disabled={isLoading}
            className="bg-default-50"
            onClick={handleClose({ setIsOpen, isLoading })}
          >
            Cancel
          </Button>

          <Button
            fullWidth
            color="primary"
            disabled={isLoading}
            onClick={handleDelete({
              event,
              onDeleteSuccess,
              setIsOpen,
              toastProps,
              deleteAnEvent,
            })}
          >
            <ButtonLoadingContent
              isLoading={isLoading}
              actionContent="Remove"
            />
          </Button>
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default memo(DeleteEventAlert);
