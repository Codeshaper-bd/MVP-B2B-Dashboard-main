import { PhoneIcon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import CrossIcon from "@/components/icons/CrossIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { TNotificationFormInputs } from "./utils";

function PhoneNumberRepeater() {
  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = useFormContext<TNotificationFormInputs>();

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray<TNotificationFormInputs>({
    control,
    name: "phone_numbers",
  });

  return (
    <div className="space-y-4">
      {phoneFields.map((field, index) => (
        <div key={field?.id}>
          <div className="flex w-full gap-3">
            <div className="flex-1">
              <Input
                {...register(`phone_numbers.${index}.value`)}
                error={
                  errors.phone_numbers?.root?.message ||
                  errors.phone_numbers?.[index]?.value?.message
                }
                placeholder="Enter phone number"
                type="tel"
                leftContent={<PhoneIcon className="size-4 text-default-700" />}
                minLength={10}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-11"
              onClick={() => removePhone(index)}
            >
              <CrossIcon className="h-5 w-5 text-default-500" />
            </Button>
          </div>
        </div>
      ))}
      {errors?.phone_numbers && (
        <p className="text-sm font-medium text-destructive">
          {errors?.phone_numbers?.message}
        </p>
      )}
      <Button
        type="button"
        color="secondary"
        onClick={() => appendPhone({ value: "" })}
      >
        <PlusIcon className="h-5 w-5" /> Add
      </Button>
    </div>
  );
}

export default PhoneNumberRepeater;
