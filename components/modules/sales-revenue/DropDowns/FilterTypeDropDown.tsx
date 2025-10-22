import { useCallback } from "react";

import FilterDropdown from "@/components/features/dropdown/filter-dropdown";
import FilterTypeOptions, {
  type IFilterTypeOptionsProps,
} from "@/components/features/dropdown/filter-dropdown/FilterTypeOptions";

import { useSalesRevenueFilterContext } from "../SalesRevenueFilterContext";
import type { ISalesRevenueFilterContextProps } from "../SalesRevenueFilterContext/types";

export type TFilterType = "overall" | "byEvent" | "compareEvents";
export type TFilterTypeOption = {
  value: TFilterType;
  label: string;
};
export const typeFilterOptions: TFilterTypeOption[] = [
  { value: "overall", label: "Overall" },
  { value: "byEvent", label: "By Event" },
  { value: "compareEvents", label: "Compare Events" },
];

type THandleSetCheckedItem = ({
  derived,
  dropdowns,
  modals,
  values,
}: ISalesRevenueFilterContextProps) => IFilterTypeOptionsProps<TFilterType>["setCheckedItem"];

function FilterTypeDropDown() {
  const filterContextValues = useSalesRevenueFilterContext();
  const { derived, dropdowns, values } = filterContextValues;

  const handleSetFilterType: THandleSetCheckedItem = useCallback(
    ({ dropdowns, modals, values }) =>
      (filterOption) => {
        // Set filter type & Set temp filter type
        values?.filterType?.set?.((prev) => {
          if (prev?.value === filterOption) {
            return prev;
          }

          // Reset to initial values
          if (filterOption === "overall") {
            values?.resetToInitialValues?.();
            values?.tempFilterType?.set?.(
              typeFilterOptions?.find(
                (option) => option.value === filterOption,
              ),
            );
            return typeFilterOptions?.find(
              (option) => option.value === filterOption,
            );
          }

          // Set temp filter type
          values?.tempFilterType?.set?.(prev);
          return typeFilterOptions?.find(
            (option) => option.value === filterOption,
          );
        });

        // Open modals
        // Open event select modal if filter option is byEvent and previous filter type is not byEvent
        modals?.eventSelect?.setIsOpen(
          filterOption === "byEvent" &&
            values?.filterType?.value?.value !== "byEvent",
        );
        // Open compare events modal if filter option is compareEvents
        modals?.compareEvents?.setIsOpen?.(
          filterOption === "compareEvents" &&
            values?.filterType?.value?.value !== "compareEvents",
        );

        dropdowns?.filterType?.setIsOpen?.(false);
      },
    [],
  );

  return (
    <FilterDropdown
      buttonContent={values?.filterType?.value?.label || "Filter"}
      isOpen={dropdowns?.filterType?.isOpen}
      setIsOpen={dropdowns?.filterType?.setIsOpen}
    >
      <FilterTypeOptions
        checkedItem={values?.filterType?.value?.value}
        setCheckedItem={handleSetFilterType(filterContextValues)}
        options={typeFilterOptions}
      />
    </FilterDropdown>
  );
}

export default FilterTypeDropDown;
