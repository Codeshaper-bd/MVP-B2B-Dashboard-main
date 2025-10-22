import { XIcon } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";

import { useBooleanContext } from "@/contexts/BooleanContext";
import useBooleanState from "@/hooks/useBooleanState";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { convertLocalToUTC, convertUTCToLocal } from "@/lib/date-time/utc-date";
import type { TNullish } from "@/store/api/common-api-types";
import type {
  TDateFilter,
  TEventStatus,
  TEventType,
  TGetAllEventArgs,
} from "@/store/api/events/events.types";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { SelectReact } from "@/components/ui/select-react";

import DateRangePickerDropDown from "./DateRangePickerDropDown";

export interface IFiltersModalProps {
  type: TEventType;
}

type TStatusOption = {
  value: TEventStatus;
  label: string;
  color?: string;
};

const statusOptions: TStatusOption[] = [
  { label: "Published", value: "Published" },
  { label: "Scheduled", value: "Scheduled" },
];

type TDateOption = {
  value: TDateFilter | "customRange";
  label: string;
};

const compareURLAndStateValues = ({
  statusState,
  customDateRangeState,
  publishDateState,
  status,
  startDate,
  endDate,
  dateFilter,
}: {
  statusState: TStatusOption[] | TNullish;
  customDateRangeState: TNullish | DateRange;
  publishDateState: TDateOption | TNullish;
  status: string | undefined;
  startDate: string | null | undefined;
  endDate: string | null | undefined;
  dateFilter: string | null | undefined;
}): boolean => {
  const statusStateValues =
    statusState
      ?.map((option) => option.value)
      .sort()
      .join(",") ?? "";
  const urlStatusSorted = status?.split(",").sort().join(",") ?? "";
  const isStatusSame = statusStateValues === urlStatusSorted;

  let isDateSame = false;

  if (publishDateState?.value === "customRange") {
    const startDateMatch =
      !!startDate &&
      !!customDateRangeState?.from &&
      startDate.slice(0, 10) ===
        convertLocalToUTC({
          localDateTime: customDateRangeState.from,
          type: "startOfDay",
        })?.slice(0, 10);

    const endDateMatch =
      !!endDate &&
      !!customDateRangeState?.to &&
      endDate.slice(0, 10) ===
        convertLocalToUTC({
          localDateTime: customDateRangeState.to,
          type: "endOfDay",
        })?.slice(0, 10);
    isDateSame = startDateMatch && endDateMatch;
  } else {
    isDateSame =
      (!publishDateState?.value && !dateFilter) ||
      (!!publishDateState?.value && publishDateState.value === dateFilter);
  }

  return isStatusSame && isDateSame;
};

