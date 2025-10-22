"use client";
import { createContext, memo, useCallback, useContext } from "react";

import useBooleanState, {
  type TExternalState,
  type TUseBooleanState,
} from "@/hooks/useBooleanState";
import { AlertDialog } from "@/components/ui/alert-dialog";

export type TAlertDialogContextType = {
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

const AlertDialogContext = createContext<TAlertDialogContextType | undefined>(
  undefined,
);

export type TCommonProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
  disableAutoClose?: boolean;
};

export type TInternalStateProps = {
  mode?: "internalState";
} & TCommonProps;

export type TExternalStateProps = ({
  mode: "externalState";
} & TExternalState) &
  TCommonProps;

export type TBooleanProviderProps = TInternalStateProps | TExternalStateProps;

function AlertDialogContextProvider(props: TBooleanProviderProps) {
  const { children, defaultOpen, disableAutoClose, mode } = props;

  let useBooleanStateInitialValue: TUseBooleanState = undefined;
  switch (mode) {
    case "internalState":
      {
        useBooleanStateInitialValue = {
          mode: undefined,
          defaultValue: !!defaultOpen,
        };
      }
      break;
    case "externalState":
      {
        useBooleanStateInitialValue = {
          mode: "externalState",
          externalStateValue: props?.open,
          defaultValue: !!defaultOpen,
        };
      }
      break;
    default:
      useBooleanStateInitialValue = undefined;
  }

  const {
    state: isOpen,
    setValue: setIsOpen,
    setOpen,
    setClose,
    toggle,
  } = useBooleanState(useBooleanStateInitialValue);

  const handleAutoStateUpdate = useCallback(
    (
      props:
        | (TBooleanProviderProps & {
            setIsOpen: (
              props: Partial<TExternalState> | void,
            ) => (value: boolean | void | undefined) => void;
            toggle: (props: Partial<TExternalState> | void) => () => void;
          })
        | void,
    ) => {
      const { disableAutoClose, setIsOpen, toggle } = props || {};

      switch (props?.mode) {
        case "externalState": {
          const { onOpenChange } = props;
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
        }

        case "internalState": {
          return (open: boolean) => {
            if (disableAutoClose) {
              setIsOpen?.()?.(open);
              return;
            }

            toggle?.()?.();
          };
        }

        default:
          break;
      }
    },
    [],
  );

  return (
    <AlertDialogContext.Provider
      value={{
        isOpen,
        setOpen:
          props?.mode === "externalState"
            ? setOpen({
                open: props?.open,
                onOpenChange: props?.onOpenChange,
              })
            : setOpen(),
        setClose:
          props?.mode === "externalState"
            ? setClose({
                open: props?.open,
                onOpenChange: props?.onOpenChange,
              })
            : setClose(),
        toggle:
          props?.mode === "externalState"
            ? toggle({
                open: props?.open,
                onOpenChange: props?.onOpenChange,
              })
            : toggle(),
        defaultOpen,
        disableAutoClose,
        handleAutoStateUpdate:
          props?.mode === "externalState"
            ? handleAutoStateUpdate({ ...props, toggle, setIsOpen })
            : handleAutoStateUpdate(),
        setState:
          props?.mode === "externalState" ? props?.onOpenChange : setIsOpen(),
      }}
    >
      <AlertDialog
        open={isOpen}
        onOpenChange={handleAutoStateUpdate({
          ...props,
          toggle,
          setIsOpen,
        })}
        defaultOpen={defaultOpen}
      >
        {children}
      </AlertDialog>
    </AlertDialogContext.Provider>
  );
}

export default memo(AlertDialogContextProvider);

export const useAlertDialogContext = () => {
  const context = useContext(AlertDialogContext);
  if (context === undefined) {
    throw new Error(
      "useAlertDialogContext must be used within a AlertDialogContextProvider",
    );
  }
  return context;
};

export type TUseAlertDialogContextReturnType = ReturnType<
  typeof useAlertDialogContext
>;
