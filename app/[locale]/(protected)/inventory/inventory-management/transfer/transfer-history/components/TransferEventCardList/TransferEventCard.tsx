import Image from "next/image";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent, TGetAllEventArgs } from "@/store/api/events/events.types";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";

interface ITransferEventCardProps {
  getAnEvent: TEvent | TNullish;
}
function TransferEventCard({ getAnEvent }: ITransferEventCardProps) {
  const { getAllParamValue, updateAParam } =
    useManageSearchParams<
      Exclude<TGetAllEventArgs & { eventSlug: string }, void>
    >();
  const { eventSlug } = getAllParamValue();
  const isSameEventSlug = eventSlug === getAnEvent?.details?.slug;
  return (
    <Card
      onClick={() =>
        updateAParam({
          key: "eventSlug",
          value: isSameEventSlug ? undefined : getAnEvent?.details?.slug,
        })
      }
      className={cn("cursor-pointer", {
        "border border-primary": isSameEventSlug,
      })}
    >
      <CardContent className="p-4">
        <div className="mb-4 h-[180px] w-full">
          <Image
            src={getImageFallback({
              src: getAnEvent?.details?.media?.[0]?.url,
              fallbackImageSize: 300,
            })}
            alt="event image"
            width={400}
            height={180}
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
        <h3 className="text-base font-medium text-default-900">
          {getAnEvent?.details?.name}
        </h3>
        <ul className="mt-3 space-y-2">
          <li className="flex items-center gap-2">
            <CalenderIcon className="h-3.5 w-3.5 text-default-1000" />
            <span className="text-xs font-medium text-default-700">
              {convertUTCToLocal({
                utcDateTime: getAnEvent?.details?.startTime,
                format: "DD MMM YYYY, h:mm A",
              })}
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default TransferEventCard;
