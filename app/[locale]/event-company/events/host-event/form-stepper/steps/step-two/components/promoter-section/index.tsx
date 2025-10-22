import { memo } from "react";
import { useFormContext } from "react-hook-form";

import CreatePromoterDialog from "@/components/modules/event/event-promoter/assign-promoter/create-promoter-dialog";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

import PromoterList from "./promoter-list";
import type { IStepFormInputs } from "../../../../type";
import { useEventStepperForm } from "../../../../useEventStepperForm";

function PromoterSection() {
  const { eventId } = useEventStepperForm();

  const {
    formState: { errors },
  } = useFormContext<IStepFormInputs>();

  return (
    <LabelErrorWrapper
      error={
        errors?.ticketing?.linkTracking?.root?.message ||
        errors?.ticketing?.linkTracking?.message ||
        errors?.ticketing?.linkTracking
          ?.map?.((e) => e?.id?.message)
          ?.filter(Boolean)
          ?.join(", ")
      }
    >
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-default-900">
            Event Promoter
          </h3>

          <CreatePromoterDialog eventId={eventId} />
        </div>

        <PromoterList eventId={eventId} />
      </div>
    </LabelErrorWrapper>
  );
}

export default memo(PromoterSection);
