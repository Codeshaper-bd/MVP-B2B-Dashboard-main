"use client";
import { createContext, memo, useContext, useMemo } from "react";

import useBooleanState from "@/hooks/useBooleanState";

export type TBooleanContextType = {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
  toggle: () => void;
  setState: (value?: boolean | null | undefined | void) => void;
};

export type TExternalState = {
  open: boolean | null | undefined;
  onOpenChange:
    | React.Dispatch<React.SetStateAction<boolean | null | undefined | void>>
    | null
    | undefined;
};

const BooleanContext = createContext<TBooleanContextType | undefined>(
  undefined,
);

export type TBooleanContextChildren =
  | React.ReactNode
  | ((context: TBooleanContextType) => React.ReactNode);

export type TMode = "internalState" | "externalState";

export interface TCommonProps {
  children: TBooleanContextChildren;
}

export interface TInternalStateOperation extends TCommonProps {
  mode?: "internalState"; // default mode
  defaultOpen?: boolean | null | undefined;
}

export interface TExternalStateOperation extends TCommonProps, TExternalState {
  mode: "externalState";
}

export type TBooleanProviderProps =
  | TInternalStateOperation
  | TExternalStateOperation;

function BooleanContextProvider(props: TBooleanProviderProps) {
  const { children } = props;
  // const isExternalStateMode = "open" in externalState;
  const {
    state: isOpen,
    setValue: setIsOpen,
    setOpen,
    setClose,
    toggle,
  } = useBooleanState({
    defaultValue:
      props?.mode !== "externalState" ? !!props?.defaultOpen : undefined,
    mode: props?.mode === "externalState" ? "externalState" : undefined,
    externalStateValue:
      props?.mode === "externalState" ? !!props?.open : undefined,
  });
  const externalState = useMemo(
    () =>
      props?.mode === "externalState"
        ? {
            open: !!props?.open,
            onOpenChange: props?.onOpenChange,
          }
        : {},
    [props],
  );

  const contextValue: TBooleanContextType = {
    isOpen: !!isOpen,
    setOpen: setOpen(externalState),
    setClose: setClose(externalState),
    toggle: toggle(externalState),
    setState: setIsOpen(externalState),
  };

  return (
    <BooleanContext.Provider value={contextValue}>
      {typeof children === "function" ? children?.(contextValue) : children}
    </BooleanContext.Provider>
  );
}

export default memo(BooleanContextProvider);

export const useBooleanContext = () => {
  const context = useContext(BooleanContext);
  if (context === undefined) {
    throw new Error(
      "useBooleanContext must be used within a BooleanContextProvider",
    );
  }
  return context;
};
