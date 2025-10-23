import { useFormContext } from "react-hook-form";

import { DatabaseIcon as DataBaseIcon } from "@/components/icons";
import SelectInput from "@/components/SelectInput";
import NumberInput from "@/components/ui/NumberInput";

import { streakOptions, type TLoyaltyProgramFormInput } from "./utils";

function PointStreaks() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<TLoyaltyProgramFormInput>();
  const isEnabled = watch("enabled") ?? false;

  return (
    <div className="mt-6 flex max-w-[760px] flex-col items-center gap-6 md:mt-0 md:flex-row md:items-end md:justify-between">
      <div className="flex w-full flex-col-reverse items-start gap-2 sm:flex-row md:w-auto md:items-end">
        <NumberInput
          id="streakValue"
          label=" Add Free Points"
          className="w-full md:w-28"
          size="md"
          placeholder="120"
          value={watch("streakValue")}
          onChange={(value) => {
            setValue("streakValue", Number(value));
          }}
          error={errors.streakValue?.message}
          disabled={!isEnabled}
        />

        <SelectInput
          options={streakOptions}
          value={watch("streakType")}
          onChange={(value) => {
            if (value?.value) {
              setValue("streakType", value?.value);
            }
          }}
          error={errors?.streakType?.message}
          disabled={!isEnabled}
        />
        <div className="mt-2.5 block md:hidden">streak</div>
      </div>

      <div className="mt-2.5 hidden md:block md:pb-4">streak</div>

      <div className="flex w-full flex-row-reverse gap-4 sm:flex-row md:w-auto">
        <NumberInput
          id="pointReward"
          className="w-full md:max-w-[182px]"
          placeholder="Points"
          leftContent={<DataBaseIcon className="h-5 w-5" />}
          value={watch("streakReward")}
          onChange={(value) => {
            setValue("streakReward", Number(value));
          }}
          error={errors.streakReward?.message}
          disabled={!isEnabled}
        />
        <span className="mt-2.5 block">Point Rewards</span>
      </div>
    </div>
  );
}

export default PointStreaks;
