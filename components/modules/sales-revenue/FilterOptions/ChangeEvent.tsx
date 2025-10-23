"use client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { memo, useCallback, useState } from "react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import { SearchIcon as SearchIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";

import { type TSelectOptionData } from "./EventSelect";

interface IChangeEventProps<T extends TSelectOptionData> {
  onChange?: (value: T) => void;
  value?: T;
  options?: T[] | null;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
  isLoading?: boolean;
}

function ChangeEvent<T extends TSelectOptionData>({
  options,
  onChange,
  value,
  onSearch,
  searchValue,
  isLoading,
}: IChangeEventProps<T>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Event Search
  const [eventSearch, setEventSearch] = useState<string | null>(null);
  const handleEventSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEventSearch(e.target.value);
      onSearch?.(e);
    },
    [onSearch],
  );

  const handleSelect = useCallback(
    ({ option, onChange }: { option?: T; onChange?: (value: T) => void }) =>
      () => {
        if (option && onChange) {
          onChange(option);
        }
        setIsDropdownOpen(false);
      },
    [],
  );

  const filteredEvents =
    options?.filter((option) => {
      const search = eventSearch?.trim()?.toLocaleLowerCase() || "";
      const label = option?.label?.trim()?.toLocaleLowerCase();
      const desc = option?.description?.trim()?.toLocaleLowerCase() || "";
      const value =
        String(option?.value || "")
          ?.trim()
          ?.toLocaleLowerCase() || "";

      return (
        label?.includes(search) ||
        desc?.includes(search) ||
        value?.includes(search)
      );
    }) ?? [];

  return (
    <div>
      <div className="p-4">
        <div className="relative">
          <SearchIcon className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-default-600" />
          <Input
            type="search"
            placeholder="Search"
            className="rounded-md ps-11 text-base placeholder:text-default-500"
            onChange={handleEventSearch}
            value={searchValue ?? ""}
          />
          {isLoading && (
            <span className="absolute end-3 top-1/2 h-5 w-5 -translate-y-1/2">
              <Loader2 className="h-5 w-5 animate-spin text-default-600" />
            </span>
          )}
        </div>
      </div>

      <div>
        <div className="custom-scrollbar max-h-[300px] pb-0.5">
          <div className="grid">
            {filteredEvents.length > 0 ? (
              filteredEvents?.map((option, index) => (
                <div
                  className={cn(
                    "flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-[#1F242F]",
                    {
                      "bg-[#2b303a] hover:bg-[#2b303a]":
                        option?.value === value?.value,
                    },
                  )}
                  onClick={handleSelect({ option, onChange })}
                  key={`event-${index}`}
                >
                  <Image
                    src={getImageFallback({
                      src: option?.image,
                      fallbackImageSize: 100,
                    })}
                    alt={option?.label ?? ""}
                    width={40}
                    height={40}
                  />

                  <div>
                    <h5 className="text-sm font-medium leading-5 text-default-900">
                      {option?.label}
                    </h5>
                    <p className="text-sm font-normal leading-5 text-default-600">
                      {convertUTCToLocal({
                        utcDateTime: option?.startTime,
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-sm text-default-600">
                No events found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ChangeEvent);
