import Image from "next/image";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import { InfoIcon as InfoIcon } from "@/components/icons";
import { PlusIcon as PlusIcon } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface HeroAreaProps {
  getAnEventData: TEvent | TNullish;
}
function HeroArea({ getAnEventData }: HeroAreaProps) {
  if (!getAnEventData) {
    return null;
  }
  const {
    details: { media, name, startTime, endTime } = {},
    venue: { name: venueName } = {},
  } = getAnEventData || {};

  const featuredImage = media?.find((item) => item.isFeatured) || media?.[0];

  return (
    <div className="relative h-[500px] w-full px-4 before:absolute before:start-0 before:top-0 before:z-10 before:size-full before:bg-black/60">
      <Image
        src={getImageFallback({
          src: featuredImage?.url,
          fallbackImageSize: 500,
        })}
        alt="Hero"
        fill
        className="blur-md"
      />
      <div className="relative z-50 pt-12">
        <div className="flex items-center justify-between">
          <ChevronLeftIcon className="size-5 rotate-180 text-default-1000" />
          <div className="relative flex flex-col items-center gap-1">
            <InfoIcon className="absolute end-0 top-0 size-4 text-yellow-400" />
            <Image
              src="/assets/all/noto-logo.png"
              alt="noto"
              width={48}
              height={48}
              className="size-12"
            />
            <p className="text-[15px] font-medium text-default-1000">
              4500 Points
            </p>
          </div>
        </div>
        {/* image */}
        <div className="-mt-5 flex flex-col items-center">
          <div className="h-[165px] w-[150px]">
            <Image
              src={getImageFallback({
                src: featuredImage?.url,
                fallbackImageSize: 500,
              })}
              width={150}
              height={165}
              alt="Ghost"
              className="size-full rounded-xl object-cover"
            />
          </div>
          <div className="mt-5 max-w-[290px] text-center">
            <h2 className="text-lg font-medium text-default-1000">{name}</h2>
            <p className="mt-1 flex flex-wrap justify-center gap-1 text-xs text-default-700">
              <span>
                {convertUTCToLocal({
                  utcDateTime: startTime,
                })}
              </span>
              <span>
                {convertUTCToLocal({
                  utcDateTime: startTime,
                  format: "hh:mm A",
                })}
              </span>
              <span>-</span>
              <span>
                {convertUTCToLocal({
                  utcDateTime: endTime,
                  format: "hh:mm A",
                })}
              </span>
              {venueName}
            </p>
            {!getAnEventData?.details?.hideGuestlist && (
              <div className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-black/20">
                <div className="-space-x-0.5">
                  <Avatar className="size-7 ring-2 ring-default-1000 hover:ring-2 hover:ring-default-1000">
                    <AvatarImage src="/assets/avatar/avatar-1.png" />
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <Avatar className="size-7 ring-2 ring-default-1000 hover:ring-2 hover:ring-default-1000">
                    <AvatarImage src="/assets/avatar/avatar-4.png" />
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <Avatar className="size-7 ring-2 ring-default-1000 hover:ring-2 hover:ring-default-1000">
                    <AvatarImage src="/assets/avatar/avatar-3.png" />
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-xs text-default-800">
                  James and 120k others
                </h3>
              </div>
            )}
            <div className="mt-3 flex justify-center">
              <Button
                type="button"
                rounded="full"
                color="primary"
                variant="outline"
                className="group"
              >
                <span className="me-1.5 grid size-5 place-content-center rounded-full bg-primary/20 group-hover:bg-destructive/50">
                  <PlusIcon className="size-4" />
                </span>
                Invite Friends
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroArea;
