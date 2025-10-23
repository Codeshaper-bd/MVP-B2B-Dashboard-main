"use client";
import { useCallback } from "react";

import { cn } from "@/lib/utils";
import { CrossIcon as CrossIcon } from "@/components/icons";
import BgGrid from "@/components/ui/BgGrid";
import BgRings from "@/components/ui/BgRings";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Buttons from "./Buttons";
import { useDialogContext, type TDialogContextType } from "./DialogContext";

export type TMode = "ring-bg" | "grid-bg";

export type TStatus =
  | "success"
  | "destructive"
  | "warning"
  | "info"
  | "alert"
  | "transparent-with-rounded-border";

export type TPosition = "left" | "center";
export type TMaxWidth =
  | "400px"
  | "480px"
  | "512px"
  | "600px"
  | "720px"
  | "800px";

export type TCloseButtonProps =
  | {
      withCloseButton: true;
      onClose: (dialogContextValue: TDialogContextType) => void;
      disableInternallyClose: true;
    }
  | {
      withCloseButton: true;
      onClose?: (dialogContextValue: TDialogContextType) => void;
      disableInternallyClose?: false;
    }
  | {
      withCloseButton?: false;
    };

export type TCustomizedDialogProps = {
  icon: React.ReactNode;
  iconRounded?:
    | "0px"
    | "2px"
    | "4px"
    | "6px"
    | "8px"
    | "10px"
    | "12px"
    | "14px"
    | "16px"
    | "full";
  status?: TStatus;
  maxWidth?: TMaxWidth;
  mode?: TMode;
  position?: TPosition;
  title: string;
  description?: React.ReactNode;
  descriptionPosition?: "left" | "center";
  descriptionClassName?: string;
  children?: React.ReactNode;
  childrenContainerClassName?: string;
  className?: string;
} & TCloseButtonProps;

