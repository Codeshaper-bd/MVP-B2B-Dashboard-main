import dayjs from "dayjs";
import React, { forwardRef } from "react";
import { Controller, useForm } from "react-hook-form";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { useUpdateAnEventMutation } from "@/store/api/events/events-api";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import InputCounter from "@/components/ui/InputCounter2";
import { useToast } from "@/components/ui/use-toast";

import type { IAnEventTimeExtendFormProps, TAnEventTimeForm } from "./types";
import { initialEventAddTimeValues } from "./utils";

const AnEventTimeExtendForm = forwardRef<
  HTMLButtonElement,
  IAnEventTimeExtendFormProps
>(({ eventSummery, setIsSubmitting }, ref) => {
  // update api
  const [updateAnEvent] = useUpdateAnEventMutation();
  const { toast } = useToast();
  const { setClose } = useDialogContext();
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<TAnEventTimeForm>({
    defaultValues: initialEventAddTimeValues,
  });
  const countValues = watch("eventNumber");
  // api data - work directly with UTC datetime string
  const endDayJs = dayjs.utc(eventSummery?.endTime).local();

  const getExtendedTimeDisplay = (minutes: number) => {
    const extendedTime = endDayJs.add(minutes, "minute");
    const isSameDay = extendedTime.isSame(endDayJs, "day");
    return isSameDay
      ? extendedTime.format("hh:mm A")
      : extendedTime.format("MMM DD, YYYY hh:mm A");
  };

  const onSubmit = async (data: TAnEventTimeForm) => {
    const toastId = toast({
      variant: "loading",
      title: "Extending Event Time",
      description: "Please wait while we extend your event time",
    });
    try {
      setIsSubmitting?.(true);
      const updatedEndTime = endDayJs.add(data?.eventNumber, "minute");
      // update api
      await updateAnEvent({
        slug: eventSummery?.slug || "-1",
        body: {
          endTime: updatedEndTime.toISOString(),
        },
      }).unwrap();
      setIsSubmitting?.(false);
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Event Time Extended",
        description: "You have successfully extended your event time",
      });
      setClose?.();
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Error Extending Event Time",
          description: "An error occurred while extending event time",
        }),
      });
      setIsSubmitting?.(false);
      setClose?.();
    }
  };

  return (
    <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="eventNumber"
        render={({ field: { onChange, value }, field }) => (
          <InputCounter
            {...field}
            label=""
            required
            min={0}
            step={5}
            error={errors?.eventNumber?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <div className="mt-4 text-[16px]">
        The event will be extended until:
        <span className="ms-2 font-medium text-default-1000">
          {getExtendedTimeDisplay(countValues)}
        </span>
      </div>
      <button type="submit" hidden ref={ref} />
    </form>
  );
});
AnEventTimeExtendForm.displayName = "AnEventTimeExtendForm";
export default AnEventTimeExtendForm;
