"use client";
import { CheckIcon } from "lucide-react";

import { InfoIcon as InfoIcon } from "@/components/icons";
import LabelErrorWrapper, {
  type TLabelErrorWrapperProps,
} from "@/components/ui/LabelErrorWrapper";
import { TooltipComponent } from "@/components/ui/tooltip";

type THandleClick = (props: {
  option: string;
  onChange?: (value: string) => void;
}) => () => void;

const handleClick: THandleClick =
  ({ option, onChange }) =>
  () => {
    onChange?.(option);
  };

type TColorSelectProps = {
  value?: string | null;
  onChange?: (value: string) => void;
  options?: string[];
} & TLabelErrorWrapperProps;

function ColorSelect({
  onChange,
  options,
  value,
  ...labelErrorProps
}: TColorSelectProps) {
  return (
    <LabelErrorWrapper
      {...labelErrorProps}
      label={
        <div className="flex w-fit items-center gap-1.5 text-inherit">
          {labelErrorProps?.label}
          <TooltipComponent
            content={
              <div className="text-start">
                <h6 className="text-xs font-semibold leading-[18px] text-white">
                  What is the Occasion?
                </h6>

                <p className="text-xs font-medium leading-[18px] text-default-700">
                  Please select the occasion of the respective event that best
                  reflects the theme and reason for celebration.
                </p>
              </div>
            }
          >
            <InfoIcon className="size-4 text-white" />
          </TooltipComponent>
        </div>
      }
    >
      <div className="flex items-center gap-3">
        {options?.map((option) => (
          <div
            key={option}
            className="flex size-11 shrink-0 cursor-pointer items-center justify-center gap-3 rounded-full"
            style={{ backgroundColor: option || "transparent" }}
            onClick={handleClick({ option, onChange })}
          >
            {value === option && <CheckIcon className="size-4 text-white" />}
          </div>
        ))}
      </div>
    </LabelErrorWrapper>
  );
}

export default ColorSelect;
