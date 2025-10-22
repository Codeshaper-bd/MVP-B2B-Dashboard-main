import Image from "next/image";

import { convertToNumber } from "@/lib/data-types/number";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TEventSummary } from "@/store/api/dashboard/dashboard.types";
import CalenderIcon from "@/components/icons/CalenderIcon";
import DollarIcon from "@/components/icons/DollarIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import { useRouter } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";

function EventCard({ item }: { item: TEventSummary }) {
  const router = useRouter();
  const { name, address, startTime, price, media, slug } = item;
  return (
    <Card
      className="group cursor-pointer overflow-hidden rounded-lg bg-secondary shadow-none hover:border-primary"
      onClick={() => router.push(`/events/upcoming-events/${slug}`)}
    >
      <CardContent className="overflow-hidden p-0">
        <div className="grid grid-cols-12 gap-4 lg:items-stretch">
          <div className="col-span-12 md:col-span-5">
            <div className="relative min-h-[200px] w-full md:min-h-full">
              <Image
                src={getImageFallback({ src: media?.url })}
                alt={name || "Event Image"}
                fill
                className="rounded-l-lg object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="col-span-12 flex flex-col px-4 py-4 md:col-span-7 lg:px-0 lg:pe-1">
            <h3 className="mb-4 text-base font-semibold text-default-900 group-hover:text-primary">
              {name}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <LocationIcon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-default-1000" />
                <span className="text-xs font-medium text-default-1000">
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CalenderIcon className="h-3.5 w-3.5 text-default-1000" />
                <span className="text-xs font-medium text-default-1000">
                  {convertUTCToLocal({
                    utcDateTime: startTime,
                    format: "DD MMM YYYY, h:mm A",
                  })}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <DollarIcon className="h-3.5 w-3.5 text-default-1000" />
                <span className="text-xs font-medium text-default-1000">
                  {convertToNumber({
                    value: price,
                    digit: 2,
                    fallback: 0,
                  }) || "N/A"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EventCard;
