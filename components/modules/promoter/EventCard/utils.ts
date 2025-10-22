import type { TPromoterEvents } from "@/store/api/promoters/promoters.types";

interface IGetEventLink {
  details: TPromoterEvents["details"];
  isEventCompany?: boolean;
}
export function getEventLink({ details, isEventCompany }: IGetEventLink) {
  if (!details || !details.slug) {
    throw new Error("Event details or slug is missing");
  }

  let eventLink = "";

  const baseLink = isEventCompany ? "/en/event-company/events" : "/en/events";

  const eventType =
    details.status === "Published" ? "upcoming-events" : "past-events";
  eventLink = `${baseLink}/${eventType}/${details.slug}/view-event`;

  return eventLink;
}

export function getPromoterOverviewLink({
  details,
  promoterId,
  isEventCompany,
}: IGetEventLink & { promoterId?: string | number | null }) {
  if (!details || !details.slug) {
    throw new Error("Event details or slug is missing");
  }

  let promoterOverviewLink = "";
  const baseLink = isEventCompany ? "/en/event-company/events" : "/en/events";

  const eventType =
    details.status === "Published" ? "upcoming-events" : "past-events";
  promoterOverviewLink = `${baseLink}/${eventType}/${details.slug}/promoter-overview?promoterId=${promoterId}`;
  return promoterOverviewLink;
}
