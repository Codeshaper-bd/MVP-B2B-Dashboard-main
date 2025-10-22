import Image from "next/image";
import Link from "next/link";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";

function EventInfo({
  eventData,
  eventSlug,
}: {
  eventData: TEvent | TNullish;
  eventSlug: string | TNullish;
}) {
  const featuredImage =
    eventData?.details?.media?.find((item) => item.isFeatured) ||
    eventData?.details?.media?.[0];

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

      <div className="mb-6 mt-2 flex flex-wrap items-center gap-2 md:mt-6 2xl:gap-6">
        <Link
          className="inline-block text-wrap break-words rounded-lg bg-gradient-to-r from-[#e31b54] to-[#dd2590] px-4 py-3 text-sm font-semibold uppercase !leading-4 text-default-1000"
          href={`./${eventSlug}/details`}
          passHref
        >
          VIEW EVENT DAY Fennec Live DETAILS
        </Link>
      </div>
    </div>
  );
}

export default EventInfo;
