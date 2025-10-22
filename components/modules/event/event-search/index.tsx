import { useCallback, useEffect, useMemo, useRef } from "react";
import AsyncSelect from "react-select/async";

import {
  useGetAllEventQuery,
  useLazyGetAllEventQuery,
} from "@/store/api/events/events-api";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

import type { IEventSearchProps, THandleLoadOptions } from "./types";

function EventSearch({ selectedEvent, setSelectedEvent }: IEventSearchProps) {
  // manage state
  const searchTimeoutId = useRef<NodeJS.Timeout | null>(null);

  // get api data
  const { data: getAllEventRes, ...getAllEventApiState } = useGetAllEventQuery({
    pageSize: 10,
  });
  const getAllEventData = getAllEventRes?.data;
  const [getAllEvent] = useLazyGetAllEventQuery();

  // event options
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
          const getAllEmployeeRes = await getAllEvent(
            {
              search: searchValue?.toLowerCase(),
            },
            true,
          ).unwrap();
          const getAllEventData = getAllEmployeeRes?.data;

          return (
            getAllEventData?.map((event) => ({
              value: event?.details?.id,
              label: event?.details?.name,
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

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={defaultOptions}
      loadOptions={handleLoadOptions({ getAllEvent })}
      isClearable
      value={selectedEvent ?? null}
      placeholder="Search Event..."
      className="react-select min-w-[200px]"
      classNamePrefix="select"
      onChange={(selected) => {
        setSelectedEvent(selected);
      }}
      isLoading={
        getAllEventApiState.isLoading || getAllEventApiState.isFetching
      }
      formatOptionLabel={(optionsData) => <div>{optionsData.label}</div>}
    />
  );
}

export default EventSearch;
