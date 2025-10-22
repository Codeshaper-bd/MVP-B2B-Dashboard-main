import React, { memo } from "react";

import { cn } from "@/lib/utils";
import type { TStatus } from "@/store/api/challenges/challenges.types";
import type { TNullish } from "@/store/api/common-api-types";
import DeleteIcon from "@/components/icons/DeleteIcon";
import DocumentIcon from "@/components/icons/DocumentIcon";
import EditPenIcon from "@/components/icons/EditPenIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import QrCodeIcon from "@/components/icons/QrCodeIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TooltipComponent } from "@/components/ui/tooltip";

import InfoRows from "./InfoRows";
import type { TInfoProps } from "./InfoRows/Info";

export interface IItemCardProps {
  id: string | number | null | undefined;
  slug: string | TNullish;
  title: string | number | null | undefined;
  isPrivate?: boolean | null | undefined;
  qrCode?: string | null | undefined;
  infoRows: TInfoProps[] | null | undefined;
  leftButtonContent?: React.ReactNode;
  onLeftButtonClick?: THandleButtonClick;
  onEditClick?: THandleButtonClick;
  onDescriptionClick?: THandleButtonClick;
  onViewEventsClick?: THandleButtonClick;
  onViewQrClick?: THandleButtonClick;
  onDeleteClick?: THandleButtonClick;
  onSwitchChange?: (checked: boolean, data: TCallbackData) => void;
  switchedOn?: boolean;
  isSwitchChangeLoading?: boolean;
  isOnDeleteLoading?: boolean;
  error?: boolean;
  errorMessage?: string;
  status?: TStatus;
  isFromPromotion?: boolean;
}

export type TCallbackData = Omit<
  IItemCardProps,
  | "onLeftButtonClick"
  | "onDeleteClick"
  | "onEditClick"
  | "onSwitchChange"
  | "onDescriptionClick"
  | "onViewEventsClick"
  | "onViewQrClick"
>;
export type THandleButtonClick = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: TCallbackData,
) => void;

export type TButtonEventListeners = Pick<
  IItemCardProps,
  | "onDeleteClick"
  | "onEditClick"
  | "onLeftButtonClick"
  | "onDescriptionClick"
  | "onViewEventsClick"
  | "onViewQrClick"
>;

export type TProcessButtonClick = (
  props: {
    data: TCallbackData;
    type: keyof TButtonEventListeners;
  } & TButtonEventListeners,
) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

const processButtonClick: TProcessButtonClick =
  ({
    data,
    type,
    onDeleteClick,
    onEditClick,
    onLeftButtonClick,
    onDescriptionClick,
    onViewEventsClick,
    onViewQrClick,
  }) =>
  (e) => {
    switch (type) {
      case "onDeleteClick":
        onDeleteClick?.(e, data);
        return;
      case "onEditClick":
        onEditClick?.(e, data);
        return;
      case "onDescriptionClick":
        onDescriptionClick?.(e, data);
        return;
      case "onViewEventsClick":
        onViewEventsClick?.(e, data);
        return;
      case "onViewQrClick":
        onViewQrClick?.(e, data);
        return;
      case "onLeftButtonClick":
        onLeftButtonClick?.(e, data);
        break;

      default:
        break;
    }
  };

export type TSwitchEventListener = Pick<IItemCardProps, "onSwitchChange">;

type TProcessSwitchChange = (
  props: {
    data: TCallbackData;
  } & TSwitchEventListener,
) => (checked: boolean) => void;

const processSwitchChange: TProcessSwitchChange =
  ({ data, onSwitchChange }) =>
  (checked) => {
    onSwitchChange?.(checked, data);
  };

