"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";
import AsyncSelect from "react-select/async";

import { contentPerPageOptions } from "@/config/client-config";
import {
  useGetAllEventQuery,
  useLazyGetAllEventQuery,
} from "@/store/api/events/events-api";
import type { TEvent } from "@/store/api/events/events.types";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

import type { THandleLoadOptions } from "./utils";
import type { ICreatePromoterFormValues } from "../types";

function AssignEventSelect() {
  const searchTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ICreatePromoterFormValues>();

  // get api data
  const { data: getAllEventRes, ...getAllEventApiState } = useGetAllEventQuery({
    pageSize: contentPerPageOptions[10],
    type: "upcoming",
    status: "Published",
  });
  const getAllEventData = getAllEventRes?.data;
  const [getAllEvent] = useLazyGetAllEventQuery();

  // events option
  const defaultOptions: IOption[] = useMemo(
    () =>
      getAllEventData?.map(
        (event): IOption => ({
          value: event?.details?.id,
          label: event?.details?.name,
        }),
      ) ?? [],
    [getAllEventData],
  );

  const handleLoadOptions: THandleLoadOptions = useCallback(
    ({ getAllEvent }) =>
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
          const getAllEventRes = await getAllEvent(
            {
              search: searchValue?.toLowerCase(),
              pageSize: contentPerPageOptions[10],
              type: "upcoming",
              status: "Published",
            },
            true,
          ).unwrap();
          const getAllEventData = getAllEventRes?.data;

          return (
            getAllEventData?.map((event: TEvent) => ({
              value: event?.details?.id,
              label: event?.details?.name,
            })) ?? []
          );
        } catch (error) {
          console.error("Error fetching events:", error);
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
  return (
    <LabelErrorWrapper
      label="Assign Event"
      error={errors?.selectedEvent?.message}
    >
      <AsyncSelect
        cacheOptions
        defaultOptions={defaultOptions}
        loadOptions={handleLoadOptions({ getAllEvent })}
        isClearable
        value={watch("selectedEvent") ?? null}
        placeholder="Search event..."
        className="react-select min-w-[200px]"
        classNamePrefix="select"
        onChange={(selected) => {
          setValue(
            "selectedEvent",
            Array.isArray(selected) ? [...selected] : [],
          );
        }}
        isLoading={
          getAllEventApiState.isLoading || getAllEventApiState.isFetching
        }
        isMulti
      />
    </LabelErrorWrapper>
  );
}

export default AssignEventSelect;
