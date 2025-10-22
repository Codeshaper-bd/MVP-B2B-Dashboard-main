"use client";

import { memo } from "react";

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import EventInfo from "@/components/modules/event/event-info";
import RenderData from "@/components/render-data";
import EventInfoSkeleton from "@/components/skeleton/event-info-skeleton";
import { Card, CardContent } from "@/components/ui/card";

import UpcomingEventDetailsTab from "./UpcomingEventDetailsTab";
const MemoizedEventInfo = memo(EventInfo);

function PageContent() {
  const { getAnEventApiState, getAnEventData } = useFetchAnEventData();

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="grid grid-cols-12 gap-4 xl:gap-20">
          <div className="col-span-12 xl:col-span-4">
            <div className="sticky top-16">
              <RenderData
                data={getAnEventData}
                expectedDataType="object"
                {...getAnEventApiState}
                loadingSkeleton={<EventInfoSkeleton />}
              >
                <MemoizedEventInfo eventData={getAnEventData} />
              </RenderData>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-8">
            <UpcomingEventDetailsTab />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(PageContent);
