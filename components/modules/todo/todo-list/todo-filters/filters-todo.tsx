"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import Select from "react-select";

import useBooleanState from "@/hooks/useBooleanState";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { convertLocalToUTC, convertUTCToLocal } from "@/lib/date-time/utc-date";
import { cn } from "@/lib/utils";
import type { TSortOrder } from "@/store/api/common-api-types";
import { useGetAllTodoTagsQuery } from "@/store/api/todo/todo-api";
import type { TGetAllTodoArgs } from "@/store/api/todo/todo.types";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import type { ICustomRadioLabelProps } from "@/components/CustomRadioGroup/Radio/Label";
import CrossIcon from "@/components/icons/CrossIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import DateRangePickerDropDown from "@/components/modules/event/page-tools/Modal/DateRangePickerDropDown";
import SelectInput from "@/components/SelectInput";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import { Button } from "@/components/ui/button";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

type TStatus = "NOT_COMPLETED" | "COMPLETED" | undefined;

const radioProps: ICustomRadioLabelProps = {
  textSize: "16px",
  centerColor: "transparent",
  ringSize: "5px",
  mode: "label-right",
};

type TOptions<T> = {
  label: string;
  value: T;
  radioProps: ICustomRadioLabelProps;
}[];

const statusOptions: TOptions<TStatus> = [
  {
    label: "COMPLETED",
    value: "COMPLETED",
    radioProps,
  },
  {
    label: "NOT COMPLETED",
    value: "NOT_COMPLETED",
    radioProps,
  },
];

// Helper to compare arrays (tags)
const arrayEqual = (a?: string[], b?: string[]) =>
  Array.isArray(a) &&
  Array.isArray(b) &&
  a.length === b.length &&
  a.every((v, i) => v === b[i]);

const compareURLAndStateValues = ({
  tagsState,
  sortOrderState,
  statusState,
  customDateRangeState,
  tags,
  sortBy,
  sortOrder,
  status,
  startDate,
  endDate,
}: {
  tagsState: IOption[] | undefined;
  sortOrderState: string | undefined;
  statusState: string | undefined;
  customDateRangeState: DateRange | null;
  tags: string | undefined;
  sortBy: string | undefined;
  sortOrder: string | undefined;
  status: string | undefined;
  startDate?: string;
  endDate?: string;
}): boolean => {
  // Compare tags
  const tagsFromState =
    tagsState
      ?.map((t) => String(t.value))
      .filter((v): v is string => typeof v === "string")
      .sort() ?? [];
  const tagsFromUrl =
    tags
      ?.split(",")
      .filter((v): v is string => Boolean(v))
      .sort() ?? [];
  const tagsMatch = arrayEqual(tagsFromState, tagsFromUrl);

  const sortOrderMatch =
    (sortOrderState === "customRange" && sortOrder === undefined) ||
    sortOrderState === sortOrder;
  const statusMatch = statusState === status;

  // Compare custom date range
  let dateMatch = true;
  if (sortOrderState === "customRange") {
    dateMatch =
      !!customDateRangeState?.from &&
      !!customDateRangeState?.to &&
      !!startDate &&
      !!endDate &&
      startDate?.slice(0, 10) ===
        convertLocalToUTC({
          localDateTime: customDateRangeState?.from,
          type: "startOfDay",
        })?.slice(0, 10) &&
      endDate?.slice(0, 10) ===
        convertLocalToUTC({
          localDateTime: customDateRangeState?.to,
          type: "endOfDay",
        })?.slice(0, 10);
  }
  return tagsMatch && sortOrderMatch && statusMatch && dateMatch;
};

interface ISortDateOption extends IOption {
  value: TSortOrder | "customRange";
}

