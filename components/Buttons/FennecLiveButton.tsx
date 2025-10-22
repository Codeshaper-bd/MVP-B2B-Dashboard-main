"use client";
import Link from "next/link";

import useIsEventCompany from "@/hooks/feature/useIsEventCompany";
import { Button } from "@/components/ui/button";

interface IFennecLiveButtonProps {
  className?: string;
  isShow?: boolean;
}
function FennecLiveButton({
  isShow = true,
  className,
}: IFennecLiveButtonProps) {
  const isEventCompany = useIsEventCompany();
  const fennecLiveURL = isEventCompany
    ? "/en/event-company/events/fennec-live"
    : "/en/events/fennec-live";
  if (isShow === false) {
    return null;
  }
  return (
    <Button color="primary" asChild fullWidth size="xl" className={className}>
      <Link href={fennecLiveURL}>Access Fennec Live</Link>
    </Button>
  );
}

export default FennecLiveButton;
