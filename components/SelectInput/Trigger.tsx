"use client";
import type { VariantProps } from "class-variance-authority";
import { forwardRef, useCallback } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import useMeasure from "@/hooks/useMeasure";
import { cn } from "@/lib/utils";
import { ChevronDownIcon as ChevronDownIcon } from "@/components/icons";
import { selectVariants } from "@/components/ui/select";

import type { IOption } from "./DropDown/Option";
import Placeholder from "./Placeholder";
import Search from "./Search";
import { useSelectInputContext } from "./SelectInputContext";
import Value from "./Value";

const handleStopPropagation = <T,>(e: React.MouseEvent<T>) => {
  e.stopPropagation();
};

type THandleClick = (props: {
  toggle: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => React.MouseEventHandler<HTMLButtonElement>;

export type TButton = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "color" | "rounded" | "size"
>;

export interface ITriggerProps
  extends VariantProps<typeof selectVariants>,
    TButton {}

function TriggerComponent<T extends IOption>(
  {
    color,
    rounded,
    size,
    className,
    type = "button",
    children,

    ...restProps
  }: ITriggerProps,
  ref?: React.ForwardedRef<HTMLButtonElement>,
) {
  const { isOpen, toggle } = useBooleanContext();
  const {
    leftContent,
    leftContentClassName,
    rightContent,
    rightContentClassName,
    searchLocation,
    enableRotateDropdownIcon,
    toggleElement: ToggleElement = ChevronDownIcon,
    toggleElementClassName,
    onBlur,
    disabled,
    readOnly,
  } = useSelectInputContext<T>();
  const { ref: leftContentRef, dimensions: leftContentDimensions } =
    useMeasure();
  const { ref: rightContentRef, dimensions: rightContentDimensions } =
    useMeasure();

  const rightFinalContent = rightContent ? (
    rightContent
  ) : (
    <ToggleElement
      className={cn(
        "size-5 shrink-0 cursor-pointer text-default-600 transition-all duration-100 ease-linear",
        toggleElementClassName,
        enableRotateDropdownIcon && isOpen ? "rotate-180" : "",
      )}
      onClick={toggle}
    />
  );

  const handleClick: THandleClick = useCallback(
    ({ toggle, onClick }) =>
      (e) => {
        onClick?.(e);
        toggle();
      },
    [],
  );

  return (
    <button
      {...restProps}
      ref={ref}
      onClick={handleClick({ toggle, onClick: restProps.onClick })}
      onBlur={!isOpen ? onBlur : undefined}
      type={type}
      className={cn(
        "relative h-full w-full cursor-pointer overflow-hidden",
        selectVariants({ color, size, rounded }),
        isOpen
          ? "border-primary ring-4 ring-primary ring-opacity-20"
          : "focus:border-default-200 focus:ring-0",
        readOnly ? "pointer-events-none bg-default-100" : "",
        className,
      )}
      disabled={disabled}
    >
      <span
        className={cn("block h-full w-full")}
        style={{
          paddingLeft: `${leftContentDimensions?.width}px`,
          paddingRight: `${rightContentDimensions?.width}px`,
        }}
      >
        {!!leftContent && (
          <span
            className={cn(
              "left-0 text-default-600",
              "absolute bottom-0 top-0 inline-flex h-full w-fit shrink-0 select-none items-center justify-center pl-4",
              leftContentClassName,
            )}
            ref={leftContentRef}
            onClick={handleStopPropagation}
            onPointerDown={handleStopPropagation}
            onDoubleClick={handleStopPropagation}
            onChange={handleStopPropagation}
          >
            {leftContent}
          </span>
        )}
        <Placeholder<T> />
        {<Value<T> />}
        {searchLocation === "inside-trigger" && isOpen && <Search<T> />}

        {!!rightFinalContent && (
          <span
            className={cn(
              "right-0 text-default-600",
              "absolute bottom-0 top-0 inline-flex h-full w-fit shrink-0 select-none items-center justify-center pr-4",
              rightContentClassName,
            )}
            ref={rightContentRef}
            onClick={handleStopPropagation}
            onPointerDown={handleStopPropagation}
            onDoubleClick={handleStopPropagation}
            onChange={handleStopPropagation}
          >
            {rightFinalContent}
          </span>
        )}
      </span>
    </button>
  );
}

const Trigger = forwardRef(TriggerComponent) as <T extends IOption>(
  props: ITriggerProps & { ref?: React.Ref<HTMLButtonElement> },
) => React.ReactElement;

export default Trigger;
