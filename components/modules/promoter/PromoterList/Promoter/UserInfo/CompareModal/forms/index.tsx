"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AsyncSelect from "react-select/async";

import {
  useGetAllPromotersQuery,
  useLazyGetAllPromotersQuery,
} from "@/store/api/promoters/promoters-api";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

import type { IAssignPromoter, THandleLoadOptions } from "./types";

function ComparePromoterForm({
  defaultPromoterId,
  onPromoterChange,
}: IAssignPromoter) {
  const [getAllPromoters] = useLazyGetAllPromotersQuery();
  const searchTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const { data: getAllPromotersRes, ...getAllPromotersApiState } =
    useGetAllPromotersQuery();
  const getAllPromotersData = getAllPromotersRes?.data;

  const defaultOptions: IOption[] = useMemo(
    () =>
      getAllPromotersData?.map(
        (promoter): IOption => ({
          value: promoter.userId ?? -1,
          label: promoter?.fullName,
        }),
      ) ?? [],
    [getAllPromotersData],
  );

  // Memoized defaultPromoterOption

  const defaultPromoterOption = useMemo<IOption | null>(() => {
    if (!defaultPromoterId || !getAllPromotersData) {
      return null;
    }

    const found = getAllPromotersData.find(
      (p) => p.userId === defaultPromoterId,
    );

    if (!found || found.userId === null || found.fullName === null) {
      return null;
    }

    return {
      value: found.userId,
      label: found.fullName,
    };
  }, [defaultPromoterId, getAllPromotersData]);

  // Local state for selected option
  const [selectedPromoterOption, setSelectedPromoterOption] =
    useState<IOption | null>(defaultPromoterOption ?? null);

  const handleLoadOptions: THandleLoadOptions = useCallback(
    ({ getAllPromoters }) =>
      async (inputValue, callback) => {
        if (searchTimeoutId.current) {
          clearTimeout(searchTimeoutId.current);
        }

        await new Promise<void>((resolve) => {
          searchTimeoutId.current = setTimeout(() => {
            resolve();
          }, 800);
        });

        try {
          const getAllPromotersRes = await getAllPromoters(
            {
              search: inputValue?.toLowerCase(),
            },
            true,
          ).unwrap();
          const getAllPromotersData = getAllPromotersRes?.data;

          return (
            getAllPromotersData?.map((promoter) => ({
              value: promoter.userId ?? -1,
              label: promoter?.fullName,
            })) ?? []
          );
        } catch (error) {
          console.error("Error fetching promoters:", error);
          return [];
        }
      },
    [],
  );

  // Clean up debounce timeout
  useEffect(
    () => () => {
      if (searchTimeoutId.current) {
        clearTimeout(searchTimeoutId.current);
      }
    },
    [],
  );

  // Update selectedPromoterOption when defaultPromoterOption is available later
  useEffect(() => {
    if (defaultPromoterOption) {
      setSelectedPromoterOption(defaultPromoterOption);
    }
  }, [defaultPromoterOption]);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={defaultOptions}
      loadOptions={handleLoadOptions({ getAllPromoters })}
      isClearable
      placeholder="Select promoter..."
      className="react-select"
      classNamePrefix="select"
      value={selectedPromoterOption as IOption | null}
      onChange={(selected) => {
        setSelectedPromoterOption(selected);
        onPromoterChange?.(selected?.value);
      }}
      isLoading={
        getAllPromotersApiState?.isLoading ||
        getAllPromotersApiState?.isFetching
      }
    />
  );
}

export default ComparePromoterForm;
