"use client";

import Image from "next/image";
import { memo, useRef } from "react";

import useClickOutside from "@/hooks/use-click-outside";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import useBooleanState from "@/hooks/useBooleanState";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import ChangeEvent from "@/components/modules/sales-revenue/FilterOptions/ChangeEvent";
import type { TSelectOptionData } from "@/components/modules/sales-revenue/FilterOptions/EventSelect";
import { Button } from "@/components/ui/button";

interface ISelectEventProps {
  selectedEvent?: TSelectOptionData | null;
  onSelectedEvent?: (event?: TSelectOptionData | null) => void;
  options?: TSelectOptionData[] | null;
  isLoading?: boolean;
  searchValue?: string | undefined;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SelectEvent({
  options,
  selectedEvent,
  onSelectedEvent,
  isLoading,
  searchValue,
  onSearch,
}: ISelectEventProps) {
  const { state: open, setClose, toggle } = useBooleanState();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useLockBodyScroll(open);
  useClickOutside({
    ref: dropdownRef,
    callback: setClose(),
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e);
  };

  return (
    <div className="relative bg-secondary" ref={dropdownRef}>
      <Button
        color="secondary"
        fullWidth
        className="h-fit justify-between bg-card px-4 py-3 text-start shadow-none hover:bg-transparent"
        onClick={toggle()}
      >
        <div className="flex items-center gap-3">
          <div className="flex-none">
            <Image
              src={getImageFallback({ src: selectedEvent?.image })}
              alt={selectedEvent?.label || "Select Event"}
              width={48}
              height={48}
              className="rounded-md"
            />
          </div>
          <div className="flex-1">
            <h2 className="mb-1.5 text-base font-medium leading-6 text-default-900">
              {selectedEvent?.label || "Select Event"}
            </h2>

            <p className="text-sm font-normal leading-5 text-default-900">
              {convertUTCToLocal({
                utcDateTime: selectedEvent?.startTime,
                format: "DD MMM YYYY",
              })}
            </p>
          </div>
        </div>

        <ChevronDownIcon
          className={cn(
            "h-4 w-4 text-default-700 transition-all duration-100",
            {
              "rotate-180": open,
            },
          )}
        />
      </Button>

      <div
        className={cn(
          "absolute top-full z-50 hidden w-full bg-secondary pb-1",
          {
            block: open,
          },
        )}
      >
        <div className="mt-1"></div>

        <ChangeEvent
          options={options}
          value={selectedEvent ?? undefined}
          onChange={(value) => {
            onSelectedEvent?.(value);
            setClose()();
          }}
          isLoading={isLoading}
          searchValue={searchValue}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
}

export default memo(SelectEvent);
