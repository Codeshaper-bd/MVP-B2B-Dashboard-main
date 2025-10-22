import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import {
  type ActionMeta,
  type MultiValue,
  type OptionProps,
  type OptionsOrGroups,
  type PropsValue,
  components,
  type GroupBase,
  type StylesConfig,
  type SingleValue,
} from "react-select";
import AsyncSelect from "react-select/async";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import type { TNullish } from "@/store/api/common-api-types";
import { useLazyGetAllEventQuery } from "@/store/api/events/events-api";
import { Label } from "@/components/ui/label";

import type { THandleLoadOptions } from "./types";

export type TSelectOptionData = {
  label?: string;
  description?: string;
  value: string | number | TNullish;
  image?: string;
  isFixed?: boolean;
  startTime?: string;
};

const getStyles = <T extends TSelectOptionData>(): StylesConfig<
  T,
  true,
  GroupBase<T>
> => ({
  multiValue: (base, state) =>
    state?.data?.isFixed ? { ...base, opacity: "0.5" } : base,
  multiValueLabel: (base, state) =>
    state?.data?.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base,
  multiValueRemove: (base, state) =>
    state?.data?.isFixed ? { ...base, display: "none" } : base,
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
});

function CustomOption<T extends TSelectOptionData>(
  props: OptionProps<T, true, GroupBase<T>>,
) {
  const { label, image, startTime } = (props?.data || {}) as T;

  return (
    <components.Option {...props}>
      <div className="flex items-center gap-3">
        <div className="flex-none">
          <Image
            src={
              getImageFallback({
                src: image,
                fallbackImageSize: 100,
              }) ?? ""
            }
            alt={props?.data?.label ?? ""}
            width={40}
            height={40}
            className="rounded-md"
          />
        </div>

        <div className="flex-1">
          <h5 className="text-sm font-medium leading-5 text-default-900">
            {label}
          </h5>
          <p className="text-sm font-normal leading-5 text-default-600">
            {convertUTCToLocal({
              utcDateTime: startTime,
            })}
          </p>
        </div>
      </div>
    </components.Option>
  );
}

interface IEventSelectProps<T extends TSelectOptionData> {
  disableLabel?: boolean;
  value?: PropsValue<T> | null;
  onChange?: (
    newValue: SingleValue<TSelectOptionData>,
    actionMeta: ActionMeta<TSelectOptionData>,
  ) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  options?: OptionsOrGroups<T, GroupBase<T>>;
  placeholder?: string;
  errorMessage?: string | number | null;
  autoFocus?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
}

function EventSelect<T extends TSelectOptionData>({
  disableLabel,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  errorMessage,
  autoFocus,
  isDisabled,
  isLoading,
}: IEventSelectProps<T>) {
  // manage state
  const searchTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const [getAllEvent] = useLazyGetAllEventQuery();
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
              type: "past",
              status: "Completed",
              pageSize: 10,
            },
            true,
          ).unwrap();
          const getAllEventData = getAllEmployeeRes?.data;

          return (
            getAllEventData?.map((event) => ({
              value: event?.details?.id,
              label: event?.details?.name,
              description: event?.details?.description ?? "",
              image:
                event?.details?.media?.find((item) => item?.isFeatured)?.url ??
                undefined,
              startTime: event?.details?.startTime ?? "",
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
    <div className="relative space-y-1.5">
      {!disableLabel && (
        <Label className="text-sm font-medium leading-5">Select Event</Label>
      )}

      <div className="space-y-2">
        <AsyncSelect
          defaultOptions={options}
          isClearable={false}
          value={value}
          styles={getStyles<T>()}
          isDisabled={isDisabled}
          autoFocus={autoFocus}
          onChange={
            onChange as unknown as (
              newValue: MultiValue<T>,
              actionMeta: ActionMeta<T>,
            ) => void
          }
          onBlur={onBlur}
          name="event"
          className="react-select"
          classNamePrefix="select"
          placeholder={placeholder}
          loadOptions={handleLoadOptions({ getAllEvent }) as unknown as any}
          components={{ Option: CustomOption }}
          classNames={{
            option(props) {
              return props.isFocused ? "!bg-[#1F242F]" : "";
            },
            control(props) {
              return cn(
                props.isFocused
                  ? "!ring-1 !ring-primary"
                  : "!ring-border !ring-1",
                errorMessage && "!ring-1 !ring-destructive",
              );
            },
            input(props) {
              return "text-base font-medium leading-6 placeholder:leading-6 placeholder:!text-base placeholder:!font-normal placeholder:!text-default-300";
            },
            dropdownIndicator(props) {
              return "!text-default-600";
            },
          }}
          isLoading={isLoading}
        />

        {!!errorMessage && (
          <p className="text-sm leading-5 text-destructive">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default EventSelect;
