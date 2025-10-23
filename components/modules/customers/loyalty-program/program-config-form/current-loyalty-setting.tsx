"use client";

import { useFormContext } from "react-hook-form";

import CustomRadioGroup from "@/components/CustomRadioGroup";
import { DollarIcon as DollarIcon } from "@/components/icons";
import SelectInput from "@/components/SelectInput";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import NumberInput from "@/components/ui/NumberInput";

import {
  enabledOptions,
  rewardTypeOptions,
  type TLoyaltyProgramFormInput,
} from "./utils";

function CurrentLoyaltySetting() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TLoyaltyProgramFormInput>();
  const isEnabled = watch("enabled") ?? false;

  return (
    <div className="mt-6 space-y-6">
      <div className="flex flex-col justify-between gap-3 text-base text-default-700 sm:flex-row md:items-center">
        <p className="leading-6">Enable Loyalty Rewards</p>
        <CustomRadioGroup
          direction="row"
          options={enabledOptions}
          value={watch("enabled") ? "yes" : "no"}
          onChange={(e) => {
            setValue("enabled", e.target.value === "yes" ? true : false);
          }}
          error={errors?.enabled?.message}
        />
      </div>

      <div className="flex w-full flex-col gap-2 text-base text-default-700 md:flex-row md:items-center md:justify-between">
        <p className="leading-6">{"Points per ‘$’ Spent:"}</p>
        <div className="flex w-full max-w-[260px] flex-1 items-center gap-4">
          <div className="flex-1">
            <NumberInput
              id="pointsPerSpent"
              label=" Add Free Points"
              size="sm"
              value={watch("pointsPerSpent")}
              onChange={(value) => {
                setValue("pointsPerSpent", Number(value));
              }}
              error={errors.pointsPerSpent?.message}
              leftExtensionContent={
                <span className="h-10 border-e border-default-200 px-4 leading-10">
                  Points
                </span>
              }
              disabled={!isEnabled}
            />
          </div>
          <span className="mt-5 whitespace-nowrap">{"/ ‘$’ spent"}</span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 text-base text-default-700 md:flex-row md:items-center md:justify-between">
        <p className="leading-6">Redemption Options</p>

        <div className="w-full sm:w-[260px]">
          <SelectInput
            leftContent={
              watch("rewardType") === "DOLLAR" ? (
                <DollarIcon className="size-4 text-default-700" />
              ) : (
                <Icon
                  icon="hugeicons:promotion"
                  className="h-4 w-4 text-default-700"
                />
              )
            }
            options={rewardTypeOptions}
            value={watch("rewardType")}
            onChange={(value) => {
              if (value?.value) {
                setValue("rewardType", value?.value);
              }
            }}
            error={errors?.rewardType?.message}
            disabled={!isEnabled}
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 text-base text-default-700 md:flex-row md:justify-between">
        <Label htmlFor="rewardValue" className="mt-3 text-[16px] font-normal">
          Rewards ($)
        </Label>
        <div className="flex items-center gap-4 md:max-w-[260px]">
          <NumberInput
            id="rewardValue"
            label="Add Free Points"
            placeholder="Reward Value"
            className="text-base text-default-900"
            size="sm"
            value={watch("rewardValue")}
            onChange={(value) => {
              setValue("rewardValue", Number(value));
            }}
            error={errors?.rewardValue?.message}
            leftExtensionContent={
              <span className="flex h-10 flex-col justify-center border-e border-default-200 px-4">
                <DollarIcon className="size-4 text-default-700" />
              </span>
            }
            disabled={!isEnabled}
          />

          <span className="mt-6">/pts</span>
        </div>
      </div>
    </div>
  );
}

export default CurrentLoyaltySetting;
