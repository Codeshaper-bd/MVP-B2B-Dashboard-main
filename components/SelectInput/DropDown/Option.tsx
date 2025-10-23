"use client";
import React, { useCallback } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import useMeasure from "@/hooks/useMeasure";
import { cn } from "@/lib/utils";
import { CheckIcon as CheckIcon } from "@/components/icons";

import { useSelectInputContext } from "../SelectInputContext";

type TProcessEvent = <T, CB extends Function | undefined | void | null>(props: {
  data: T;
  callBack?: CB;
  extraCallBack?: (value: T | undefined) => void;
}) => <E>(event: React.MouseEvent<E>) => void;

const processEvent: TProcessEvent =
  ({ data, callBack, extraCallBack }) =>
  (event) => {
    event?.stopPropagation();
    callBack?.(event, data);
    extraCallBack?.(data);
  };

export interface IOption<T = unknown> {
  label?: React.ReactNode;
  value?: string | number;
  data?: T;
  rightContent?: React.ReactNode;
  leftContent?: React.ReactNode;
  leftLegend?: React.ReactNode;
  rightLegend?: React.ReactNode;
  disabled?: boolean;
}

export interface IOptionProps<T extends IOption = IOption>
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "value" | "onClick" | "onChange" | "onPointerDown" | "onDoubleClick"
  > {
  option: T;
  isSelected?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: T) => void;
  onChange?: (event: React.ChangeEvent<HTMLDivElement>, data: T) => void;
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>, data: T) => void;
  onDoubleClick?: (event: React.MouseEvent<HTMLDivElement>, data: T) => void;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

function OptionComponent<T extends IOption>(
  {
    option,
    isSelected,
    children = option?.label,
    className,
    disabled,
    ...restProps
  }: IOptionProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { setClose } = useBooleanContext();
  const {
    enableOptionRightIcon,
    optionRightIconColor,
    optionClassName,
    onChange,
  } = useSelectInputContext<T>();
  const { ref: leftContentRef, dimensions: leftContentDimensions } =
    useMeasure();
  const { ref: rightContentRef, dimensions: rightContentDimensions } =
    useMeasure();

  const handleClick = useCallback(
    ({
      setClose,
      onChange,
    }: {
      setClose: () => void;
      onChange?: (value: T | undefined) => void;
    }) =>
      (value: T | undefined) => {
        onChange?.(value);
        setClose();
      },
    [],
  );

  return (
    <div
      {...restProps}
      ref={ref}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-md px-2.5 py-2.5 text-base text-default-900 outline-none hover:bg-default-100 focus:bg-default-100 data-[disabled]:pointer-events-none data-[state=checked]:bg-default-100 data-[disabled]:opacity-50",
        {
          "bg-default-100": isSelected,
          "opacity-50": disabled,
        },
        optionClassName,
        className,
        {
          "pointer-events-none opacity-50": disabled,
        },
      )}
      aria-disabled={!!restProps?.["aria-disabled"] || disabled}
      onClick={processEvent({
        data: option,
        callBack: restProps?.onClick,
        extraCallBack: handleClick({ setClose, onChange }),
      })}
      onChange={processEvent({
        data: option,
        callBack: restProps?.onChange,
      })}
      onPointerDown={processEvent({
        data: option,
        callBack: restProps?.onPointerDown,
      })}
      onDoubleClick={processEvent({
        data: option,
        callBack: restProps?.onDoubleClick,
      })}
      aria-checked={isSelected}
    >
      {!!option?.leftContent && (
        <span
          className={cn(
            "left-0 text-default-600",
            "absolute bottom-0 top-0 inline-flex h-full w-fit shrink-0 select-none items-center justify-center pl-4",
          )}
          ref={leftContentRef}
        >
          {option?.leftContent}
        </span>
      )}

      <span
        className="flex h-full w-full items-center justify-between text-inherit"
        style={{
          paddingLeft: option?.leftContent
            ? `${leftContentDimensions?.width}px`
            : undefined,
          paddingRight:
            (enableOptionRightIcon && isSelected) || option?.rightContent
              ? `${rightContentDimensions?.width}px`
              : undefined,
        }}
      >
        {!!option?.leftLegend && (
          <span className="text-base font-normal text-[#94969C]">
            {option.leftLegend}
          </span>
        )}
        <span className="text-wrap break-words text-inherit">
          {option?.label}
        </span>
        {!!option?.rightLegend && (
          <span className="text-base font-normal text-[#94969C]">
            {option.rightLegend}
          </span>
        )}
      </span>

      {((enableOptionRightIcon && isSelected) || option?.rightContent) && (
        <span
          className={cn(
            "right-0 text-default-600",
            "absolute bottom-0 top-0 inline-flex h-full w-fit shrink-0 select-none items-center justify-center pr-4",
          )}
          ref={rightContentRef}
        >
          {option?.rightContent}

          {enableOptionRightIcon && isSelected && (
            <CheckIcon
              className={cn("h-full w-3.5 shrink-0 text-primary", {
                "text-primary": optionRightIconColor === "primary",
                "text-success": optionRightIconColor === "success",
              })}
            />
          )}
        </span>
      )}
    </div>
  );
}

const Option = React.forwardRef(OptionComponent) as <T extends IOption>(
  props: IOptionProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

export default Option;
