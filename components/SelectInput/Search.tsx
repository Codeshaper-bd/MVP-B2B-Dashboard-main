"use client";
import { memo, useEffect, useMemo, useRef } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import { cn } from "@/lib/utils";
import { SearchIcon as SearchIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";

import type { IOption } from "./DropDown/Option";
import { useSelectInputContext } from "./SelectInputContext";

type TSearchProps = {};

const handleStopPropagation = <T,>(e: React.MouseEvent<T>) => {
  e.stopPropagation();
};

function SearchComponent<T extends IOption>(props: TSearchProps) {
  const { isOpen } = useBooleanContext();
  const { searchLocation, search, handleSearch, value, placeholder } =
    useSelectInputContext<T>();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchRef.current && isOpen && searchLocation === "inside-trigger") {
      searchRef.current.focus();
    }
  }, [isOpen, searchLocation]);

  const searchPlaceholder: string = useMemo(() => {
    let tempSearchPlaceholder: string = "Search...";
    if (searchLocation === "inside-trigger" && isOpen) {
      if (typeof value === "string" || typeof value === "number") {
        tempSearchPlaceholder = String(value);
      }
      if (typeof value === "object" && !Array.isArray(value)) {
        tempSearchPlaceholder = String(
          typeof value?.label === "string" || typeof value?.label === "number"
            ? value?.label
            : "Search...",
        );
      }
    } else if (searchLocation === "inside-dropdown" && isOpen) {
      tempSearchPlaceholder = "Search...";
    }

    return tempSearchPlaceholder;
  }, [value, searchLocation, isOpen]);

  if (!searchLocation || searchLocation === "off" || !isOpen) {
    return null;
  }

  if (searchLocation === "inside-trigger" && isOpen) {
    return (
      <span
        className="block h-full w-full grow cursor-pointer text-white"
        onClick={handleStopPropagation}
        onPointerDown={handleStopPropagation}
        onChange={handleStopPropagation}
      >
        <input
          type="text"
          ref={searchRef}
          placeholder={searchPlaceholder}
          className={cn(
            "h-full w-full border-none bg-transparent text-white outline-none focus-within:border-none focus-within:outline-none focus:border-none focus:outline-none",
            value && searchLocation === "inside-trigger" && isOpen
              ? "placeholder:line-clamp-1 placeholder:text-white"
              : "placeholder:text-[#85888E]",
          )}
          value={search}
          onChange={handleSearch}
        />
      </span>
    );
  }

  if (searchLocation === "inside-dropdown" && isOpen) {
    return (
      <span
        onClick={handleStopPropagation}
        onPointerDown={handleStopPropagation}
        onChange={handleStopPropagation}
        onDoubleClick={handleStopPropagation}
        className="block h-fit w-full grow pb-3"
      >
        <Input
          type="text"
          size={"sm"}
          placeholder={searchPlaceholder}
          value={search}
          onChange={handleSearch}
          leftContent={
            <SearchIcon className="h-[20px] w-[20px] shrink-0 text-default-600" />
          }
        />
      </span>
    );
  }
}

const Search = memo(SearchComponent) as typeof SearchComponent;

export default Search;
