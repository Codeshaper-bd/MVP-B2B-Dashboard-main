import { useFieldArray, useFormContext } from "react-hook-form";

import CrossIcon from "@/components/icons/CrossIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { TNotificationFormInputs } from "./utils";

function EmailRepeater() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TNotificationFormInputs>();

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray<TNotificationFormInputs>({ control, name: "emails" });

  return (
    <div className="w-full space-y-4">
      {emailFields.map((field, index) => (
        <div key={field?.id} className="flex w-full gap-3">
          <div className="flex-1">
            <Input
              placeholder="Enter email"
              leftContent={<EmailIcon className="h-5 w-5" />}
              type="email"
              {...register(`emails.${index}.value`)}
              error={
                errors.emails?.root?.message ||
                errors.emails?.[index]?.value?.message
              }
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-11"
            onClick={() => removeEmail(index)}
          >
            <CrossIcon className="size-5 text-default-500" />
          </Button>
        </div>
      ))}

      {errors?.emails && (
        <p className="text-sm font-medium text-destructive">
          {errors?.emails?.message}
        </p>
      )}

      <Button
        type="button"
        color="secondary"
        onClick={() => appendEmail({ value: "" })}
      >
        <PlusIcon className="me-1 h-5 w-5" /> Add
      </Button>
    </div>
  );
}

export default EmailRepeater;
