"use client";
import { createContext, useCallback, useContext } from "react";

import useBooleanState, {
  type TExternalState as TExternalStateFromHook,
} from "@/hooks/useBooleanState";
import { Dialog } from "@/components/ui/dialog";

export type TDialogContextType = {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
  toggle: () => void;
  setState?:
    | React.Dispatch<React.SetStateAction<boolean | void | undefined | null>>
    | ((value: boolean | void | undefined | null) => void)
    | null
    | undefined;
  handleAutoStateUpdate?: (open: boolean) => void;
  defaultOpen?: boolean;
  disableAutoClose?: boolean;
};

export type TExternalState = TExternalStateFromHook & {
  disableAutoClose?: boolean;
};

const DialogContext = createContext<TDialogContextType | undefined>(undefined);

export type TBooleanProviderProps =
  | {
      children: React.ReactNode;
      defaultOpen?: boolean;
      disableAutoClose?: boolean;
    }
  | ({
      children: React.ReactNode;
      defaultOpen?: boolean;
    } & TExternalState);

function DialogContextProvider({
  children,
  defaultOpen,
  disableAutoClose,
  ...restProps
}: TBooleanProviderProps) {
  const isExternalStateMode = "open" in restProps;
  const {
    state: isOpen,
    setValue: setIsOpen,
    setOpen,
    setClose,
    toggle,
  } = useBooleanState({
    defaultValue: !!defaultOpen,
    mode: isExternalStateMode ? "externalState" : undefined,
    externalStateValue: isExternalStateMode ? restProps?.open : undefined,
  });

  const handleAutoStateUpdate = useCallback(
    (
      props: Partial<
        TExternalState & {
          setIsOpen: (
            props: Partial<TExternalState> | void,
          ) => (value: boolean | void | undefined) => void;
          toggle: (props: Partial<TExternalState> | void) => () => void;
        }
      > | void,
    ) => {
      const { onOpenChange, disableAutoClose, setIsOpen, toggle } = props || {};

      return (open: boolean) => {
        if (disableAutoClose) {
          onOpenChange?.(open);
          if (!onOpenChange) {
            setIsOpen?.(props)?.(open);
          }
          return;
        }

        onOpenChange?.((prev) => !prev);
        if (!onOpenChange) {
          toggle?.(props)?.();
        }
      };
    },
    [],
  );

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        setOpen: setOpen(restProps),
        setClose: setClose(restProps),
        toggle: toggle(restProps),
        setState: isExternalStateMode
          ? restProps?.onOpenChange
          : setIsOpen(restProps),
        handleAutoStateUpdate: handleAutoStateUpdate({
          ...restProps,
          disableAutoClose,
        }),
        defaultOpen,
        disableAutoClose,
      }}
    >
      <Dialog
        open={isOpen}
        onOpenChange={handleAutoStateUpdate({
          ...restProps,
          disableAutoClose,
          toggle,
          setIsOpen,
        })}
        defaultOpen={defaultOpen}
      >
        {children}
      </Dialog>
    </DialogContext.Provider>
  );
}

export default DialogContextProvider;

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error(
      "useDialogContext must be used within a DialogContextProvider",
    );
  }
  return context;
};

export type TUseDialogContextReturnType = ReturnType<typeof useDialogContext>;
