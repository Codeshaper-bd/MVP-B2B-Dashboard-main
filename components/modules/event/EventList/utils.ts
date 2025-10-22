import { convertToNumber } from "@/lib/data-types/number";
import type { TNullish } from "@/store/api/common-api-types";
import type {
  TEvent,
  TEventStatus,
  TEventType,
} from "@/store/api/events/events.types";
import type {
  TTicketTier,
  TTicketTierStatus,
} from "@/store/api/ticket-tier/ticket-tier.types";

const URL_PATHS = {
  EVENT_COMPANY: {
    PAST_EVENTS: "/en/event-company/events/past-events",
    UPCOMING_EVENTS: "/en/event-company/events/upcoming-events",
    HOST_EVENT: "/en/event-company/events/host-event",
  },
  REGULAR: {
    PAST_EVENTS: "/en/events/past-events",
    UPCOMING_EVENTS: "/en/events/upcoming-events",
    HOST_EVENT: "/en/events/host-event",
  },
};

interface IGenerateEventUrlProps {
  event: TEvent;
  eventCardType: TEventType | TNullish;
  isEventCompany: boolean;
}
export const generateEventUrl = ({
  event,
  eventCardType,
  isEventCompany,
}: IGenerateEventUrlProps) => {
  const slug = event?.details?.slug;
  if (!slug) {
    return "";
  }

  const isPublishedOrCancelled =
    event?.details?.status === "Published" ||
    event?.details?.status === "Cancelled";

  const basePaths = isEventCompany
    ? URL_PATHS.EVENT_COMPANY
    : URL_PATHS.REGULAR;

  switch (eventCardType) {
    case "past":
      return `${basePaths.PAST_EVENTS}/${slug}`;

    case "upcoming":
      if (isPublishedOrCancelled) {
        return `${basePaths.UPCOMING_EVENTS}/${slug}`;
      } else if (
        event?.details?.status === "Scheduled" ||
        event?.details?.status === "Draft"
      ) {
        return `${basePaths.HOST_EVENT}?eventSlug="${slug}"&currentStep=0`;
      }

      break;
    default:
      return `${basePaths.HOST_EVENT}?eventSlug="${slug}"&currentStep=0`;
  }
};

export const activeTicketTiersPrice = (ticketTiers: TTicketTier[]) => {
  if (!ticketTiers?.length) {
    return undefined;
  }

  const priorityOrder: TTicketTierStatus[] = ["Active", "Upcoming", "Ended"];

  const matchedTier = priorityOrder
    .map((status) => ticketTiers?.find((tier) => tier?.status === status))
    .find(Boolean);

  return matchedTier
    ? convertToNumber({ value: matchedTier?.price, digit: 2, fallback: 0 })
    : undefined;
};

export const statusColor: Record<TEventStatus | "fallback", string> = {
  Archived: "border-[#932F19] text-[#F7B27A] bg-[#511C10]",
  Draft: "border-[#333741] text-default-1000 bg-[#161B26]",
  Published: "border-[#085D3A] text-[#75E0A7] bg-[#053321]",
  fallback: "border-[#5c5d08] text-[#ffffff] bg-[#222222]",
  Scheduled: "border-[#5c5d08] text-[#ffffff] bg-[#222222]",
  Completed: "border-[#5c5d08] text-[#ffffff] bg-[#222222]",
  Cancelled: "border-[#5c5d08] text-[#ffffff] bg-[#222222]",
  Ended: "border-[#333741] text-[#CECFD2] bg-[#161B26]",
};
