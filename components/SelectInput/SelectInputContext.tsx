"use client";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import useClickOutside from "@/hooks/use-click-outside";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import useDebounce from "@/hooks/useDebounce";

import type { TSelectInput } from ".";
import type { IOption } from "./DropDown/Option";

export type TSearch = {
  search: string | undefined;
  handleSearch: React.ChangeEventHandler<HTMLInputElement>;
};

const SelectInputContext = createContext<unknown | undefined>(undefined);

export function SelectInputProvider<T extends IOption>({
  children,
  searchMode = "local",
  onServerSearch,
  ...restProps
}: TSelectInput<T>) {
  const { isOpen, setClose } = useBooleanContext();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState<string | string>();
  const { debounce, nonDebouncedValue: search } = useDebounce<
    string,
    undefined
  >({
    value: debouncedSearch,
    delay: 700,
    debouncedFallbackValue: undefined,
    nonDebouncedValueFallback: "",
    debouncedFunction: (value) => {
      if (searchMode === "server") {
        onServerSearch?.(value);
      }
      setDebouncedSearch(value);
    },
  });

  const setSearch = debounce();
  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setSearch(e.target.value);
    },
    [setSearch],
  );

  useLockBodyScroll(isOpen);
  useClickOutside({
    ref: dropdownRef,
    callback: setClose,
  });

  type TProvider = React.Provider<TSelectInput<T> & TSearch>;
  const Provider = SelectInputContext.Provider as TProvider;

  return (
    <Provider value={{ ...restProps, search, searchMode, handleSearch }}>
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </Provider>
  );
}

export const useSelectInputContext = <T extends IOption>() => {
  const context = useContext<TSelectInput<T> & TSearch>(
    SelectInputContext as unknown as React.Context<TSelectInput<T> & TSearch>,
  );
  if (!context) {
    throw new Error(
      "useSelectInputContext must be used within a SelectInputProvider",
    );
  }
  return context;
};
