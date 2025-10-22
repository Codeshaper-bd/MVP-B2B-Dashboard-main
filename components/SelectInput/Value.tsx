import { forwardRef } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";

import type { IOption } from "./DropDown/Option";
import { useSelectInputContext } from "./SelectInputContext";

interface IValueProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

function ValueComponent<T extends IOption>(
  props: IValueProps,
  ref?: React.Ref<HTMLDivElement>,
) {
  const { isOpen } = useBooleanContext();
  const { value, searchLocation, options, customSelectedValue } =
    useSelectInputContext<T>();

  if (
    value === null ||
    value === undefined ||
    (searchLocation === "inside-trigger" && isOpen)
  ) {
    return null;
  }

  let valueContent: React.ReactNode = null;
  if (customSelectedValue) {
    valueContent = customSelectedValue;
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    valueContent = value?.label;
  } else if (typeof value === "string" || typeof value === "number") {
    const option = options?.find((option) => option.value === value);
    valueContent = option?.label;
  }

  return (
    <span className="line-clamp-1 overflow-hidden text-ellipsis text-left text-base font-normal leading-6 text-default-900">
      {valueContent}
    </span>
  );
}

const Value = forwardRef(ValueComponent) as <T extends IOption>(
  props: IValueProps & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

export default Value;