function FiltersModal({ type }: IFiltersModalProps) {
  const { setClose: setFilterModalClose } = useBooleanContext();
  const [customDateRangeState, setCustomDateRangeState] =
    useState<DateRange | null>(null);

  const upcomingDateOptions: TDateOption[] = useMemo(
    () => [
      { value: "next7days", label: "Next 7 days" },
      { value: "next30days", label: "Next 30 days" },
      {
        value: "customRange",
        label:
          customDateRangeState?.from && customDateRangeState?.to
            ? `${convertUTCToLocal({
                utcDateTime: customDateRangeState.from.toISOString(),
                format: "DD/MM/YYYY",
              })} - ${convertUTCToLocal({
                utcDateTime: customDateRangeState.to.toISOString(),
                format: "DD/MM/YYYY",
              })}`
            : "Custom",
      },
    ],
    [customDateRangeState],
  );
  const pastDateOptions: TDateOption[] = useMemo(
    () => [
      { value: "last7days", label: "Last 7 days" },
      { value: "last30days", label: "Last 30 days" },
      {
        value: "customRange",
        label:
          customDateRangeState?.from && customDateRangeState?.to
            ? `${convertUTCToLocal({
                utcDateTime: customDateRangeState.from.toISOString(),
                format: "DD/MM/YYYY",
              })} - ${convertUTCToLocal({
                utcDateTime: customDateRangeState.to.toISOString(),
                format: "DD/MM/YYYY",
              })}`
            : "Custom",
      },
    ],
    [customDateRangeState],
  );

  const dateOptions =
    type === "upcoming" ? upcomingDateOptions : pastDateOptions;

  const { getAllParamValue, getAParamValue, updateMultipleParam } =
    useManageSearchParams<Exclude<TGetAllEventArgs, void | undefined>>();

  const { tab } = getAllParamValue() as { tab?: string };
  const { status, dateFilter, startDate, endDate } = getAllParamValue();

  const isHiddenTab =
    tab === "Draft" || tab === "cancelled" || type !== "upcoming";
  const isSomeFilterApplied =
    getAParamValue("status") ||
    getAParamValue("dateFilter") ||
    getAParamValue("startDate") ||
    getAParamValue("endDate");

  const [statusState, setStatusState] = useState<TStatusOption[] | TNullish>(
    () => {
      const urlStatusOptions = getAParamValue("status");
      const selectedStatusOptions = statusOptions?.filter((option) =>
        urlStatusOptions?.includes(option?.value),
      );
      return selectedStatusOptions?.length ? selectedStatusOptions : null;
    },
  );

  const [publishDateState, setPublishDateState] = useState<
    TDateOption | TNullish
  >(() => {
    if (startDate && endDate) {
      return dateOptions.find((opt) => opt.value === "customRange") ?? null;
    }

    const urlDateFilter = getAParamValue("dateFilter");
    return dateOptions.find((opt) => opt.value === urlDateFilter) ?? null;
  });

  const [dateOrderState, setDateOrderState] = useState<
    Exclude<TGetAllEventArgs, void | undefined>["dateFilter"] | "customRange"
  >(
    startDate && endDate
      ? "customRange"
      : (getAParamValue("dateFilter") as
          | Exclude<TGetAllEventArgs, void | undefined>["dateFilter"]
          | "customRange"),
  );

  useEffect(() => {
    if (startDate && endDate) {
      setCustomDateRangeState({
        from: new Date(startDate),
        to: new Date(endDate),
      });
    } else {
      setCustomDateRangeState(null);
    }
  }, [startDate, endDate]);

  const isFilterValueAvailable =
    !!statusState?.length || !!publishDateState || !!startDate || !!endDate;

  const isStateAndUrlSame = useMemo(
    () =>
      compareURLAndStateValues({
        statusState,
        customDateRangeState,
        publishDateState,
        status,
        startDate,
        endDate,
        dateFilter,
      }),
    [
      statusState,
      customDateRangeState,
      publishDateState,
      status,
      startDate,
      endDate,
      dateFilter,
    ],
  );

  const {
    state: isCalendarOpen,
    setOpen: openCalendar,
    setClose: closeCalendar,
  } = useBooleanState();

  return (
    <div className="absolute right-0 top-full z-50 mt-4 w-full rounded-lg border border-border bg-popover p-6 shadow-lg md:w-[400px] md:min-w-[400px]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-default-900">Filters</h2>

        <XIcon
          className="h-5 w-5 cursor-pointer"
          onClick={setFilterModalClose}
        />
      </div>

      <div>
        <div>
          {!isHiddenTab && (
            <LabelErrorWrapper label="Status" htmlFor="status">
              <SelectReact
                isMulti
                id="status"
                value={statusState ?? null}
                onChange={(newValue) => {
                  const selectedOptions = newValue as
                    | TStatusOption[]
                    | TNullish;
                  setStatusState(selectedOptions ?? null);
                }}
                placeholder="Select Status"
                options={statusOptions}
              />
            </LabelErrorWrapper>
          )}

          <div className="relative mt-3">
            <SelectInput
              label="Event Date"
              placeholder="Select"
              options={dateOptions}
              onChange={(value) => {
                setDateOrderState(value?.value ? value.value : undefined);
                setPublishDateState(value ?? null);
                if (value?.value === "customRange") {
                  openCalendar()();
                  if (isCalendarOpen) {
                    closeCalendar()();
                  }
                }
                if (value?.value !== "customRange") {
                  closeCalendar()();
                }
              }}
              value={dateOrderState}
            />

            {isCalendarOpen && (
              <DateRangePickerDropDown
                selectedDate={customDateRangeState}
                onApply={(value) => {
                  setCustomDateRangeState(value ?? null);
                  closeCalendar()();
                }}
                onCancel={closeCalendar()}
              />
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button fullWidth type="button" onClick={setFilterModalClose}>
            Cancel
          </Button>

          <Button
            fullWidth
            color="primary"
            type="button"
            disabled={!isFilterValueAvailable}
            onClick={() => {
              if (isSomeFilterApplied && isStateAndUrlSame) {
                updateMultipleParam({
                  status: undefined,
                  dateFilter: undefined,
                  startDate: undefined,
                  endDate: undefined,
                  page: undefined,
                });
                setFilterModalClose();
                return;
              }

              const status = statusState
                ?.map((option) => option.value)
                ?.join(",");
              const dateFilter = publishDateState?.value ?? null;

              updateMultipleParam({
                status: status ? status : undefined,
                dateFilter:
                  !!dateFilter && dateFilter !== "customRange"
                    ? dateFilter
                    : undefined,
                startDate:
                  dateFilter === "customRange" && customDateRangeState?.from
                    ? convertLocalToUTC({
                        localDateTime: customDateRangeState.from,
                        type: "startOfDay",
                      })
                    : undefined,
                endDate:
                  dateFilter === "customRange" && customDateRangeState?.to
                    ? convertLocalToUTC({
                        localDateTime: customDateRangeState.to,
                        type: "endOfDay",
                      })
                    : undefined,
                page: undefined,
              });
              setFilterModalClose();
            }}
          >
            {isFilterValueAvailable && isStateAndUrlSame ? "Clear" : "Apply"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(FiltersModal);
