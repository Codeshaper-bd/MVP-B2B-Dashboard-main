"use client";

import type { CheckedState } from "@radix-ui/react-checkbox";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

import { cn } from "@/lib/utils";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

export interface IPaymentMethodCheckboxProps {
  value?: "visa-card" | "master-card";
  onValueChange?: (value?: IPaymentMethodCheckboxProps["value"]) => void;
  onSetAsDefault?: (value?: IPaymentMethodCheckboxProps["value"]) => void;
  label?: string;
  error?: string;
  labelClassName?: string;
}

function PaymentMethodCheckbox({
  value,
  onValueChange,
  onSetAsDefault,
  label,
  error,
  labelClassName,
}: IPaymentMethodCheckboxProps) {
  const handleChecked = useCallback(
    ({
      onValueChange,
      value,
    }: Pick<IPaymentMethodCheckboxProps, "value" | "onValueChange">) =>
      (state: CheckedState) => {
        onValueChange?.(value);
      },
    [],
  );

  const handleSetAsDefault = useCallback(
    ({
      onSetAsDefault,
      value,
    }: Pick<IPaymentMethodCheckboxProps, "value" | "onSetAsDefault">) =>
      () => {
        onSetAsDefault?.(value);
      },
    [],
  );

  const handleStopPropagation = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
    },
    [],
  );

  return (
    <LabelErrorWrapper
      label={label}
      error={error}
      labelClassName={labelClassName}
    >
      <div className="w-full max-w-lg space-y-3">
        <label
          htmlFor="default-toggle"
          className={cn(
            "flex w-full rounded-xl border border-border p-4 transition-all duration-300 ease-linear",
            {
              "border-primary": value === "visa-card",
            },
          )}
        >
          <div className="flex flex-1 gap-3">
            <div>
              <Image
                src="/images/all-img/visa-card.png"
                width={50}
                height={50}
                alt=""
                className="h-8 w-12"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-default-700">
                Visa ending in 1234
              </h3>

              <p className="text-sm">Expiry 06/25</p>

              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  className="text-sm font-semibold text-default-600"
                  onClick={handleSetAsDefault({ value, onSetAsDefault })}
                  onPointerDown={handleStopPropagation}
                >
                  Set as default
                </button>

                <Link
                  href="#"
                  className="text-sm font-semibold text-default-700"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>

          <div className="flex-none">
            <CustomRadioGroup
              options={[
                {
                  value: "visa-card",
                  id: "visa-card",
                  radioProps: {
                    mode: "label-left",
                    ringColor: "success",
                  },
                  checked: value === "visa-card",
                  onChange: (e) => {
                    const selectedValue = e.target.value;
                    if (
                      selectedValue === "visa-card" ||
                      selectedValue === "master-card"
                    ) {
                      onValueChange?.(selectedValue);
                    }
                  },
                },
              ]}
            />
          </div>
        </label>

        <label
          htmlFor="default-toggle2"
          className={cn(
            "flex w-full rounded-xl border border-border p-4 transition-all duration-300 ease-linear",
            {
              "border-primary": value === "master-card",
            },
          )}
        >
          <div className="flex flex-1 gap-3">
            <div>
              <Image
                src="/assets/all/master-card.png"
                width={50}
                height={50}
                alt=""
                className="h-8 w-12"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-default-700">
                Mastercard ending in 1234
              </h3>

              <p className="text-sm">Expiry 06/26</p>

              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  className="text-sm font-semibold text-default-600"
                  onClick={handleSetAsDefault({ value, onSetAsDefault })}
                  onPointerDown={handleStopPropagation}
                >
                  Set as default
                </button>

                <Link
                  href="#"
                  className="text-sm font-semibold text-default-700"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>

          <div className="flex-none">
            <CustomRadioGroup
              options={[
                {
                  value: "master-card",
                  id: "master-card",
                  radioProps: {
                    mode: "label-left",
                    ringColor: "success",
                  },
                  checked: value === "master-card",
                  onChange: (e) => {
                    const selectedValue = e.target.value;
                    if (
                      selectedValue === "visa-card" ||
                      selectedValue === "master-card"
                    ) {
                      onValueChange?.(selectedValue);
                    }
                  },
                },
              ]}
            />
          </div>
        </label>
      </div>
    </LabelErrorWrapper>
  );
}

export default PaymentMethodCheckbox;
