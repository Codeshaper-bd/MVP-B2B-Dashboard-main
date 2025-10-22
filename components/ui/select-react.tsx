"use client";
import React from "react";
import ReactSelect, {
  type CSSObjectWithLabel,
  type OptionProps,
  type Props,
  type StylesConfig,
  components,
} from "react-select";

import { getStatusColors } from "@/lib/get-status-colors";
import CheckIcon from "@/components/icons/CheckIcon";

interface ControlProps {
  isDisabled?: boolean;
  isFocused?: boolean;
  menuIsOpen?: boolean;
}
interface OptionPropsStatus {
  isSelected?: boolean;
  isFocused?: boolean;
}

export const selectStyles: StylesConfig = {
  option: (provided, state: OptionPropsStatus) => ({
    ...provided,
    fontSize: "16px",
    color: "hsl(var(--default-1000))",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    cursor: "pointer",
    borderRadius: 6,
    marginTop: 1,
    marginBottom: 1,
    transition: "all .3s ease",
    backgroundColor: state.isSelected
      ? "hsl(var(--default-100))"
      : "hsl(var(--default-50))",
    "&:hover": {
      backgroundColor: "hsl(var(--default-100))",
    },
  }),
  control: (provided, state: ControlProps) => ({
    display: "flex",
    alignItems: "center",
    minHeight: 44,
    position: "relative",
    backgroundColor: state?.isDisabled ? "" : "hsl(var(--default))",
    opacity: state?.isDisabled ? ".5" : "",
    borderRadius: 8,
    border: "1px solid",
    borderColor: state?.isDisabled
      ? "rgb(var(--gray-100))"
      : state?.isFocused
        ? "hsl(var(--primary))"
        : "hsl(var(--default-200))",
    boxShadow: state?.isFocused
      ? "0px 0px 0px 4px rgba(255, 200, 51, 0.2)"
      : "0 0 #0000",
    transition: "all .3s ease",
    color: "hsl(var(--default-600))",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided, state: OptionPropsStatus) => ({
    ...provided,
    color: "hsl(var(--default-600))",
    paddingRight: 16,
    "&:hover": {
      color: "hsl(var(--default-1000))",
    },
  }),
  clearIndicator: (provided: CSSObjectWithLabel, state: OptionPropsStatus) => ({
    ...provided,
    color: state?.isFocused ? "rgb(var(--accent-500))" : "rgb(var(--gray-500))",
    padding: 0,
    cursor: "pointer",
    "&:hover": {
      color: "rgb(var(--accent-500))",
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: 8,
    padding: 6,
    margin: 0,
    backgroundColor: "hsl(var(--default-50))",
    boxShadow: "0 16px 32px 0px rgba(30, 25, 29, 0.1)",
    animation: state?.selectProps?.menuIsOpen
      ? "fadeIn 150ms"
      : "fadeOut 150ms",
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingLeft: 16,
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "16px",
    color: "hsl(var(--default-1000))",
  }),
  input: (provided) => ({
    ...provided,
    fontSize: "16px",
    color: "hsl(var(--default-1000))",
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "16px",
    color: "#85888E",
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    fontSize: "16px",
    color: "hsl(var(--default-900))",
  }),
};

const SelectReact = React.forwardRef<HTMLSelectElement, Props>(
  ({ ...props }, ref) => {
    function CustomOption(props: OptionProps) {
      const { label, isSelected } = props;
      return (
        <components.Option {...props}>
          <div className="flex items-center justify-between gap-2">
            {label}
            {isSelected ? <CheckIcon className="h-5 w-5 text-primary" /> : ""}
          </div>
        </components.Option>
      );
    }

    return (
      <ReactSelect
        {...props}
        styles={selectStyles}
        components={{ Option: CustomOption }}
        menuPlacement="auto"
        classNames={{
          multiValue: () => "!bg-transparent !m-0",
          multiValueLabel: (props: any) =>
            `${getStatusColors(props.data.value)} !border !cursor-pointer !px-[8px] !py-[2px] !rounded-full mx-0.5`,
          multiValueRemove: () => "!hidden",
        }}
        ref={ref as any}
      />
    );
  },
);

SelectReact.displayName = "SelectReact";

export { SelectReact };
