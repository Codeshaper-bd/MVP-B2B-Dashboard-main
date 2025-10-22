import { useCallback, useEffect, useMemo, useRef } from "react";

import {
  useGetAllEmployeeQuery,
  useLazyGetAllEmployeeQuery,
} from "@/store/api/employees/employees-api";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

import type { THandleLoadOptions } from "./types";

const useSearchEmployee = () => {
  const searchTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const [getAllEmployee] = useLazyGetAllEmployeeQuery();

  const { data: getAllEmployeeRes, ...getAllEmployeeApiState } =
    useGetAllEmployeeQuery();
  const getAllEmployeeData = getAllEmployeeRes?.data;

  const defaultOptions: IOption[] = useMemo(
    () =>
      getAllEmployeeData?.map(
        (employee): IOption => ({
          value: employee?.id ?? -1,
          label: `${employee?.firstName} ${employee?.lastName}`,
        }),
      ) ?? [],
    [getAllEmployeeData],
  );

  const handleLoadOptions: THandleLoadOptions = useCallback(
    ({ getAllEmployee }) =>
      async (inputValue, callback) => {
        // debounce implementation start
        if (searchTimeoutId.current) {
          clearTimeout(searchTimeoutId.current);
        }
        let searchValue: string | undefined = undefined;
        await new Promise<void>((resolve) => {
          searchTimeoutId.current = setTimeout(() => {
            searchValue = inputValue;
            resolve();
          }, 800);
        });
        searchValue = inputValue;
        // debounce implementation end

        /* ---------------------------------------------------------------------------------------- */

        // data fetching (by debounced search) start
        try {
          const getAllEmployeeRes = await getAllEmployee(
            {
              search: searchValue?.toLowerCase(),
            },
            true,
          ).unwrap();
          const getAllEmployeeData = getAllEmployeeRes?.data;

          return (
            getAllEmployeeData?.map((employee) => ({
              value: employee?.id ?? -1,
              label: `${employee?.firstName} ${employee?.lastName}`,
            })) ?? []
          );
        } catch (error) {
          console.error("Error fetching employees:", error);
          return [];
        }
        // data fetching (by debounced search) end
      },
    [],
  );

  // debounce implementation cleanup start
  useEffect(() => {
    const currentSearchTimeoutId = searchTimeoutId.current;
    return () => {
      if (currentSearchTimeoutId) {
        clearTimeout(currentSearchTimeoutId);
      }
    };
  }, []);

  return {
    defaultOptions,
    handleLoadOptions: handleLoadOptions({ getAllEmployee }),
    getAllEmployeeApiState,
    getAllEmployeeData,
  };
};

export default useSearchEmployee;
