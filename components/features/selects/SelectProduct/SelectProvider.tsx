"use client";
import { createContext, useContext, useRef } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import useClickOutside from "@/hooks/use-click-outside";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

import type { TSelectInput } from "./types";

const SelectInputContext = createContext<unknown | undefined>(undefined);

export function SelectProvider<T extends IOption>({
  children,
  ...restProps
}: TSelectInput<T>) {
  const { isOpen, setClose } = useBooleanContext();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useLockBodyScroll(isOpen);
  useClickOutside({
    ref: dropdownRef,
    callback: setClose,
  });

  type TProvider = React.Provider<TSelectInput<T>>;
  const Provider = SelectInputContext.Provider as TProvider;

  return (
    <Provider value={{ ...restProps, children }}>
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </Provider>
  );
}

export const useSelectInputContext = <T extends IOption>() => {
  const context = useContext<TSelectInput<T>>(
    SelectInputContext as unknown as React.Context<TSelectInput<T>>,
  );
  if (!context) {
    throw new Error(
      "useSelectInputContext must be used within a SelectInputProvider",
    );
  }
  return context;
};
