import Image from "next/image";
import { useCallback, useState } from "react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetAllEventQuery } from "@/store/api/events/events-api";
import FilterDropdown from "@/components/features/dropdown/filter-dropdown";

import ChangeEvent from "../FilterOptions/ChangeEvent";
import type { TSelectOptionData } from "../FilterOptions/EventSelect";
import { useSalesRevenueFilterContext } from "../SalesRevenueFilterContext";
import type { ISalesRevenueFilterContextProps } from "../SalesRevenueFilterContext/types";

type THandleChangeEvent = ({
  derived,
  dropdowns,
  modals,
  values,
}: ISalesRevenueFilterContextProps) => (value: TSelectOptionData) => void;

function EventButtonContent({ event }: { event?: TSelectOptionData }) {
  return (
    <div className="flex w-[220px] items-center gap-2 py-2 sm:w-[260px]">
      <div className="h-10 w-[60px] flex-none">
        <Image
          src={getImageFallback({ src: event?.image })}
          alt="Event Image"
          width={60}
          height={48}
          className="size-full rounded-md object-cover"
        />
      </div>
      <div className="text-start">
        <p className="max-w-[180px] truncate">{event?.label}</p>
        <span className="text-xs font-medium text-[#F5F5F6]">
          {convertUTCToLocal({
            utcDateTime: event?.startTime,
          })}
        </span>
      </div>
    </div>
  );
}
function EventDropDown() {
  const filterContextValues = useSalesRevenueFilterContext();
  const [search, setSearch] = useState("");
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);
  const { data: getAllEventRes, ...getAllEventApiState } = useGetAllEventQuery({
    type: "past",
    status: "Completed",
    search,
  });

  const getAllEventData = getAllEventRes?.data || [];
  const {
    values: { event },
    dropdowns,
    derived,
  } = filterContextValues;
  const { isByEventSelected } = derived;

  const handleChangeEvent: THandleChangeEvent = useCallback(
    ({ values, dropdowns }) =>
      (value) => {
        values?.event?.set?.(value);
        dropdowns?.changeEvent?.setIsOpen?.(false);
      },
    [],
  );

  const isValidEventId = checkIsValidId(event?.value?.value);
  const isOpenEventDropdown = isByEventSelected && isValidEventId;
  return (
    <div className="flex justify-end">
      {isOpenEventDropdown && (
        <FilterDropdown
          buttonContent={
            <EventButtonContent event={event?.value ?? undefined} />
          }
          isOpen={dropdowns?.changeEvent?.isOpen}
          setIsOpen={dropdowns?.changeEvent?.setIsOpen}
          classNames={{
            contentClassName: "sm:w-[352px] w-[220px]",
            triggerClassName: "w-fit h-fit md:px-2",
          }}
        >
          <ChangeEvent
            options={getAllEventData?.map((item, index) => ({
              value: item?.details?.id,
              label: item?.details?.name,
              description: item?.details?.description,
              image:
                item?.details?.media?.find((item) => item?.isFeatured)?.url ??
                undefined,
              startTime: item?.details?.startTime,
            }))}
            onChange={handleChangeEvent(filterContextValues)}
            onSearch={handleSearch}
            searchValue={search}
            isLoading={
              getAllEventApiState?.isLoading || getAllEventApiState?.isFetching
            }
          />
        </FilterDropdown>
      )}
    </div>
  );
}

export default EventDropDown;
