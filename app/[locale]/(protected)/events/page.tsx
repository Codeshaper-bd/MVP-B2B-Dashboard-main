"use client";
import { redirect } from "@/components/navigation";
function EventPage() {
  redirect("/events/upcoming-events");
  return null;
}

export default EventPage;