function ItemCard({
  onLeftButtonClick,
  onEditClick,
  onDescriptionClick,
  onDeleteClick,
  onSwitchChange,
  onViewEventsClick,
  onViewQrClick,
  isFromPromotion = false,
  ...componentData
}: IItemCardProps) {
  const {
    id,
    title,
    isPrivate,
    infoRows,
    leftButtonContent,
    isOnDeleteLoading,
    switchedOn,
    isSwitchChangeLoading,
    error,
    errorMessage,
    status,
  } = componentData;

  // console.log("componentData", componentData);

  return (
    <div
      className={cn(
        "space-y-3 rounded-xl border border-solid border-default-100 bg-default p-4 pt-5",
        {
          "border-[#F97066]": !!error,
        },
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex w-full items-center gap-2">
          <h3 className="text-xl font-semibold leading-[30px] text-default-900">
            {title}
          </h3>

          {!!error && (
            <TooltipComponent content={errorMessage}>
              <InfoIcon className="h-full w-[17px] shrink-0 cursor-pointer text-[#F97066]" />
            </TooltipComponent>
          )}
        </div>

        {isFromPromotion && (
          <Badge
            className={
              isPrivate
                ? "border-[#1849A9] bg-[#102A56] text-[#84CAFF]"
                : "mulberryRose"
            }
          >
            {isPrivate ? "Private" : "Public"}
          </Badge>
        )}

        <Switch
          color={"success"}
          checked={switchedOn}
          onCheckedChange={processSwitchChange({
            data: componentData,
            onSwitchChange,
          })}
          disabled={isSwitchChangeLoading}
          size={"w-11_h-6"}
        />
      </div>

      <div className="my-3 h-0 w-full border-b border-b-default-100" />

      <InfoRows data={infoRows} />

      <div className="flex flex-wrap-reverse items-center gap-2 sm:justify-between">
        <Button
          color="secondary"
          className="h-fit min-h-12 gap-2.5 sm:flex-grow md:text-base"
          type="button"
          onClick={processButtonClick({
            data: componentData,
            type: "onDescriptionClick",
            onDeleteClick,
            onEditClick,
            onLeftButtonClick,
            onDescriptionClick,
            // onSwitchChange,
          })}
        >
          {leftButtonContent || (
            <>
              <DocumentIcon className="h-full w-[17px] shrink-0 text-default-1000" />
              <span className="hidden sm:block"> View Description</span>
            </>
          )}
        </Button>

        <div className="flex items-center gap-2 sm:mx-auto">
          <Button
            color="secondary"
            className="gap-2.5"
            type="button"
            size="48"
            onClick={processButtonClick({
              data: componentData,
              type: "onEditClick",
              onDeleteClick,
              onEditClick,
              onLeftButtonClick,
              // onSwitchChange,
            })}
          >
            <EditPenIcon className="h-full w-[17px] shrink-0 text-default-1000" />
          </Button>

          <Button
            color="secondary"
            className="gap-2.5"
            type="button"
            size="48"
            onClick={processButtonClick({
              data: componentData,
              type: "onDeleteClick",
              onDeleteClick,
              onEditClick,
              onLeftButtonClick,
              // onSwitchChange,
            })}
            disabled={isOnDeleteLoading}
          >
            <DeleteIcon className="h-full w-[17px] shrink-0 text-default-1000" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 pt-1">
        <Button
          type="button"
          variant={isFromPromotion ? "default" : "ghost"}
          className={`${isFromPromotion ? "w-[62%]" : "w-full border-none !py-0 text-base hover:bg-transparent hover:text-primary"} text-primary`}
          // className="text-center text-base font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-50"
          onClick={processButtonClick({
            data: componentData,
            type: "onViewEventsClick",
            onViewEventsClick,
          })}
          disabled={status === "Expired"}
        >
          View Active Events
        </Button>

        {isFromPromotion && (
          <Button
            type="button"
            className="flex w-[38%] items-center"
            onClick={processButtonClick({
              data: componentData,
              type: "onViewQrClick",
              onViewQrClick,
            })}
          >
            <span className="me-1 flex size-5 flex-shrink-0 items-center justify-center">
              <QrCodeIcon className="size-5" />
            </span>
            <span>Display QR</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export default memo(ItemCard);
