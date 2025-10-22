"use client";
import { useState } from "react";

import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import { CopyInput } from "@/components/copy-input";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import LinkIcon from "@/components/icons/LinkIcon";
import ShareIcon from "@/components/icons/ShareIcon";
import EventShareDialog from "@/components/modules/event/modals/EventShareDialog";
import { Link } from "@/components/navigation";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface EventCreatedDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  getAnEventData: TEvent | TNullish;
  isEventCompany?: boolean;
}
function EventCreatedDialog({
  open,
  setOpen,
  getAnEventData,
  isEventCompany,
}: EventCreatedDialogProps) {
  const [shareOpen, setShareOpen] = useState(false);

  const backToEventsUrl = isEventCompany
    ? "/event-company/events/upcoming-events"
    : "/events/upcoming-events";

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <StatusAlert
        icon={<CheckCircleIcon className="size-6" />}
        title="Event Created Successfully!"
        description="Congratulations! Your event is now live and ready to attract attendees."
        maxWidth="400px"
        status="success"
        overlayClassName="bg-default-300"
      >
        <div className="space-y-6">
          <div className="grid w-full grid-cols-2 gap-3">
            <EventShareDialog
              open={shareOpen}
              getAnEventData={getAnEventData}
              setOpen={setShareOpen}
            />
            <Button
              onClick={() => setShareOpen(true)}
              size="lg"
              fullWidth
              className="rounded-[8px] bg-default-50"
              type="button"
            >
              <ShareIcon className="me-2 h-5 w-5 text-default-700" /> Share
            </Button>
            <Button
              size="lg"
              className="rounded-[8px]"
              fullWidth
              color="primary"
              type="button"
              asChild
            >
              <Link href={backToEventsUrl}>Back to Events</Link>
            </Button>
          </div>
          <CopyInput
            qrCode={getAnEventData?.details?.qr || ""}
            id="eventId"
            leftContent={<LinkIcon className="size-5" />}
            type="text"
            value={getAnEventData?.details?.displayShortURL}
            readOnly
            className="border !bg-default-50 py-2.5 ps-4"
            rightContentClass="bg-default-50"
          />
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default EventCreatedDialog;
