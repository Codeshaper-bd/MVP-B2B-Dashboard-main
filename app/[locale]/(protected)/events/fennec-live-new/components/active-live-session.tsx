import Link from "next/link";

import InfoIcon from "@/components/icons/InfoIcon";
import LiveStreamingIcon from "@/components/icons/LiveStreamingIcon";
import BgRings from "@/components/ui/BgRings";
import { Button } from "@/components/ui/button";
import { TooltipComponent } from "@/components/ui/tooltip";

export default function ActiveLiveSessions() {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-default-900">
        Active Live Sessions
      </h2>
      <div className="mt-4 flex h-[454px] max-w-[415px] flex-col items-center justify-center overflow-hidden rounded-[20px] border border-dashed border-default-200">
        <BgRings className="flex size-12 items-center justify-center rounded-[10px] border border-default-100 bg-transparent text-white">
          <BgRings.Rings />

          <BgRings.Content>
            <div className="flex size-12 items-center justify-center rounded-[10px] border border-default-200">
              <LiveStreamingIcon className="size-6" />
            </div>
          </BgRings.Content>
        </BgRings>
        <div className="z-10 mx-auto mt-6 max-w-[262px] space-y-2">
          <h3 className="text-center text-base font-semibold text-default-1000">
            There are no active Fennec Live sessions
          </h3>
          <h4 className="text-center text-sm text-default-700">
            There are currently no live events running.
          </h4>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <Button className="flex cursor-pointer items-center rounded-[8px] bg-gradient-to-r from-[#E31B54] to-[#DD2590] !px-3.5">
            <Link
              className="flex items-center justify-center"
              href="/en/events/fennec-live-new/launch-fennec-live"
            >
              <span className="relative pl-5 before:absolute before:left-1 before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-full before:bg-current before:content-['']">
                Launch Fennec Live Manually
              </span>
              <TooltipComponent
                content="For hosting events in the short term (1-12 hours)"
                isArrow
                className="max-w-[180px] text-wrap text-center"
              >
                <InfoIcon className="ms-1 size-4" />
              </TooltipComponent>
            </Link>
          </Button>

          <Button color="primary" className="max-w-[144px] rounded-[8px]">
            <Link
              className="flex items-center justify-center"
              href="/en/events/host-event"
            >
              Host an Event
              <TooltipComponent
                content="For hosting events in the longer term that requires ticket sales and guestlist planning"
                isArrow
                className="max-w-[180px] text-wrap text-center"
                side="bottom"
              >
                <InfoIcon className="ms-1 size-4" />
              </TooltipComponent>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
