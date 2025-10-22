import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import TicketsList from "@/components/modules/ticket-tier/TicketsList";

function TicketTiers({
  eventId,
}: {
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
}) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-medium">Tickets Tier</h3>
      </div>
      <TicketsList eventId={eventId} isPastEvent />
    </div>
  );
}

export default TicketTiers;
