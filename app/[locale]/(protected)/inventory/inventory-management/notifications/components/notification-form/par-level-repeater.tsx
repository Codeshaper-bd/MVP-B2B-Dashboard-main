import { useFieldArray, useFormContext } from "react-hook-form";

import { CrossIcon as CrossIcon } from "@/components/icons";
import { PlusIcon as PlusIcon } from "@/components/icons";
import QuestionIcon from "@/components/icons/QuestionIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { TNotificationFormInputs } from "./utils";

function ParLevelRepeater() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TNotificationFormInputs>();
  const {
    fields: thresholds,
    append: appendThreshold,
    remove: removeThreshold,
  } = useFieldArray<TNotificationFormInputs>({ control, name: "thresholds" });

  return (
    <div className="space-y-3">
      {thresholds?.map((field, index) => (
        <div key={index} className="flex gap-2">
          <Input
            type="number"
            className="h-fit py-0"
            rightContent={
              errors.thresholds?.root && (
                <QuestionIcon className="size-5 text-destructive" />
              )
            }
            rightExtensionContent={
              <span className="whitespace-nowrap border-s border-default-200 px-3 py-2 text-base text-default-600">
                Par-Level
              </span>
            }
            {...register(`thresholds.${index}.value`, { valueAsNumber: true })}
            defaultValue={field.value}
            error={errors.thresholds?.[index]?.value?.message}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-11"
            onClick={() => {
              if (index === thresholds.length - 1) {
                appendThreshold({ value: 0 });
              } else {
                removeThreshold(index);
              }
            }}
          >
            {index === thresholds.length - 1 ? (
              <PlusIcon className="size-6 text-default-500" />
            ) : (
              <CrossIcon className="size-6 text-default-500" />
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}

export default ParLevelRepeater;
