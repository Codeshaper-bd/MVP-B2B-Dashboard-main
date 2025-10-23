"use client";

import { memo, useCallback } from "react";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import StatusAlert, { type TStatus } from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface IDeleteConfirmationDialogProps {
  title: string;
  description: string;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  onConfirmClick: () => void;
  isLoading: boolean;
  confirmText: string;
  icon?: React.ReactNode;
  statusColor?: TStatus;
}

function ConfirmationDialog({
  title,
  description,
  isOpen,
  setIsOpen,
  onConfirmClick,
  isLoading,
  confirmText,
  icon = <DeleteIcon className="size-5" />,
  statusColor = "destructive",
}: IDeleteConfirmationDialogProps) {
  const handleClose = useCallback(
    ({
      setIsOpen,
      isLoading,
    }: Pick<IDeleteConfirmationDialogProps, "setIsOpen"> & {
      isLoading: boolean;
    }) =>
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
        status={statusColor}
        withCloseButton
        disableInternallyClose
        onClose={handleClose({ setIsOpen, isLoading })}
        icon={icon}
        title={title}
        description={description}
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
            onClick={onConfirmClick}
          >
            <ButtonLoadingContent
              isLoading={isLoading}
              actionContent={confirmText}
            />
          </Button>
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default memo(ConfirmationDialog);
