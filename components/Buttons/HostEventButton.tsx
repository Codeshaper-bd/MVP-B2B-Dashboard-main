"use client";
import Link from "next/link";

import useIsEventCompany from "@/hooks/feature/useIsEventCompany";
import { Button } from "@/components/ui/button";
interface IHostEventButtonProps {
  className?: string;
}
function HostEventButton({ className }: IHostEventButtonProps) {
  const isEventCompany = useIsEventCompany();
  return (
    <Button color="primary" size="md" asChild className={className}>
      <Link
        href={
          isEventCompany
            ? "/en/event-company/events/host-event"
            : "/en/events/host-event"
        }
      >
        Host an Event
      </Link>
    </Button>
  );
}

export default HostEventButton;
