import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import GuestCheckedTime from "@/components/modules/fennec-live/GuestCheckedTime";
import PastNonGuestListStat from "@/components/modules/fennec-live/PastNonGuestListStat";
import PastTotalEntryStat from "@/components/modules/fennec-live/PastTotalEntryStat";
import PastEventNonGuestListTable from "@/components/modules/fennec-live/tables/PastEventNonGuestListTable";
import RenderData from "@/components/render-data";

import GuestListTable from "../components/guest-list-table";

function GuestLists() {
  const { getAnEventData, getAnEventApiState } = useFetchAnEventData();

  return (
    <RenderData
      expectedDataType="object"
      data={getAnEventData}
      {...getAnEventApiState}
    >
      <GuestCheckedTime
        startTime={getAnEventData?.details?.startTime}
        endTime={getAnEventData?.details?.checkInEnd}
      />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <p className="mt-6 text-lg font-semibold text-default-1000">
            Total Entry Type
          </p>

          <PastTotalEntryStat eventSlug={getAnEventData?.details?.slug} />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <GuestListTable
            hideTitle
            hideDownloadButton
            tableClassName="xl:mt-0"
          />
        </div>
      </div>

      <div className="h-7"></div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <p className="mt-6 text-lg font-semibold text-default-1000">
            Non-GL Entries
          </p>
          <PastNonGuestListStat eventSlug={getAnEventData?.details?.slug} />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <PastEventNonGuestListTable
            eventSlug={getAnEventData?.details?.slug}
          />
        </div>
      </div>
    </RenderData>
  );
}

export default GuestLists;
