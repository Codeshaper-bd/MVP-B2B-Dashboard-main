"use client";
import { redirect } from "@/components/navigation";
function EventPage() {
  redirect("/event-company/events/upcoming-events");
  return null;
}

export default EventPage;
