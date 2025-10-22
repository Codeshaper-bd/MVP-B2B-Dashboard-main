"use client";

import { memo, useCallback } from "react";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import DeleteIcon from "@/components/icons/DeleteIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import StatusAlert, { type TStatus } from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import BgRings from "@/components/ui/BgRings";
import { Button, type ButtonProps } from "@/components/ui/button";

interface IConfirmationDialogProps {
  title: string;
  description: string;
  alertText?: string;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  onConfirmClick: () => void | Promise<void>;
  isLoading?: boolean;
  confirmText: string;
  icon?: React.ReactNode;
  statusColor?: TStatus;
  buttonSize?: ButtonProps["size"];
  primaryButtonColor?: ButtonProps["color"];
  secondaryButtonColor?: ButtonProps["color"];
}

function ConfirmationDialog({
  title,
  description,
  alertText,
  isOpen,
  setIsOpen,
  onConfirmClick,
  isLoading = false,
  confirmText,
  icon = <DeleteIcon className="size-5" />,
  statusColor = "destructive",
  buttonSize = "default",
  primaryButtonColor = "primary",
  secondaryButtonColor = "secondary",
}: IConfirmationDialogProps) {
  const handleClose = useCallback(
    ({
      setIsOpen,
      isLoading,
    }: Pick<IConfirmationDialogProps, "setIsOpen"> & {
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
        <div className="w-full space-y-8">
          {alertText && (
            <div className="flex items-center gap-4 overflow-hidden rounded-[12px] border border-[#F97066] bg-default-50 py-4 pe-4 ps-2">
              <BgRings className="transparent-with-rounded-border mx-auto flex size-8 items-center justify-center rounded-full border-[2px] border-warning border-opacity-30 bg-transparent p-6">
                <BgRings className="transparent-with-rounded-border mx-auto flex size-5 items-center justify-center rounded-full border-[2px] border-warning border-opacity-60 bg-transparent">
                  <BgRings.Content>
                    <InfoIcon className="size-5 text-warning" />
                  </BgRings.Content>
                </BgRings>
              </BgRings>
              <div>{alertText}</div>
            </div>
          )}
          <div className="grid w-full grid-cols-2 gap-3">
            <Button
              fullWidth
              size={buttonSize}
              color={secondaryButtonColor}
              disabled={isLoading}
              className="bg-default-50"
              onClick={handleClose({ setIsOpen, isLoading })}
            >
              Cancel
            </Button>

            <Button
              fullWidth
              size={buttonSize}
              color={primaryButtonColor}
              disabled={isLoading}
              onClick={onConfirmClick}
            >
              <ButtonLoadingContent
                isLoading={isLoading}
                actionContent={confirmText}
              />
            </Button>
          </div>
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default memo(ConfirmationDialog);
