import Image from "next/image";
import { useState } from "react";

import useBooleanState from "@/hooks/useBooleanState";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import FennecLiveButton from "@/components/Buttons/FennecLiveButton";
import { CopyInput } from "@/components/copy-input";
import LinkIcon from "@/components/icons/LinkIcon";
import LockLockedIcon from "@/components/icons/LockLockedIcon";
import QrCodeIcon from "@/components/icons/QrCodeIcon";
import ButtonActiveCountdown from "@/components/modules/event/components/button-active-count-down";
import EventCancelDialog from "@/components/modules/event/modals/EventCancelDialog";
import ViewQrCodeModal from "@/components/qr-code-modal";
import { Button } from "@/components/ui/button";

import FennecLiveDialog from "./modals/fennec-live-dialog";

function EventInfo({ eventData }: { eventData: TEvent | TNullish }) {
  const [isCountdownPassed, setIsCountdownPassed] = useState(false);
  const eventStartTime = eventData?.details?.startTime;
  const featuredImage =
    eventData?.details?.media?.find((item) => item.isFeatured) ||
    eventData?.details?.media?.[0];
  const {
    state: isViewQrModalOpen,
    setState: setViewQrModalState,
    setOpen: setViewQrModalOpen,
  } = useBooleanState();
  return (
    <div>
      <Image
        src={getImageFallback({
          src: featuredImage?.url,
          fallbackImageSize: 500,
        })}
        alt={eventData?.details?.name || ""}
        width={500}
        height={300}
        className="h-[254px] w-full rounded-xl object-cover"
      />

      <h3 className="mb-1 mt-4 text-xl font-semibold leading-9 md:mb-2 md:text-3xl">
        {eventData?.details?.name}
      </h3>

      <p className="mb-2 flex items-center gap-2 text-lg text-default-700">
        {convertUTCToLocal({
          utcDateTime: eventData?.details?.startTime,
          format: "DD MMMM YYYY",
        })}
      </p>

      {!eventData?.details?.isFennecLive && (
        <div className="mb-6 mt-2 flex flex-wrap items-center gap-2 md:mt-6 2xl:gap-6">
          {isCountdownPassed ? (
            <FennecLiveDialog />
          ) : (
            <Button
              asChild
              color="secondary"
              disabled
              className="bg-[#61646C] hover:bg-[#61646C]"
            >
              <span className="flex items-center uppercase">
                <LockLockedIcon className="me-1.5 h-4 w-4 text-default-1000" />
                Fennec Live - NOT AVAILABLE
              </span>
            </Button>
          )}
          {eventData?.details?.status === "Published" && (
            <EventCancelDialog
              eventData={eventData}
              location="upcoming-events"
            />
          )}
        </div>
      )}

      <FennecLiveButton
        className="mb-6 mt-2 max-w-[240px]"
        isShow={eventData?.details?.isFennecLive}
      />

      {!isCountdownPassed && (
        <div className="mb-6">
          <ButtonActiveCountdown
            eventStartTime={eventStartTime ?? ""}
            onCountdownPassed={setIsCountdownPassed}
          />
        </div>
      )}
      <CopyInput
        label="Event Weblink"
        value={eventData?.details?.displayShortURL ?? ""}
        leftContent={<LinkIcon className="h-4 w-4" />}
        copySuccessMessage="Weblink copied to clipboard"
        copyErrorMessage="Failed to copy weblink"
      />
      <div className="h-6"></div>
      <Button onClick={setViewQrModalOpen()} color="secondary" className="h-10">
        <QrCodeIcon className="tex-default-700 me-1.5 size-5 cursor-pointer" />
        Display Weblink QR
      </Button>
      <ViewQrCodeModal
        open={isViewQrModalOpen}
        onOpenChange={setViewQrModalState}
        qrCode={eventData?.details?.qr ?? ""}
      />
    </div>
  );
}

export default EventInfo;