function CustomizedDialog({
  mode = "ring-bg",
  status = mode === "ring-bg" ? "warning" : "transparent-with-rounded-border",
  icon,
  iconRounded = "6px",
  title,
  maxWidth = "800px",
  description,
  children,
  position = "left",
  withCloseButton,
  descriptionPosition,
  descriptionClassName,
  childrenContainerClassName,
  className,
  ...restProps
}: TCustomizedDialogProps) {
  const handleInteractOutside = useCallback((event: Event) => {
    const target = event?.target as HTMLElement;

    // Prevent closing when clicking Google Autocomplete dropdown
    if (
      target?.classList.contains("pac-item") ||
      target?.closest(".pac-container")
    ) {
      event.preventDefault();
    }
  }, []);
  const dialogContextValue = useDialogContext();

  const handleClose = useCallback(
    ({
      onClose,
      dialogContextValue,
    }: {
      onClose?: ((dialogContextValue: TDialogContextType) => void) | undefined;
      dialogContextValue: TDialogContextType;
    }) =>
      () => {
        onClose?.(dialogContextValue);
      },
    [],
  );

  let closeButtonContent: React.ReactNode = null;
  if (withCloseButton) {
    closeButtonContent = (
      <div
        className={cn({
          "pr-6": mode === "ring-bg",
        })}
      >
        <DialogClose asChild>
          <Button
            color="secondary"
            className={cn(
              "h-auto border border-default-100 border-opacity-0 bg-transparent !p-0 text-[#85888E] transition-all duration-300 ease-linear hover:border-0 hover:border-transparent hover:border-opacity-100 hover:bg-default-50 hover:bg-transparent hover:text-primary focus:border",
              // {
              //   "mr-6": mode === "grid-bg",
              // },
            )}
            type="button"
            onClick={
              "onClose" in restProps && restProps?.disableInternallyClose
                ? handleClose({
                    dialogContextValue,
                    onClose: restProps?.onClose,
                  })
                : undefined
            }
          >
            <CrossIcon className="size-5" />
          </Button>
        </DialogClose>
      </div>
    );
  }
  if (
    withCloseButton &&
    "disableInternallyClose" in restProps &&
    restProps?.disableInternallyClose
  ) {
    closeButtonContent = (
      <div
        className={cn({
          "pr-6": mode === "grid-bg",
        })}
      >
        <Button
          color="secondary"
          className={cn(
            "border border-default-100 border-opacity-0 bg-transparent !p-4 transition-all duration-300 ease-linear hover:border hover:border-opacity-100 hover:bg-default-50 focus:border",
          )}
          type="button"
          onClick={
            "onClose" in restProps && restProps?.disableInternallyClose
              ? handleClose({ dialogContextValue, onClose: restProps?.onClose })
              : undefined
          }
        >
          <CrossIcon className="size-5 bg-transparent text-[#85888E]" />
        </Button>
      </div>
    );
  }

  if (!dialogContextValue?.isOpen) {
    return null;
  }

  return (
    // <div className="flex flex-wrap gap-3">
    <DialogContent
      hideInternalClose
      className={cn(
        "pb-6",
        "!w-full",
        {
          "!max-w-[800px]": maxWidth === "800px",
          "!max-w-[720px]": maxWidth === "720px",
          "!max-w-[600px]": maxWidth === "600px",
          "!max-w-[512px]": maxWidth === "512px",
          "!max-w-[480px]": maxWidth === "480px",
          "!max-w-[400px]": maxWidth === "400px",
        },
        className,
      )}
      onInteractOutside={handleInteractOutside}
    >
      <div>
        <div
          className={cn(
            "bg-red-500# -ml-[23px] -mt-[23px] flex h-56 justify-between overflow-hidden rounded-xl pl-12 pt-12",
            {
              // "": mode === "ring-bg",
              "-ml-0 -mt-0 px-6 pt-6": mode === "grid-bg",
            },
            {
              "ml-0 pl-0": position === "center" && mode === "ring-bg",
            },
          )}
        >
          {mode === "ring-bg" && (
            <div
              className={cn({
                "mx-auto": position === "center",
              })}
            >
              <BgRings
                className={cn({
                  "bg-[#D92D20] text-[#FECDCA]": status === "destructive",
                  "bg-primary text-default": status === "warning",
                  "bg-[#DC6803] text-[#FEDF89]": status === "alert",
                  "bg-[#079455] text-[#ABEFC6]": status === "success",
                  "bg-blue-500 text-white": status === "info",
                  "flex size-12 items-center justify-center rounded-[10px] border border-default-100 bg-transparent text-white":
                    status === "transparent-with-rounded-border",
                })}
              >
                <BgRings.Rings />

                <BgRings.Content>{icon}</BgRings.Content>
              </BgRings>
            </div>
          )}

          {mode === "grid-bg" && (
            <BgGrid
              className={cn({
                "mx-auto": position === "center",
              })}
            >
              <BgGrid.Grid />

              <BgGrid.Content
                className={cn(
                  {
                    "bg-[#D92D20] text-[#FECDCA]": status === "destructive",
                    "bg-primary text-default": status === "warning",
                    "bg-[#DC6803] text-[#FEDF89]": status === "alert",
                    "bg-[#079455] text-[#ABEFC6]": status === "success",
                    "bg-blue-500 text-white": status === "info",
                    "flex size-12 items-center justify-center rounded-[10px] border border-default-200 bg-transparent text-white":
                      status === "transparent-with-rounded-border",
                  },
                  {
                    "rounded-[0px]": iconRounded === "0px",
                    "rounded-[2px]": iconRounded === "2px",
                    "rounded-[4px]": iconRounded === "4px",
                    "rounded-[6px]": iconRounded === "6px",
                    "rounded-[8px]": iconRounded === "8px",
                    "rounded-[10px]": iconRounded === "10px",
                    "rounded-[12px]": iconRounded === "12px",
                    "rounded-[14px]": iconRounded === "14px",
                    "rounded-[16px]": iconRounded === "16px",
                    "rounded-full": iconRounded === "full",
                  },
                )}
              >
                {icon}
              </BgGrid.Content>
            </BgGrid>
          )}

          <div className="relative">
            <div className="absolute right-0 top-0">{closeButtonContent}</div>
          </div>
        </div>

        {title ? (
          <DialogHeader
            className={cn("px-6", {
              "-mt-[110px]": mode === "ring-bg",
              "-mt-[135px]": mode === "grid-bg",
            })}
          >
            <DialogTitle
              className={cn("capitalize", {
                "text-center": position === "center",
              })}
            >
              {title}
            </DialogTitle>
          </DialogHeader>
        ) : (
          <DialogHeader className="sr-only">
            <DialogTitle className="sr-only">Modal Header</DialogTitle>
            <DialogDescription className="sr-only">
              Modal description
            </DialogDescription>
          </DialogHeader>
        )}

        {description ? (
          <DialogDescription
            className={cn(
              "px-6",
              {
                "px-[25px]": mode === "ring-bg",
                "pt-5# px-6 pb-5": mode === "grid-bg",
              },
              {
                "text-center": descriptionPosition === "center",
              },
              descriptionClassName,
            )}
          >
            {description}
          </DialogDescription>
        ) : (
          <DialogDescription className="sr-only">
            Modal description
          </DialogDescription>
        )}

        <DialogFooter className={cn("px-6", childrenContainerClassName)}>
          {children}
        </DialogFooter>
      </div>
    </DialogContent>
    // </div>
  );
}

CustomizedDialog.Buttons = Buttons;

export default CustomizedDialog;
