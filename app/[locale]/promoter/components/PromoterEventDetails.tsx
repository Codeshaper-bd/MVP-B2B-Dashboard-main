"use client";
import { memo, Suspense, lazy } from "react";

import Loader from "@/components/loader/loader";
import { Separator } from "@/components/ui/separator";

import EventsInfo from "./events-info";

// Lazy load components
const EventCoordination = lazy(() => import("./event-coordination"));
const GuestsListTable = lazy(() => import("./guests-list"));
const PrivateGuestList = lazy(() => import("./private-guestlist"));

function PromoterEventDetails() {
  return (
    <div className="space-y-8">
      <EventsInfo />
      <Separator className="bg-default-200" />
      <Suspense fallback={<Loader />}>
        <EventCoordination />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <GuestsListTable />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <PrivateGuestList />
      </Suspense>
    </div>
  );
}

export default memo(PromoterEventDetails);
