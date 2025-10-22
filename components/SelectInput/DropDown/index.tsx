"use client";
import { forwardRef, useMemo } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import { cn } from "@/lib/utils";

import Search from "../Search";
import { useSelectInputContext } from "../SelectInputContext";
import Option, { type IOption } from "./Option";

interface IDropDownProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  // topContent?: React.ReactNode;
  // bottomContent?: React.ReactNode;
  // searchLocation?: "off" | "inside-trigger" | "inside-dropdown";
  // isLoading?: boolean;
  // loadingContent?: React.ReactNode;
}

function DropDownComponent<T extends IOption>(
  {
    children,
    className,
    // searchLocation = "off",
    // topContent,
    // bottomContent = (
    //   <DialogContextProvider>
    //     <AddVenueDialog />
    //   </DialogContextProvider>
    // ),
    // isLoading,
    // loadingContent,
    ...restProps
  }: IDropDownProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    dropDownTopContent,
    dropDownBottomContent,
    isLoading,
    loadingContent,
    searchLocation,
    options,
    value,
    search,
    searchMode,
  } = useSelectInputContext<T>();
  const { isOpen } = useBooleanContext();
  const isTopContentAvailable = !!dropDownTopContent;
  const isBottomContentAvailable = !!dropDownBottomContent;

  const filteredOptions = useMemo(() => {
    if (!options || !Array.isArray(options)) {
      return [];
    }
    if (!search || searchMode === "server") {
      return options ?? [];
    }
    const searchLowerCase = String(search).toLowerCase();

    return (
      options?.filter((option) => {
        try {
          const optionString = JSON.stringify(option ?? "").toLowerCase();

          return optionString?.includes(searchLowerCase);
        } catch (error) {
          return true;
        }
      }) ?? []
    );
  }, [options, search, searchMode]);

  return (
    <div
      {...restProps}
      ref={ref}
      aria-expanded={isOpen}
      className={cn(
        "absolute left-0 right-0 top-[calc(100%_+_16px)] z-50 hidden h-fit w-full overflow-hidden rounded-[10px] border border-default-100 bg-default p-3 shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] aria-expanded:block",
        className,
      )}
    >
      {searchLocation === "inside-dropdown" && !isLoading && <Search />}
      {isTopContentAvailable && dropDownTopContent}

      {isLoading ? (
        <div className="flex h-32 w-full items-center justify-center">
          {loadingContent || "Loading..."}
        </div>
      ) : (
        <div
          className={cn(
            "custom-scrollbar h-fit max-h-64 w-full overflow-y-auto overflow-x-hidden",
            {
              "mt-3":
                searchLocation === "inside-dropdown" || isTopContentAvailable,
              "mb-3": isBottomContentAvailable,
            },
          )}
        >
          {filteredOptions.map((option, index) => (
            <Option
              key={index}
              option={option}
              isSelected={
                // JSON.stringify(option?.) === JSON.stringify(value) ||
                String(option?.value).toLowerCase() ===
                String(value).toLowerCase()
              }
            />
          ))}
        </div>
      )}

      {isBottomContentAvailable && dropDownBottomContent}
    </div>
  );
}

const DropDown = forwardRef(DropDownComponent) as <T extends IOption>(
  props: IDropDownProps & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

export default DropDown;
