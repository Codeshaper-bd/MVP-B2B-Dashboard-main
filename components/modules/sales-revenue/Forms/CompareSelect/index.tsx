"use client";

import { useState } from "react";

import { useGetAllEventQuery } from "@/store/api/events/events-api";
import type { TEvent } from "@/store/api/events/events.types";
import type { TSelectOptionData } from "@/components/modules/sales-revenue/FilterOptions/EventSelect";
import { useSalesRevenueFilterContext } from "@/components/modules/sales-revenue/SalesRevenueFilterContext";

import SelectEvent from "./select-event";

type TEventCategory = "eventOne" | "eventTwo";
type THandleEventProps = {
  value: TSelectOptionData | null | undefined;
  type: TEventCategory;
};
interface IEventError {
  type?: TEventCategory;
  message?: string;
}
function CompareSelect() {
  // error state
  const [error, setError] = useState<IEventError>({});
  const { values } = useSalesRevenueFilterContext();
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [searchValueTwo, setSearchValueTwo] = useState<string | undefined>(
    undefined,
  );
  // get api data
  const { data: getAllEventRes1, ...getAllEventApiState1 } =
    useGetAllEventQuery({
      type: "past",
      status: "Completed",
      search: searchValue,
    });

  const { data: getAllEventRes2, ...getAllEventApiState2 } =
    useGetAllEventQuery({
      type: "past",
      status: "Completed",
      search: searchValueTwo,
    });

  const getAllEventData1 = getAllEventRes1?.data || [];
  const getAllEventData2 = getAllEventRes2?.data || [];
  // Handle event selection
  const handleSelect = ({ value, type }: THandleEventProps) => {
    if (
      (type === "eventOne" &&
        value?.value === values?.compareEvents?.value?.eventTwo?.value) ||
      (type === "eventTwo" &&
        value?.value === values?.compareEvents?.value?.eventOne?.value)
    ) {
      setError({
        type,
        message: "Event  must be different from the other event",
      });
      return;
    }
    setError({});
    values?.compareEvents?.set((prev) => ({
      ...(prev ?? {}),
      [type]: value ?? undefined,
    }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValueTwo(e.target.value);
  };
  const getFilteredOptions = (
    eventData: TEvent[],
    excludeEventValue: TSelectOptionData | undefined,
  ) =>
    eventData
      ?.filter(
        ({ details }) =>
          !excludeEventValue || details?.id !== excludeEventValue?.value,
      )
      ?.map(({ details }) => ({
        label: details?.name,
        value: details?.id,
        description: details?.description ?? "",
        image:
          details?.media?.find((item) => item?.isFeatured)?.url ?? undefined,
        startTime: details?.startTime ?? "",
      }));
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div>
          <SelectEvent
            options={getFilteredOptions(
              getAllEventData1,
              values?.compareEvents?.value?.eventTwo,
            )}
            selectedEvent={values?.compareEvents?.value?.eventOne}
            onSelectedEvent={(value) =>
              handleSelect({ value, type: "eventOne" })
            }
            onSearch={handleSearch}
            searchValue={searchValue}
            isLoading={
              getAllEventApiState1?.isLoading ||
              getAllEventApiState1?.isFetching
            }
          />
          {error?.type === "eventOne" && (
            <p className="mt-2 font-medium text-destructive">
              {error?.message}
            </p>
          )}
        </div>

        <div>
          <SelectEvent
            options={getFilteredOptions(
              getAllEventData2,
              values?.compareEvents?.value?.eventOne,
            )}
            selectedEvent={values?.compareEvents?.value?.eventTwo}
            onSelectedEvent={(value) =>
              handleSelect({ value, type: "eventTwo" })
            }
            onSearch={handleSearchTwo}
            searchValue={searchValueTwo}
            isLoading={
              getAllEventApiState2?.isLoading ||
              getAllEventApiState2?.isFetching
            }
          />
          {error?.type === "eventTwo" && (
            <p className="mt-2 font-medium text-destructive">
              {error?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompareSelect;
