import { useEffect, useRef, useState } from "react";

type TUseDebounceProps<
  T,
  TDebouncedValueFallback extends
    | {}
    | []
    | ""
    | 0
    | null
    | undefined = undefined,
  TNonDebouncedValueFallback extends {} | [] | "" | 0 | null | undefined = "",
> = {
  debouncedFunction?: (value: T | TDebouncedValueFallback) => void;
  nonDebouncedFunction?: (value: T | TDebouncedValueFallback) => void;
  delay?: number;
  value: T | TDebouncedValueFallback;
  debouncedFallbackValue: TDebouncedValueFallback;
  nonDebouncedValueFallback?: TNonDebouncedValueFallback;
  enableInitialDataDebounce?: boolean;
};

const getIsValueFalsy = <
  T,
  TDebouncedValueFallback extends
    | {}
    | []
    | ""
    | 0
    | null
    | undefined = undefined,
>(
  selectedValue: T | TDebouncedValueFallback | undefined,
): boolean => {
  try {
    return (
      selectedValue === "" ||
      selectedValue === null ||
      selectedValue === undefined ||
      JSON.stringify(selectedValue) === "{}" ||
      JSON.stringify(selectedValue) === "[]"
    );
  } catch (error) {
    return true;
  }
};

const handleDebounce =
  <T, TDebouncedValueFallback, TNonDebouncedValueFallback>({
    debouncedFunction,
    nonDebouncedFunction,
    //   valueSelector,
    setDebouncedValue,
    setNonDebouncedValue,
    timeOutId,
    delay,
    debouncedFallbackValue,
    nonDebouncedValueFallback,
  }: Pick<
    TUseDebounceProps<T, TDebouncedValueFallback, TNonDebouncedValueFallback>,
    | "debouncedFunction"
    | "nonDebouncedFunction"
    //   | "valueSelector"
    | "delay"
    | "debouncedFallbackValue"
    | "nonDebouncedValueFallback"
  > & {
    timeOutId: React.MutableRefObject<NodeJS.Timeout | null>;
    setDebouncedValue: React.Dispatch<
      React.SetStateAction<T | TDebouncedValueFallback>
    >;
    setNonDebouncedValue: React.Dispatch<
      React.SetStateAction<
        T | TDebouncedValueFallback | TNonDebouncedValueFallback
      >
    >;
  }) =>
  <TValueSelectorArgs extends Array<any>>(
    valueSelector?:
      | ((...args: TValueSelectorArgs) => T | TDebouncedValueFallback)
      | void,
  ) =>
  (...args: TValueSelectorArgs) => {
    try {
      if (timeOutId.current) {
        clearTimeout(timeOutId.current);
      }
      const selectedValue = valueSelector
        ? valueSelector?.(...args)
        : (args?.[0] as T | TDebouncedValueFallback | undefined);

      timeOutId.current = setTimeout(() => {
        if (getIsValueFalsy(selectedValue)) {
          debouncedFunction?.(debouncedFallbackValue);
          setDebouncedValue?.(debouncedFallbackValue);
          setNonDebouncedValue?.(
            nonDebouncedValueFallback as TNonDebouncedValueFallback,
          );
          return;
        }

        debouncedFunction?.(selectedValue!);
        setDebouncedValue?.(selectedValue!);
      }, delay);

      if (getIsValueFalsy(selectedValue)) {
        setNonDebouncedValue?.(
          nonDebouncedValueFallback as TNonDebouncedValueFallback,
        );
        nonDebouncedFunction?.(debouncedFallbackValue);
        return;
      }

      setNonDebouncedValue?.(selectedValue!);
      nonDebouncedFunction?.(selectedValue!);
    } catch (error) {
      console.error("Error in handleDebounce inside useDebounce hook: ", error);
    }
  };

const useDebounce = <
  T,
  TDebouncedValueFallback extends
    | {}
    | []
    | ""
    | 0
    | null
    | undefined = undefined,
  TNonDebouncedValueFallback extends {} | [] | "" | 0 | null | undefined = "",
>(
  props: TUseDebounceProps<
    T,
    TDebouncedValueFallback,
    TNonDebouncedValueFallback
  > | void,
) => {
  const {
    debouncedFunction,
    nonDebouncedFunction,
    // valueSelector,
    delay = 800,
    value,
    debouncedFallbackValue,
    nonDebouncedValueFallback,
    enableInitialDataDebounce = false,
  } = (props || {
    value: "",
    debouncedFallbackValue: undefined,
    // nonDebouncedValueFallback: "",
  }) as TUseDebounceProps<
    T,
    TDebouncedValueFallback,
    TNonDebouncedValueFallback
  >;

  const timeOutId = useRef<NodeJS.Timeout | null>(null);
  const [nonDebouncedValue, setNonDebouncedValue] = useState<
    T | TDebouncedValueFallback | TNonDebouncedValueFallback
  >(() => {
    try {
      if (getIsValueFalsy(value)) {
        return nonDebouncedValueFallback as TNonDebouncedValueFallback;
      }

      return value;
    } catch (error) {
      return value;
    }
  });
  const [debouncedValue, setDebouncedValue] = useState<
    T | TDebouncedValueFallback
  >(() => {
    if (enableInitialDataDebounce) {
      debouncedFunction?.(value);
    }
    return value;
  });

  useEffect(() => {
    const currentTimeoutId = timeOutId.current;

    return () => {
      if (currentTimeoutId) {
        clearTimeout(currentTimeoutId);
      }
    };
  }, []);

  return {
    debounce: handleDebounce<
      T,
      TDebouncedValueFallback,
      TNonDebouncedValueFallback
      // eslint-disable-next-line react-compiler/react-compiler
    >({
      debouncedFunction,
      nonDebouncedFunction,
      //   valueSelector,
      setDebouncedValue,
      setNonDebouncedValue,
      timeOutId,
      delay,
      debouncedFallbackValue,
      nonDebouncedValueFallback,
    }),
    nonDebouncedValue,
    debouncedValue,
  };
};

export default useDebounce;
