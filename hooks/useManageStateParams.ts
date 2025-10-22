"use client";
import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState } from "react";

type TState = Record<string, unknown>;

interface ICallbackProps {
  searchParamsState: URLSearchParams;
  setSearchParamsState: React.Dispatch<React.SetStateAction<URLSearchParams>>;
}

const handleDeleteAParam =
  <T>({ searchParamsState, setSearchParamsState }: ICallbackProps) =>
  (
    paramName: keyof T,
    options?: NavigateOptions | null | undefined | void,
  ): void => {
    try {
      if (paramName === undefined || paramName === null || paramName === "") {
        throw new Error("ParamName is required, it is missing");
      }
      setSearchParamsState((params) => {
        const newParams = new URLSearchParams(params);
        newParams.delete(String(paramName));
        return newParams;
      });
    } catch (error) {
      console.error("Failed to delete a param by key error: ", error);
    }
  };

const handleRemoveAllParam =
  ({ searchParamsState, setSearchParamsState }: ICallbackProps) =>
  (options?: NavigateOptions | void | undefined): void => {
    try {
      setSearchParamsState((params) => {
        const newParams = new URLSearchParams(params);
        newParams.forEach((_, key) => {
          try {
            if (key === undefined || key === null || key === "") {
              throw new Error("Key is required, it is missing");
            }
            newParams.delete(key);
          } catch (error) {
            console.error(
              "Failed to remove a param of all params error: ",
              error,
            );
          }
        });
        return newParams;
      });
    } catch (error) {
      console.error("Failed to remove all params error: ", error);
    }
  };

const handleGetAParamValue =
  <T>({ searchParamsState: params }: ICallbackProps) =>
  <U extends keyof T>(key: U): Partial<T>[U] | undefined => {
    try {
      if (
        key === undefined ||
        key === null ||
        key === "" ||
        !params?.has(String(key))
      ) {
        throw new Error("Key is required, it is missing or param is not found");
      }

      const validKey = String(key);
      if (!params?.has(validKey)) {
        return undefined;
      }

      const value = params?.get(validKey);
      const parsedValue = JSON.parse(value ?? "") as Partial<T>[U];
      return parsedValue;
    } catch (error) {
      console.error("Failed to get a value by key error: ", error);
      return undefined;
    }
  };

const handleGetAllParamValue =
  <T>({
    searchParamsState: params,
    searchParamsState,
    setSearchParamsState,
  }: ICallbackProps) =>
  (): Partial<T> => {
    try {
      const paramsObject: Partial<T> = {};

      params?.forEach((value, key) => {
        if (key === undefined || key === null || key === "") {
          return;
        }

        paramsObject[key as keyof T] = handleGetAParamValue<T>({
          searchParamsState,
          setSearchParamsState,
        })(key as keyof T);
      });

      return paramsObject;
    } catch (error) {
      console.error("Failed to get all values error: ", error);
      return {};
    }
  };

const handleUpdateAParam =
  <T>({ searchParamsState, setSearchParamsState }: ICallbackProps) =>
  ({
    key,
    value,
    options,
  }: {
    key: keyof T;
    value: unknown;
    options?: NavigateOptions | void | undefined | null;
  }) => {
    try {
      if (key === undefined || key === null || key === "") {
        throw new Error("Key is required, it is missing");
      }

      if (value === undefined) {
        handleDeleteAParam<T>({ searchParamsState, setSearchParamsState })(
          key,
          options,
        );
        return;
      }

      let stringifyValue: string = "";
      try {
        stringifyValue = JSON.stringify(value);
      } catch (error) {
        console.error("Failed to stringify a value error: ", error);
        return;
      }

      setSearchParamsState((params) => {
        const newParams = new URLSearchParams(params);
        newParams.set(String(key), stringifyValue);
        return newParams;
      });
    } catch (error) {
      console.error("Failed to update a param by key error: ", error);
    }
  };

const handleUpdateMultipleParam =
  <T>({ searchParamsState, setSearchParamsState }: ICallbackProps) =>
  (
    paramsToUpdate: Partial<T>,
    options?: void | NavigateOptions | null | undefined,
  ): void => {
    setSearchParamsState((params) => {
      const newParams = new URLSearchParams(params);
      try {
        Object.entries(paramsToUpdate ?? {})?.forEach(([key, value]) => {
          try {
            if (key === undefined || key === null || key === "") {
              throw new Error("Key is required, it is missing");
            }

            if (value === undefined) {
              handleDeleteAParam<T>({
                searchParamsState,
                setSearchParamsState,
              })(key as keyof T, options);
              return;
            }

            let stringifyValue: string = "";
            try {
              stringifyValue = JSON.stringify(value);
            } catch (error) {
              console.error("Failed to stringify a value error: ", error);
              return;
            }

            newParams.set(String(key), stringifyValue);
          } catch (error) {
            console.error("Failed to manage a query param error: ", error);
          }
        });
      } catch (error) {
        console.error("Failed to manage all query params error: ", error);
      }

      return newParams;
    });
  };

const useManageStateParams = <T extends TState>() => {
  const [searchParamsState, setSearchParamsState] = useState(
    () => new URLSearchParams(""),
  );

  return {
    getAParamValue: handleGetAParamValue<T>({
      searchParamsState,
      setSearchParamsState,
    }),
    getAllParamValue: handleGetAllParamValue<T>({
      searchParamsState,
      setSearchParamsState,
    }),

    deleteAParam: handleDeleteAParam<T>({
      searchParamsState,
      setSearchParamsState,
    }),
    removeAllParam: handleRemoveAllParam({
      searchParamsState,
      setSearchParamsState,
    }),

    updateAParam: handleUpdateAParam<T>({
      searchParamsState,
      setSearchParamsState,
    }),
    updateMultipleParam: handleUpdateMultipleParam<T>({
      searchParamsState,
      setSearchParamsState,
    }),
  };
};

export default useManageStateParams;

export type TUseManageStateParamsReturnType<T extends TState> = ReturnType<
  typeof useManageStateParams<T>
>;
