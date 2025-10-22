import { cn } from "@/lib/utils";

import Radio, { type IRadioProps } from "./Radio";
import LabelErrorWrapper, {
  type TLabelErrorWrapperProps,
} from "../ui/LabelErrorWrapper";

export type TCustomRadioGroupProps = {
  options?: IRadioProps[];
  direction?: "row" | "column";
  className?: string;
  gap?:
    | "gap-0"
    | "gap-2"
    | "gap-3"
    | "gap-4"
    | "gap-5"
    | "gap-6"
    | "gap-7"
    | "gap-8"
    | "gap-9"
    | "gap-10"
    | "gap-11"
    | "gap-12"
    | "gap-14"
    | "gap-16"
    | "gap-20"
    | "gap-24"
    | "gap-28"
    | "gap-32"
    | "gap-36"
    | "gap-40"
    | "gap-44";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
} & Omit<TLabelErrorWrapperProps, "children">;

function CustomRadioGroup({
  label,
  labelClassName,
  fragmentWrapper,
  error,
  gap,
  className,
  options,
  direction = "row",
  onChange,
  value,
}: TCustomRadioGroupProps) {
  return (
    <div>
      <LabelErrorWrapper
        label={label}
        labelClassName={labelClassName}
        fragmentWrapper={fragmentWrapper}
        error={error}
      >
        <div
          className={cn(
            "gap-2",
            {
              "flex flex-col": direction === "column",
              "flex flex-row flex-wrap": direction === "row",
            },
            {
              "gap-0": gap === "gap-0",
              "gap-2": gap === "gap-2",
              "gap-3": gap === "gap-3",
              "gap-4": gap === "gap-4",
              "gap-5": gap === "gap-5",
              "gap-6": gap === "gap-6",
              "gap-7": gap === "gap-7",
              "gap-8": gap === "gap-8",
              "gap-9": gap === "gap-9",
              "gap-10": gap === "gap-10",
              "gap-11": gap === "gap-11",
              "gap-12": gap === "gap-12",
              "gap-14": gap === "gap-14",
              "gap-16": gap === "gap-16",
              "gap-20": gap === "gap-20",
              "gap-24": gap === "gap-24",
              "gap-28": gap === "gap-28",
              "gap-32": gap === "gap-32",
              "gap-36": gap === "gap-36",
              "gap-40": gap === "gap-40",
              "gap-44": gap === "gap-44",
            },
            className,
          )}
        >
          {options?.map((option, index) => (
            <div key={index}>
              <Radio
                // {...inputProps}
                {...{
                  ...option,
                  onChange: onChange ? onChange : option.onChange,
                  checked: value
                    ? String(value).toLowerCase() ===
                      String(option?.value).toLowerCase()
                    : option.checked,
                  ref: option.ref as React.Ref<HTMLInputElement>,
                }}
              />
            </div>
          ))}
        </div>
      </LabelErrorWrapper>
    </div>
  );
}

CustomRadioGroup.Radio = Radio;

export default CustomRadioGroup;
