import Image from "next/image";
import Link from "next/link";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TEvent } from "@/store/api/events/events.types";
import { CalendarIcon as CalendarIcon } from "@/components/icons";
import { LocationIcon as LocationIcon } from "@/components/icons";
import { usePathname } from "@/components/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export interface IEventCardProps {
  event: TEvent;
}
function EventCard({ event }: IEventCardProps) {
  const {
    details: { startTime, name, media, slug },
    venue: { address },
  } = event;
  const mediaImage = media?.[0]?.url;
  const pathName = usePathname().split("/").pop();

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <Link
          href={`./${pathName}/${slug}`}
          className="block h-[240px] w-full cursor-pointer"
        >
          <Image
            src={getImageFallback({ src: mediaImage })}
            alt={name}
            width={400}
            height={400}
            className="h-full w-full rounded-[12px] object-cover"
          />
        </Link>

        <div className="space-y-3">
          <CardTitle className="font-semibold hover:text-primary">
            <Link href={`./${pathName}/${slug}`}>{name}</Link>
          </CardTitle>
          <div className="flex items-center gap-2">
            <LocationIcon className="size-4" />{" "}
            <span className="text-sm font-medium text-default-600">
              {address}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-4" />
            <span className="text-sm font-medium text-default-600">
              {convertUTCToLocal({
                utcDateTime: startTime,
                format: "DD MMMM YYYY",
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EventCard;
