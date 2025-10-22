import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import { useGetAnEventQuery } from "@/store/api/events/events-api";
import EventTitleCard from "@/components/modules/event/EventTitleCard";
import RenderData from "@/components/render-data";
import EventTitleCardSkeleton from "@/components/skeleton/event-title-card-skeleton";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";

function EventTopCard({
  eventSlug,
}: {
  eventSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
}) {
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
          format: "MMMM D YYYY",
        })}
        filePath="/assets/all/event.png"
        className="mt-6"
      />
    </RenderData>
  );
}

export default EventTopCard;
