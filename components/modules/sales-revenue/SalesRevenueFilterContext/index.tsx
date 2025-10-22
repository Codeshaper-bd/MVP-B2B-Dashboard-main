"use client";
import dayjs from "dayjs";
import React, { createContext, useCallback, useContext, useState } from "react";

import type { TNullish } from "@/store/api/common-api-types";
import { type TDateRange } from "@/components/date-time/date-range-picker";
import type { TTimeRange } from "@/components/features/filters/DateTimeFilters";

import type {
  ISalesRevenueFilterContextProps,
  TCompareEventsState,
  TFilterTypeState,
} from "./types";
import { typeFilterOptions } from "../DropDowns/FilterTypeDropDown";
import type { TSelectOptionData } from "../FilterOptions/EventSelect";

const SalesRevenueFilterContext = createContext<
  ISalesRevenueFilterContextProps | undefined
>(undefined);

interface ISalesRevenueFilterProviderProps {
  children: React.ReactNode;
}

function SalesRevenueFilterProvider({
  children,
}: ISalesRevenueFilterProviderProps) {
  const [filterType, setFilterType] = useState<TFilterTypeState>(
    typeFilterOptions[0],
  );
  const [tempFilterType, setTempFilterType] = useState<TFilterTypeState>(
    typeFilterOptions[0],
  );

  // values
  const [event, setEvent] = useState<TSelectOptionData | TNullish>(null);
  const [compareEvents, setCompareEvents] = useState<TCompareEventsState>();
  const [dateRange, setDateRange] = useState<TDateRange>({
    from: dayjs("1970-01-01T00:00:00Z").toDate(),
    to: dayjs().toDate(),
  });
  const [activeTime, setActiveTime] = useState<TTimeRange>("all");

  // Dropdown States
  const [isFilterTypeDropDownOpen, setIsFilterTypeDropDownOpen] =
    useState(false);
  const [isChangeEventDropDownOpen, setIsChangeEventDropDownOpen] =
    useState(false);

  // Modal States
  const [isCompareEventsModalOpen, setIsCompareEventsModalOpen] =
    useState(false);
  const [isEventSelectModalOpen, setIsEventSelectModalOpen] = useState(false);

  const isByEventSelected = filterType?.value === "byEvent";
  const isCompareEventsSelected = filterType?.value === "compareEvents";

  const resetToInitialValues = useCallback(() => {
    setDateRange({
      from: dayjs().subtract(1, "month").toDate(),
      to: dayjs().toDate(),
    });
    setEvent(undefined);
    setCompareEvents(undefined);
    // setFilterType(typeFilterOptions[0]);
  }, []);

  return (
    <SalesRevenueFilterContext.Provider
      value={{
        values: {
          filterType: { value: filterType, set: setFilterType },
          dateRange: { value: dateRange, set: setDateRange },
          event: { value: event, set: setEvent },
          compareEvents: { value: compareEvents, set: setCompareEvents },
          resetToInitialValues,
          tempFilterType: { value: tempFilterType, set: setTempFilterType },
          activeTime: { value: activeTime, set: setActiveTime },
        },
        modals: {
          compareEvents: {
            isOpen: isCompareEventsModalOpen,
            setIsOpen: setIsCompareEventsModalOpen,
          },
          eventSelect: {
            isOpen: isEventSelectModalOpen,
            setIsOpen: setIsEventSelectModalOpen,
          },
        },
        dropdowns: {
          changeEvent: {
            isOpen: isChangeEventDropDownOpen,
            setIsOpen: setIsChangeEventDropDownOpen,
          },
          filterType: {
            isOpen: isFilterTypeDropDownOpen,
            setIsOpen: setIsFilterTypeDropDownOpen,
          },
        },
        derived: {
          isByEventSelected,
          isCompareEventsSelected,
        },
      }}
    >
      {children}
    </SalesRevenueFilterContext.Provider>
  );
}

export default SalesRevenueFilterProvider;

export const useSalesRevenueFilterContext =
  (): ISalesRevenueFilterContextProps => {
    const context = useContext(SalesRevenueFilterContext);
    if (!context) {
      throw new Error("useFilterContext must be used within an FilterProvider");
    }

    return context;
  };
