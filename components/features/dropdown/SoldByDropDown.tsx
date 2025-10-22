import useBooleanState from "@/hooks/useBooleanState";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import type {
  TGetAllInventoryItemArgs,
  TSoldBy,
} from "@/store/api/inventory-item/inventory-item.types";
import FilterDropdown from "@/components/features/dropdown/filter-dropdown";
import FilterTypeOptions from "@/components/features/dropdown/filter-dropdown/FilterTypeOptions";

type TSoldByOption = "ALL" | TSoldBy;
type TFilterOption = {
  value: TSoldByOption;
  label: string;
};

const filterOptions: TFilterOption[] = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Volume",
    value: "VOLUME",
  },
  {
    label: "Unit",
    value: "UNIT",
  },
];

function SoldByDropDown() {
  const { state: isOpen, setState: setIsOpen } = useBooleanState();
  const { updateAParam, getAParamValue } =
    useManageSearchParams<
      Exclude<TGetAllInventoryItemArgs, void | undefined>
    >();
  const soldBy: TSoldByOption = getAParamValue("soldBy") || "ALL";
  const selectedOption: TFilterOption | undefined = filterOptions.find(
    (option) => option.value === soldBy,
  );

  return (
    <FilterDropdown
      buttonContent={selectedOption?.label || "Filter"}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <FilterTypeOptions
        options={filterOptions}
        checkedItem={soldBy}
        setCheckedItem={(value) => {
          updateAParam({
            key: "soldBy",
            value: value === "ALL" ? undefined : value,
          });
          setIsOpen(false);
        }}
      />
    </FilterDropdown>
  );
}

export default SoldByDropDown;
