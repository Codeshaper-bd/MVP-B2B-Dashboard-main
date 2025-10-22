import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetAnEventQuery } from "@/store/api/events/events-api";
import EventTitleCard from "@/components/modules/event/EventTitleCard";
import RenderData from "@/components/render-data";
import EventTitleCardSkeleton from "@/components/skeleton/event-title-card-skeleton";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";

type TPageParams = Params & {
  locale: string;
  eventSlug: string;
};

function TopCard() {
  const { eventSlug } = useParams<TPageParams>();

  const isProbableValidSlugFound = checkIsValidId(eventSlug, {
    type: "string",
  });
  const { data: getAnEventRes, ...getAnEventApiState } = useGetAnEventQuery(
    {
      slug: eventSlug,
    },
    {
      skip: !isProbableValidSlugFound,
    },
  );
  const getAnEventData = getAnEventRes?.data;

  return (
    <RenderData
      expectedDataType="object"
      data={getAnEventData}
      {...getAnEventApiState}
      loadingSkeleton={
        <SkeletonWrapper size={1}>
          <EventTitleCardSkeleton />
        </SkeletonWrapper>
      }
    >
      <EventTitleCard
        title={getAnEventData?.details?.name || ""}
        date={convertUTCToLocal({
          utcDateTime: getAnEventData?.details?.startTime,
        })}
        filePath="/assets/all/event.png"
      />
    </RenderData>
  );
}

export default TopCard;
