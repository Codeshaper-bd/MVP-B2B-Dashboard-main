import { TriangleAlert } from "lucide-react";
import { memo } from "react";
import { useFormContext } from "react-hook-form";

import CreateTierDialog from "@/components/modules/ticket-tier/modals/create-tier-dialog";
import TicketsList from "@/components/modules/ticket-tier/TicketsList";
import { Alert, AlertDescription } from "@/components/ui/alert";
import InfoCard from "@/components/ui/info-card";

import type { IStepFormInputs } from "../../../type";
import { useEventStepperForm } from "../../../useEventStepperForm";

function TicketSection() {
  const { getAnEventData } = useEventStepperForm();
  const eventId = getAnEventData?.details?.id;

  const formProps = useFormContext<IStepFormInputs>();
  const {
    formState: { errors },
  } = formProps;

  const ticketTierError =
    errors?.ticketing?.ticketTier?.root?.message ||
    errors?.ticketing?.ticketTier?.message ||
    (errors?.ticketing?.ticketTier as { id?: { message?: string } }[])
      ?.map((tier) => tier?.id?.message)
      ?.filter(Boolean)
      ?.join(", ");
  const hasTicketTier = (getAnEventData?.ticketTiers?.length ?? 0) > 0;
  return (
    <div>
      <div className="flex justify-between">
        <h3>Ticket Tiers</h3>

        <CreateTierDialog eventId={eventId} />
      </div>
      {ticketTierError && !hasTicketTier && (
        <div className="mt-4">
          <Alert color="destructive" variant="soft">
            <AlertDescription>
              <InfoCard
                title={ticketTierError}
                icon={<TriangleAlert className="h-5 w-5" />}
                color="destructive"
              />
            </AlertDescription>
          </Alert>
        </div>
      )}

      <TicketsList eventId={eventId} isShowBadge={false} />
    </div>
  );
}

export default memo(TicketSection);
