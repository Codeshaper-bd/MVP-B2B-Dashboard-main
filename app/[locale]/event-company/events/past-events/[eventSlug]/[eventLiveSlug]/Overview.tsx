import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import PastRevenueOverTime from "@/components/modules/fennec-live/charts/PastRevenueOverTime";
import PastTotalEventRevenue from "@/components/modules/fennec-live/charts/PastTotalEventRevenue";
import GuestCheckedTime from "@/components/modules/fennec-live/GuestCheckedTime";
import PastNonGuestListStat from "@/components/modules/fennec-live/PastNonGuestListStat";
import PastTotalEntryStat from "@/components/modules/fennec-live/PastTotalEntryStat";
import PastEventGuestListTable from "@/components/modules/fennec-live/tables/PastEventGuestListTable";
import PastEventNonGuestListTable from "@/components/modules/fennec-live/tables/PastEventNonGuestListTable";
import RenderData from "@/components/render-data";

export default function Overview() {
  const { eventSlug, getAnEventApiState, getAnEventData } =
    useFetchAnEventData();

  return (
    <RenderData
      data={getAnEventData}
      expectedDataType="object"
      {...getAnEventApiState}
    >
      <div className="space-y-6">
        <GuestCheckedTime
          startTime={getAnEventData?.details?.startTime}
          endTime={getAnEventData?.details?.checkInEnd}
        />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <PastTotalEventRevenue eventSlug={eventSlug} />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <PastRevenueOverTime eventSlug={eventSlug} />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <p className="mt-6 text-lg font-semibold text-default-1000">
              Total Entry Type
            </p>

            <PastTotalEntryStat eventSlug={getAnEventData?.details?.slug} />
          </div>

          <div className="col-span-12 lg:col-span-8">
            <PastEventGuestListTable
              hideTitle
              hideDownloadButton
              tableClassName="xl:mt-0"
            />
          </div>
        </div>

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
      </div>
    </RenderData>
  );
}
