import { cn } from "@/lib/utils";
import CrossIcon from "@/components/icons/CrossIcon";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import BgRings from "@/components/ui/BgRings";
import { Button } from "@/components/ui/button";

import Buttons from "./Buttons";

export type TMaxWidth =
  | "400px"
  | "480px"
  | "512px"
  | "600px"
  | "720px"
  | "800px";

export type TStatus =
  | "success"
  | "destructive"
  | "warning"
  | "info"
  | "alert"
  | "transparent-with-rounded-border";

export type TPosition = "left" | "center";

export type TCloseButtonProps =
  | {
      withCloseButton?: boolean;
      onClose?: () => void;
      disableInternallyClose?: boolean;
    }
  | {
      withCloseButton?: false;
    };

export type TCustomizedAlertDialogProps = {
  icon: React.ReactNode;
  status?: TStatus;
  maxWidth?: TMaxWidth;
  position?: TPosition;
  title?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
} & TCloseButtonProps;

function CustomizedAlertDialog({
  status = "warning",
  icon,
  title,
  description,
  maxWidth = "400px",
  children,
  position = "left",
  withCloseButton,
  ...restProps
}: TCustomizedAlertDialogProps) {
  let closeButtonContent: React.ReactNode = null;

  if (withCloseButton) {
    closeButtonContent = (
      <AlertDialogCancel asChild>
        <Button
          color="secondary"
          className={cn(
            "mr-[25px] border border-default-100 border-opacity-0 bg-transparent !p-4 transition-all duration-300 ease-linear hover:border hover:border-opacity-100 hover:bg-default-50 focus:border",
            {},
          )}
          type="button"
          onClick={"onClose" in restProps ? restProps?.onClose : undefined}
        >
          <CrossIcon className="size-5 bg-transparent text-[#85888E]" />
        </Button>
      </AlertDialogCancel>
    );
  }
  if (
    withCloseButton &&
    "disableInternallyClose" in restProps &&
    restProps?.disableInternallyClose
  ) {
    closeButtonContent = (
      <Button
        color="secondary"
        className="mr-[25px] border border-default-100 border-opacity-0 bg-transparent !p-4 transition-all duration-300 ease-linear hover:border hover:border-opacity-100 hover:bg-default-50 focus:border"
        type="button"
        onClick={
          "onClose" in restProps && restProps?.disableInternallyClose
            ? restProps?.onClose
            : undefined
        }
      >
        <CrossIcon className="size-5 bg-transparent text-[#85888E]" />
      </Button>
    );
  }

  return (
    <AlertDialogContent
      className={cn(!children && "pb-6", "!w-full", {
        "!max-w-[800px]": maxWidth === "800px",
        "!max-w-[720px]": maxWidth === "720px",
        "!max-w-[600px]": maxWidth === "600px",
        "!max-w-[512px]": maxWidth === "512px",
        "!max-w-[480px]": maxWidth === "480px",
        "!max-w-[400px]": maxWidth === "400px",
      })}
    >
      <div>
        <div
          className={cn(
            "bg-red-500# -ml-[23px] -mt-[23px] flex h-56 justify-between overflow-hidden rounded-xl pl-12 pt-12",
          )}
        >
          <BgRings
            className={cn(
              {
                "bg-[#D92D20] text-[#FECDCA]": status === "destructive",
                "bg-primary text-default": status === "warning",
                "bg-[#DC6803] text-[#FEDF89]": status === "alert",
                "bg-[#079455] text-[#ABEFC6]": status === "success",
                "bg-blue-500 text-white": status === "info",
                "flex size-12 items-center justify-center rounded-[10px] border border-default-100 bg-transparent text-white":
                  status === "transparent-with-rounded-border",
              },
              {
                "mx-auto": position === "center",
              },
            )}
          >
            <BgRings.Rings />

            <BgRings.Content>{icon}</BgRings.Content>
          </BgRings>

          {closeButtonContent}
        </div>

        {title && (
          <AlertDialogHeader className="relative -mt-[110px] px-[25px]">
            <div
            // className="relative -mt-[110px] pl-[25px]"
            >
              <AlertDialogTitle
                className={cn({
                  "text-center": position === "center",
                })}
              >
                {title}
              </AlertDialogTitle>

              {!!description && (
                <AlertDialogDescription>{description}</AlertDialogDescription>
              )}
            </div>
          </AlertDialogHeader>
        )}

        {!!children && (
          <AlertDialogFooter className="bg-green-500# relative p-6 px-[25px]">
            {children}
          </AlertDialogFooter>
        )}
      </div>
    </AlertDialogContent>
  );
}

CustomizedAlertDialog.Buttons = Buttons;

export default CustomizedAlertDialog;
