import Image from "next/image";
import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import { cn } from "@/lib/utils";
import type { ERedemptionType } from "@/store/api/loyalty-program/loyalty-program.types";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import { PlusIcon as PlusIcon } from "@/components/icons";
import XIcon from "@/components/icons/X";
import { Button } from "@/components/ui/button";
import NumberInput from "@/components/ui/NumberInput";

import {
  initialLoyaltyFormValues,
  type TLoyaltyProgramFormInput,
} from "./utils";

function PointRedemptionsSettings() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useFormContext<TLoyaltyProgramFormInput>();

  const {
    fields: redemptionFields,
    append: appendRedemption,
    remove: removeRedemption,
  } = useFieldArray<TLoyaltyProgramFormInput>({
    control,
    name: "redemptionThresholds",
  });

  const redemptionType = useWatch({
    control,
    name: "redemptionType",
    defaultValue: initialLoyaltyFormValues.redemptionType,
  });

  const dollarValues = useWatch({
    control,
    name: "redemptionThresholds",
  });
  const isEnabled = watch("enabled") ?? false;

  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-default-900">
        Point Redemption Settings
      </h3>
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="mt-0.5">
            <CustomRadioGroup
              options={[
                {
                  value: "CONTINUOUS",
                  id: "CONTINUOUS",
                  radioProps: {
                    mode: "label-left",
                    textSize: "16px",
                  },
                  checked: redemptionType === "CONTINUOUS",
                  onChange: (e) => {
                    const value = e.target
                      .value as `${ERedemptionType.CONTINUOUS}`;

                    setValue("redemptionType", value);
                  },
                  disabled: !isEnabled,
                },
              ]}
            />
          </div>
          <label htmlFor="CONTINUOUS" className="block cursor-pointer">
            <h3 className="text-sm font-medium text-default-700">Continuous</h3>
            <p className="tex-default-600 text-sm">
              Users can redeem their points at any time, and the current
              dollar-based redemption system will apply.
            </p>
          </label>
        </div>
        <div className="flex gap-2">
          <div className="mt-0.5">
            <CustomRadioGroup
              options={[
                {
                  value: "THRESHOLD",
                  id: "THRESHOLD",
                  radioProps: {
                    mode: "label-left",
                    textSize: "16px",
                  },
                  checked: redemptionType === "THRESHOLD",
                  onChange: (e) => {
                    const value = e.target
                      .value as `${ERedemptionType.THRESHOLD}`;

                    setValue("redemptionType", value);
                    if (!redemptionFields.length) {
                      appendRedemption({
                        dollarValue: 0,
                        points: 0,
                      });
                    }
                  },
                  disabled: !isEnabled,
                },
              ]}
              value={redemptionType}
            />
          </div>
          <div>
            <label htmlFor="THRESHOLD" className="block cursor-pointer">
              <h3 className="text-sm font-medium text-default-700">
                After reaching a certain point
              </h3>
              <p className="tex-default-600 text-sm">
                Users will only be able to redeem their points once they have
                accumulated at least the defined number of points.
              </p>
            </label>

            {redemptionType === "THRESHOLD" && isEnabled && (
              <>
                {redemptionFields?.map((field, index) => (
                  <div key={field?.id}>
                    <div className="mt-3 flex flex-col gap-4 sm:flex-row">
                      <NumberInput
                        placeholder="Enter Point"
                        label="Point"
                        size="lg"
                        value={watch(`redemptionThresholds.${index}.points`)}
                        onChange={(value) => {
                          setValue(
                            `redemptionThresholds.${index}.points`,
                            Number(value),
                          );
                        }}
                        error={
                          errors.redemptionThresholds?.[index]?.points?.message
                        }
                        leftContent={
                          <Image
                            src="/images/all-img/noto_coin.png"
                            alt="point"
                            width={20}
                            height={20}
                            className="h-5 w-5"
                          />
                        }
                      />

                      <NumberInput
                        placeholder="Enter Point"
                        label="Dollar Value"
                        size="lg"
                        value={watch(
                          `redemptionThresholds.${index}.dollarValue`,
                        )}
                        onChange={(value) => {
                          setValue(
                            `redemptionThresholds.${index}.dollarValue`,
                            Number(value),
                          );
                        }}
                        error={
                          errors.redemptionThresholds?.[index]?.points?.message
                        }
                      />
                      <div className="sm:mt-[30px]">
                        <div className="relative h-12 w-fit overflow-hidden">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-default-1000">
                            ${dollarValues?.[index]?.dollarValue || ""}
                          </span>
                          <Image
                            src="/images/all-img/discount-frame.png"
                            alt="point"
                            width={82}
                            height={48}
                            className="h-full w-full"
                          />
                        </div>
                      </div>
                      <XIcon
                        className={cn(
                          "h-4 w-4 cursor-pointer text-default-700 hover:text-destructive sm:mt-11",
                          {
                            "cursor-not-allowed": redemptionFields?.length <= 1,
                          },
                        )}
                        onClick={() => {
                          if (redemptionFields?.length > 1) {
                            removeRedemption(index);
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  color="secondary"
                  className="mt-3"
                  onClick={() =>
                    appendRedemption({
                      dollarValue: 0,
                      points: 0,
                    })
                  }
                >
                  <PlusIcon className="size-4" /> Add
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointRedemptionsSettings;
