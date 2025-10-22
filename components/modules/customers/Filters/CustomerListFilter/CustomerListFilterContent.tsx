"use client";

import { useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";

import { useBooleanContext } from "@/contexts/BooleanContext";
import useBooleanState from "@/hooks/useBooleanState";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import {
  convertLocalToUTC,
  convertUTCToLocal,
  convertUTCToLocalDate,
} from "@/lib/date-time/utc-date";
import type { TGender } from "@/store/api/auth/auth.types";
import type { TNullish } from "@/store/api/common-api-types";
import type {
  TGetAllCustomerLookupArgs,
  TLastPurchase,
  TMonth,
  TMonthSuggestions,
} from "@/store/api/customer-lookup/customer-lookup.types";
import DateRangePickerDropDown from "@/components/modules/event/page-tools/Modal/DateRangePickerDropDown";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

export type TGenderOption = {
  label: string;
  value: TGender;
};

export const genderStateOptions: TGenderOption[] = [
  {
    label: "Male",
    value: "MALE",
  },
  {
    label: "Female",
    value: "FEMALE",
  },
  {
    label: "Other",
    value: "OTHER",
  },
];

type TLastPurchaseOption = {
  label?: string;
  value: TLastPurchase | "customRange";
};

type TMonthOption = {
  label: string;
  value: TMonth;
};

export const monthOptions: TMonthOption[] = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const compareURLAndStateValues = ({
  genderState,
  lastPurchaseState,
  selectedMonthsState,
  gender,
  lastPurchase,
  birthdayMonth,
  customDateRangeState,
  startDate,
  endDate,
}: {
  genderState: TGenderOption | null;
  lastPurchaseState: TLastPurchaseOption | null;
  selectedMonthsState: Map<string, TMonthOption> | null;
  gender: TGender | undefined;
  lastPurchase: TLastPurchase | undefined;
  birthdayMonth: TMonthSuggestions | undefined;
  customDateRangeState: DateRange | TNullish;
  startDate?: string;
  endDate?: string;
}): boolean => {
  const genderMatch =
    genderState?.value === gender || (!genderState?.value && !gender);
  const purchaseMatch =
    lastPurchaseState?.value === lastPurchase ||
    (lastPurchaseState?.value === "customRange" &&
      !!customDateRangeState?.from &&
      !!customDateRangeState?.to &&
      startDate &&
      endDate &&
      convertUTCToLocalDate({ utcDateTime: startDate })?.toISOString() ===
        customDateRangeState.from.toISOString() &&
      convertUTCToLocalDate({ utcDateTime: endDate })?.toISOString() ===
        customDateRangeState.to.toISOString()) ||
    (!lastPurchase && !lastPurchaseState?.value);

  const selectedMonthsArray = selectedMonthsState
    ? selectedMonthsState.keys()?.toArray()
    : null;
  const birthdayMonthArray = birthdayMonth ? birthdayMonth.split(",") : null;

  const monthsMatch =
    (selectedMonthsArray?.length === birthdayMonthArray?.length &&
      birthdayMonthArray?.every((month) => selectedMonthsState?.has(month))) ||
    (!selectedMonthsArray && !birthdayMonthArray);

  return genderMatch && purchaseMatch && monthsMatch;
};

function CustomerListFilterContent() {
  const { setClose: closeFilter } = useBooleanContext();
  const { getAParamValue, getAllParamValue, updateMultipleParam } =
    useManageSearchParams<Exclude<TGetAllCustomerLookupArgs, void>>();
  const { gender, birthdayMonth, lastPurchase, startDate, endDate } =
    getAllParamValue();

  const [genderState, setGenderState] = useState<TGenderOption | null>(() => {
    const genderOption = genderStateOptions.find(
      (option) => option?.value === gender,
    );
    return genderOption ?? null;
  });
  const [customDateRangeState, setCustomDateRangeState] = useState<
    DateRange | TNullish
  >(() => {
    if (!startDate && !endDate) {
      return null;
    }

    return {
      from: startDate
        ? convertUTCToLocalDate({ utcDateTime: startDate })
        : undefined,
      to: endDate ? convertUTCToLocalDate({ utcDateTime: endDate }) : undefined,
    };
  });

  const purchaseStateOptions: TLastPurchaseOption[] = useMemo(
    () => [
      {
        label: "24 hours",
        value: "24h",
      },
      {
        label: "Last 7 days",
        value: "7d",
      },
      {
        label: "Last 30 days",
        value: "30d",
      },
      {
        label:
          customDateRangeState &&
          customDateRangeState.from &&
          customDateRangeState.to
            ? `${convertUTCToLocal({
                utcDateTime: customDateRangeState.from.toISOString(),
                format: "DD/MM/YYYY",
              })} - ${convertUTCToLocal({
                utcDateTime: customDateRangeState.to.toISOString(),
                format: "DD/MM/YYYY",
              })}`
            : "Pick a Range",
        value: "customRange",
      },
    ],
    [customDateRangeState],
  );
  const [lastPurchaseState, setLastPurchaseState] =
    useState<TLastPurchaseOption | null>(() => {
      const purchaseOption = purchaseStateOptions?.find((option) => {
        if (!!lastPurchase && !startDate && !endDate) {
          return option?.value === lastPurchase;
        } else if (!lastPurchase && (!!startDate || !!endDate)) {
          return option?.value === "customRange";
        }
      });
      return purchaseOption ?? null;
    });
  const [selectedMonthsState, setSelectedMonthsState] = useState<Map<
    string,
    TMonthOption
  > | null>(() => {
    const birthdayMonths = birthdayMonth?.split(",") as TMonth[] | undefined;
    if (!birthdayMonths) {
      return null;
    }
    const selectedMonthsState = new Map<string, TMonthOption>();
    for (const month of birthdayMonths ?? []) {
      const monthOption = monthOptions.find(
        (option) => option?.value === month,
      );
      if (monthOption) {
        selectedMonthsState.set(month, monthOption);
      }
    }
    return selectedMonthsState;
  });

  const isSomeFilterApplied =
    getAParamValue("gender") ||
    getAParamValue("lastPurchase") ||
    getAParamValue("birthdayMonth") ||
    getAParamValue("startDate") ||
    getAParamValue("endDate");

  const {
    state: isCalenderOpen,
    setOpen: setCalenderOpen,
    setClose: setCalenderClose,
  } = useBooleanState();

  const isStateAndUrlSame = useMemo(
    () =>
      compareURLAndStateValues({
        birthdayMonth,
        gender,
        lastPurchase,
        genderState,
        lastPurchaseState,
        selectedMonthsState,
        customDateRangeState,
        startDate,
        endDate,
      }),
    [
      birthdayMonth,
      gender,
      lastPurchase,
      genderState,
      lastPurchaseState,
      selectedMonthsState,
      customDateRangeState,
      startDate,
      endDate,
    ],
  );

  const isSomeFilterSelected =
    !!selectedMonthsState?.keys()?.toArray()?.length ||
    (!!lastPurchaseState?.value &&
      lastPurchaseState?.value !== "customRange") ||
    (!!customDateRangeState?.from && !!customDateRangeState?.to) ||
    !!genderState?.value;

  const onApply = () => {
    const birthdayMonthValue =
      selectedMonthsState && selectedMonthsState.size > 0
        ? Array.from(selectedMonthsState.keys()).join(",")
        : undefined;
    updateMultipleParam({
      page: undefined,
      gender: genderState?.value,
      lastPurchase:
        !!lastPurchaseState?.value && lastPurchaseState?.value !== "customRange"
          ? lastPurchaseState?.value
          : undefined,
      startDate:
        lastPurchaseState?.value === "customRange" && customDateRangeState?.from
          ? convertLocalToUTC({
              localDateTime: customDateRangeState?.from,
            })
          : undefined,
      endDate:
        lastPurchaseState?.value === "customRange" && customDateRangeState?.to
          ? convertLocalToUTC({
              localDateTime: customDateRangeState?.to,
            })
          : undefined,
      birthdayMonth: birthdayMonthValue as TMonthSuggestions,
    });
    closeFilter();
  };

  const onClear = () => {
    setGenderState(null);
    setLastPurchaseState(null);
    setSelectedMonthsState(null);
    updateMultipleParam({
      page: undefined,
      gender: undefined,
      lastPurchase: undefined,
      birthdayMonth: undefined,
      startDate: undefined,
      endDate: undefined,
    });
  };
  useEffect(() => {
    if (customDateRangeState?.from && customDateRangeState?.to) {
      setLastPurchaseState({
        label: `${convertUTCToLocal({
          utcDateTime: customDateRangeState?.from?.toISOString(),
          format: "DD/MM/YYYY",
        })} - ${convertUTCToLocal({
          utcDateTime: customDateRangeState?.to?.toISOString(),
          format: "DD/MM/YYYY",
        })}`,
        value: "customRange",
      });
    }
  }, [customDateRangeState]);

  return (
    <div>
      <div className="-mr-6">
        <div className="space-y-4 pr-6">
          <SelectInput
            label="Gender"
            placeholder="Select Gender"
            options={genderStateOptions}
            value={genderState}
            onChange={(value) => {
              setGenderState(value ?? null);
            }}
          />

          <div className="relative">
            <SelectInput
              label="Last Purchase"
              placeholder="Select Date"
              options={purchaseStateOptions}
              value={lastPurchaseState}
              onChange={(value) => {
                setLastPurchaseState(value ?? null);
                if (value?.value === "customRange") {
                  setCalenderOpen()();
                  if (isCalenderOpen) {
                    setCalenderClose()();
                  }
                }
                if (value?.value !== "customRange") {
                  setCalenderClose()();
                }
              }}
            />
            {isCalenderOpen && (
              <DateRangePickerDropDown
                selectedDate={customDateRangeState}
                onApply={(value) => {
                  setCustomDateRangeState(value);
                  setCalenderClose()();
                }}
                onCancel={setCalenderClose()}
              />
            )}
          </div>
          <p className="mb-4 text-sm font-medium text-default-700">Birthday</p>

          <ScrollArea className="h-[180px]">
            <div className="space-y-2 pb-4">
              {monthOptions?.map((monthOption) => (
                <div
                  key={monthOption?.value}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    id={monthOption?.value}
                    checked={selectedMonthsState?.has(monthOption?.value)}
                    onCheckedChange={(value) => {
                      const newSelectedMonthsState = new Map(
                        selectedMonthsState,
                      );
                      if (value) {
                        newSelectedMonthsState.set(
                          monthOption?.value,
                          monthOption,
                        );
                      } else {
                        newSelectedMonthsState.delete(monthOption?.value);
                      }
                      setSelectedMonthsState(newSelectedMonthsState);
                    }}
                  />

                  <Label htmlFor={monthOption?.value} className="mb-0">
                    {monthOption?.label}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-3 bg-card pt-4">
        <Button fullWidth type="button" onClick={closeFilter} size="lg">
          Cancel
        </Button>

        <Button
          fullWidth
          color="primary"
          type="button"
          size="lg"
          disabled={!isSomeFilterSelected}
          onClick={() => {
            if (isSomeFilterApplied && isStateAndUrlSame) {
              onClear();
              closeFilter();
              return;
            }

            /* apply filters */
            onApply();
          }}
        >
          {isSomeFilterApplied && isStateAndUrlSame ? "Clear" : "Apply"}
        </Button>
      </div>
    </div>
  );
}

export default CustomerListFilterContent;
