import { useMemo, useState } from "react";

export type TExternalState = {
  open: boolean;
  onOpenChange?:
    | React.Dispatch<React.SetStateAction<boolean | void | null | undefined>>
    | null
    | undefined;
  beforeExecute?: () => void;
  afterExecute?: () => void;
};

export type TUseBooleanState = {
  mode?: "externalState";
  defaultValue?: boolean;
  externalStateValue?: boolean;
} | void;

const useBooleanState = ({
  defaultValue,
  externalStateValue,
  mode,
}: TUseBooleanState = {}) => {
  const [isOpen, setIsOpen] = useState<boolean | null | undefined | void>(
    !!defaultValue,
  );

  return useMemo(
    () => ({
      state: mode === "externalState" ? !!externalStateValue : !!isOpen,
      setOpen: (props: Partial<TExternalState> | void) => {
        const { onOpenChange, beforeExecute, afterExecute } = props || {};

        return () => {
          beforeExecute?.();
          onOpenChange?.(true);
          if (!onOpenChange) {
            setIsOpen(true);
          }
          afterExecute?.();
        };
      },
      setClose: (props: Partial<TExternalState> | void) => {
        const { onOpenChange, beforeExecute, afterExecute } = props || {};

        return () => {
          beforeExecute?.();
          onOpenChange?.(false);
          if (!onOpenChange) {
            setIsOpen(false);
          }
          afterExecute?.();
        };
      },

      toggle: (props: Partial<TExternalState> | void) => {
        const { onOpenChange, beforeExecute, afterExecute } = props || {};

        return () => {
          beforeExecute?.();
          onOpenChange?.((prev) => !prev);
          if (!onOpenChange) {
            setIsOpen((prev) => !prev);
          }
          afterExecute?.();
        };
      },

      setValue:
        (props: Partial<TExternalState> | void) =>
        (value: boolean | null | void | undefined) => {
          const { onOpenChange, beforeExecute, afterExecute } = props || {};
          beforeExecute?.();
          onOpenChange?.(() => !!value);
          if (!onOpenChange) {
            setIsOpen(() => !!value);
          }
          afterExecute?.();
        },

      setState: setIsOpen,
    }),
    [mode, externalStateValue, isOpen],
  );
};

export default useBooleanState;
