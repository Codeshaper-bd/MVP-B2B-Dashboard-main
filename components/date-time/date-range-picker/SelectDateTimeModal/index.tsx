"use client";

import { memo } from "react";
import type { Matcher } from "react-day-picker";

import useBooleanState, { type TExternalState } from "@/hooks/useBooleanState";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ModalContent from "./components/ModalContent";

interface ISelectDateTimeModalProps {
  onApply?: (
    date: Date,
    setClose: (props: Partial<TExternalState> | void) => () => void,
  ) => void;
  selectedDate?: Date | undefined;
  readonly?: boolean;
  disabled?: Matcher | Matcher[];
  disabledTime?: (time: string, selectedDate?: Date) => boolean;
  triggerClassName?: string;
  triggerContent?: React.ReactNode;
  defaultMonth?: Date;
  applyButtonText?: string;
  cancelButtonText?: string;
  isApplyLoading?: boolean;
  hideTodayButton?: boolean;
  endDateTime?: string;
}

function SelectDateTimeModal({
  onApply,
  disabled,
  disabledTime,
  readonly,
  selectedDate,
  defaultMonth = new Date(),
  triggerClassName,
  triggerContent = (
    <Button color="secondary" className={cn(triggerClassName)}>
      Select Date-Time
    </Button>
  ),
  applyButtonText = "Apply",
  cancelButtonText = "Cancel",
  isApplyLoading,
  hideTodayButton,
  endDateTime,
}: ISelectDateTimeModalProps) {
  const { state: isOpen, setClose, setState } = useBooleanState();

  return (
    <Dialog open={isOpen} onOpenChange={setState}>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>

      <DialogContent className="w-fit" hideInternalClose>
        <DialogHeader>
          <DialogTitle className="sr-only">
            Schedule event modal title
          </DialogTitle>

          <DialogDescription className="sr-only">
            Schedule event modal description
          </DialogDescription>
        </DialogHeader>

        {isOpen && (
          <ModalContent
            setClose={setClose}
            selectedDate={selectedDate}
            onApply={onApply}
            applyButtonText={applyButtonText}
            cancelButtonText={cancelButtonText}
            isApplyLoading={isApplyLoading}
            disabled={disabled}
            disabledTime={disabledTime}
            defaultMonth={defaultMonth}
            readonly={readonly}
            hideTodayButton={hideTodayButton}
            endDateTime={endDateTime}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default memo(SelectDateTimeModal);
