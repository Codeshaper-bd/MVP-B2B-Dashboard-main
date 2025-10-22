"use client";
import { forwardRef, useId } from "react";

import Label, { type ICustomRadioLabelProps } from "./Label";
import RadioInput, { type TRadioInputElement } from "./RadioInput";

export interface IRadioProps extends TRadioInputElement {
  label?: React.ReactNode;
  labelClassName?: string;
  radioProps?: ICustomRadioLabelProps;
}

const Radio = forwardRef<HTMLInputElement, IRadioProps>(
  ({ label, id, radioProps, ...restProps }, ref) => {
    const radioId = useId();

    return (
      <div className="group">
        <RadioInput id={id || radioId} {...restProps} ref={ref} />

        <Label htmlFor={id || radioId} {...radioProps}>
          {label}
        </Label>
      </div>
    );
  },
);

Radio.displayName = "Radio";

export default Radio;