function FiltersTodo() {
  const { data: getAllTodoTagsRes, ...getAllTodoTagsApiState } =
    useGetAllTodoTagsQuery();
  const getAllTodoTagsData = getAllTodoTagsRes?.data;
  const tagOptions = useMemo(
    () =>
      getAllTodoTagsData?.map((tag) => ({
        label: tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase(),
        value: tag,
      })),
    [getAllTodoTagsData],
  );
  const [customDateRangeState, setCustomDateRangeState] =
    useState<DateRange | null>(null);
  const {
    state: isCalendarOpen,
    setOpen: openCalendar,
    setClose: closeCalendar,
  } = useBooleanState();

  const sortDateOptions: ISortDateOption[] = useMemo(
    () => [
      { value: "desc", label: "Most Recent" },
      { value: "asc", label: "From the oldest" },
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

  const { state: open, toggle, setClose } = useBooleanState();
  const { getAParamValue, getAllParamValue, updateMultipleParam } =
    useManageSearchParams<
      Exclude<TGetAllTodoArgs, void | undefined> & {
        completedTodoPageNumber?: number;
        notCompletedTodoPageNumber?: number;
        startDate?: string;
        endDate?: string;
      }
    >();
  const { status, startDate, endDate, tags, sortBy, sortOrder } =
    getAllParamValue();
  const [sortByState, setSortByState] = useState<
    Exclude<TGetAllTodoArgs, void | undefined>["sortBy"]
  >(getAParamValue("sortBy"));
  const [sortOrderState, setSortOrderState] = useState<
    Exclude<TGetAllTodoArgs, void | undefined>["sortOrder"] | "customRange"
  >(
    getAParamValue("sortOrder") as
      | Exclude<TGetAllTodoArgs, void | undefined>["sortOrder"]
      | "customRange",
  );
  const [tagsState, setTagsState] = useState<IOption[] | undefined>(
    getAParamValue("tags")?.length
      ? getAParamValue("tags")
          ?.split(",")
          ?.map((tag) => ({
            label: tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase(),
            value: tag,
          }))
      : undefined,
  );
  const [statusState, setStatusState] = useState<TStatus>(
    (getAParamValue("status") as TStatus) ?? undefined,
  );
  const isFilterValueAvailable =
    !!tagsState?.length ||
    !!sortByState ||
    !!sortOrderState ||
    !!statusState ||
    !!customDateRangeState?.from ||
    !!customDateRangeState?.to;
  const handleStatusChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setStatusState(e.target.value as TStatus);
    }, []);

  const isStateAndUrlSame = useMemo(
    () =>
      compareURLAndStateValues({
        tagsState,
        sortOrderState,
        statusState,
        customDateRangeState,
        tags,
        sortBy,
        sortOrder,
        status,
        startDate,
        endDate,
      }),
    [
      tagsState,
      sortOrderState,
      statusState,
      customDateRangeState,
      tags,
      sortBy,
      sortOrder,
      status,
      startDate,
      endDate,
    ],
  );

  const startDateParam = getAParamValue("startDate");
  const endDateParam = getAParamValue("endDate");
  useEffect(() => {
    if (startDateParam && endDateParam) {
      setSortOrderState("customRange");
      setCustomDateRangeState({
        from: new Date(startDateParam),
        to: new Date(endDateParam),
      });
    }
    // eslint-disable-next-line prettier/prettier, react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const paramTags = tags;
    setTagsState(
      paramTags?.length
        ? paramTags.split(",").map((tag) => ({
            label: tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase(),
            value: tag,
          }))
        : undefined,
    );

    // Sort Order
    const paramSortOrder = sortOrder;
    setSortOrderState(
      paramSortOrder
        ? (paramSortOrder as typeof sortOrderState)
        : startDate && endDate
          ? "customRange"
          : undefined,
    );

    // Sort By
    const paramSortBy = sortBy;
    setSortByState(paramSortBy);

    // Status
    const paramStatus = status as TStatus;
    setStatusState(paramStatus);

    // Custom Date Range
    const paramStartDate = startDate;
    const paramEndDate = endDate;
    if (paramStartDate && paramEndDate) {
      setCustomDateRangeState({
        from: new Date(paramStartDate),
        to: new Date(paramEndDate),
      });
    } else {
      setCustomDateRangeState(null);
    }
  }, [status, startDate, endDate, tags, sortBy, sortOrder]);

  return (
    <div className="relative">
      <Button
        color="secondary"
        onClick={toggle()}
        className={cn({
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground":
            open,
        })}
      >
        <FilterIcon className="me-1 h-3.5 w-3.5" />
        Filter
      </Button>

      {open && (
        <div className="absolute end-0 top-full z-10 mt-4 w-[320px] rounded-lg border border-border bg-popover p-6 md:min-w-[400px]">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-default-900">Filters</h2>
            <CrossIcon
              className="h-6 w-6 cursor-pointer"
              onClick={setClose()}
            />
          </div>

          <form noValidate>
            <div className="mt-5 space-y-4">
              <LabelErrorWrapper label="Tags">
                <Select
                  isMulti
                  options={tagOptions}
                  className="react-select"
                  classNamePrefix="select"
                  placeholder="Enter tags"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minHeight: "44px",
                      border: provided.isFocused
                        ? "border-primary"
                        : "border-border",
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      padding: "4px",
                    }),
                    input: (provided) => ({
                      ...provided,
                      margin: "0",
                    }),
                    valueContainer: (provided) => ({
                      ...provided,
                      padding: "0 10px",
                    }),
                  }}
                  classNames={{
                    option(props) {
                      return props.isFocused ? "!bg-[#1F242F]" : "";
                    },
                    control(props) {
                      return props.isFocused
                        ? "!ring-1 !ring-primary"
                        : "!ring-border !ring-1";
                    },
                    input(props) {
                      return "text-base font-medium leading-6 placeholder:leading-6 placeholder:!text-base placeholder:!font-normal placeholder:!text-default-300";
                    },
                    dropdownIndicator(props) {
                      return "!text-default-600";
                    },
                  }}
                  onChange={(value) => {
                    setTagsState(
                      value?.length ? (value as IOption[]) : undefined,
                    );
                  }}
                  value={tagsState ?? null}
                />
              </LabelErrorWrapper>

              <div className="relative">
                <SelectInput
                  label="Sort Date"
                  placeholder="Select"
                  options={sortDateOptions}
                  onChange={(value) => {
                    setSortOrderState(value?.value ? value.value : undefined);
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
                  value={sortOrderState}
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

              <div className="space-y-2">
                <CustomRadioGroup
                  direction="column"
                  gap="gap-3"
                  label={"Status"}
                  className="pl-2.5"
                  labelClassName="text-sm font-medium sm:text-sm text-default-700"
                  options={statusOptions}
                  onChange={handleStatusChange}
                  value={statusState}
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <Button
                type="button"
                fullWidth
                onClick={() => {
                  setClose()();
                }}
              >
                Cancel
              </Button>

              <Button
                fullWidth
                color="primary"
                type="button"
                onClick={() => {
                  if (isFilterValueAvailable && isStateAndUrlSame) {
                    // Clear all filters
                    updateMultipleParam({
                      tags: undefined,
                      page: undefined,
                      sortBy: undefined,
                      sortOrder: undefined,
                      status: undefined,
                      startDate: undefined,
                      endDate: undefined,
                      completedTodoPageNumber: undefined,
                      notCompletedTodoPageNumber: undefined,
                    });

                    setTagsState(undefined);
                    setSortByState(undefined);
                    setSortOrderState(undefined);
                    setStatusState(undefined);
                    setCustomDateRangeState(null);

                    setClose()();
                    return;
                  }
                  // Apply filters
                  updateMultipleParam({
                    tags: tagsState
                      ?.map((tag) => (tag as unknown as IOption)?.value)
                      ?.join(","),
                    sortOrder:
                      sortOrderState === "customRange"
                        ? undefined
                        : sortOrderState,
                    sortBy:
                      sortOrderState === "asc" || sortOrderState === "desc"
                        ? "createdAt"
                        : undefined,
                    startDate:
                      sortOrderState === "customRange" &&
                      customDateRangeState?.from
                        ? convertLocalToUTC({
                            localDateTime: customDateRangeState.from,
                            type: "startOfDay",
                          })
                        : undefined,
                    endDate:
                      sortOrderState === "customRange" &&
                      customDateRangeState?.to
                        ? convertLocalToUTC({
                            localDateTime: customDateRangeState.to,
                            type: "endOfDay",
                          })
                        : undefined,
                    status: statusState ?? undefined,
                    completedTodoPageNumber: undefined,
                    notCompletedTodoPageNumber: undefined,
                  });
                  setClose()();
                }}
              >
                {isFilterValueAvailable && isStateAndUrlSame
                  ? "Clear"
                  : "Apply"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default FiltersTodo;
