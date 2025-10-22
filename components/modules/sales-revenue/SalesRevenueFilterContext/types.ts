import type { DateRange } from "react-day-picker";

import type { TNullish } from "@/store/api/common-api-types";
import type { TDateRange } from "@/components/date-time/date-range-picker";
import type { TTimeRange } from "@/components/features/filters/DateTimeFilters";

import type { TFilterTypeOption } from "../DropDowns/FilterTypeDropDown";
import type { TSelectOptionData } from "../FilterOptions/EventSelect";

export type TCompareEvents = {
  eventOne?: TSelectOptionData;
  eventTwo?: TSelectOptionData;
};

export type TBooleanState = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TNullableState<T> = T | undefined | null;
export type TState<T> = {
  value: T;
  set: React.Dispatch<React.SetStateAction<T>>;
};

export type TFilterTypeState = TNullableState<TFilterTypeOption>;
export type TTempFilterTypeState = TNullableState<TFilterTypeOption>;
export type TDateRangeState = TNullableState<DateRange>;
export type TCompareEventsState = TNullableState<TCompareEvents>;
export type TEventState = TNullableState<number>;

export interface ISalesRevenueFilterContextProps {
  values: {
    // Filter Type
    filterType: TState<TFilterTypeState>;
    tempFilterType: TState<TTempFilterTypeState>;

    // Date Range
    dateRange: TState<TDateRange>;
    activeTime: TState<TTimeRange>;
    // Compare Events
    compareEvents: TState<TCompareEventsState>;

    // Selected Event
    event: TState<TSelectOptionData | TNullish>;
    resetToInitialValues: () => void;
  };

  // Modal States
  modals: {
    eventSelect: TBooleanState;
    compareEvents: TBooleanState;
  };

  // Dropdown States
  dropdowns: {
    filterType: TBooleanState;
    changeEvent: TBooleanState;
  };

  derived: {
    // Derived States
    isByEventSelected: boolean;
    isCompareEventsSelected: boolean;
  };
}
