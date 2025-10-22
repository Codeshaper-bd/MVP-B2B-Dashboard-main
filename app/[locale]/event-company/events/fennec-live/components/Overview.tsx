import { useFetchFennecLiveData } from "@/hooks/data-fetch/useFetchFennecLiveData";
import RevenueOverTime from "@/components/modules/fennec-live/charts/RevenueOverTime";
import TotalEventRevenueChart from "@/components/modules/fennec-live/charts/TotalEventRevenueChart";
import GuestCheckedTime from "@/components/modules/fennec-live/GuestCheckedTime";
import NonGuestListContent from "@/components/modules/fennec-live/non-guestlist-content";
import TotalEntryContent from "@/components/modules/fennec-live/total-entry-content";
import RenderData from "@/components/render-data";

export default function Overview() {
  const { getFennecLiveB2BApiState, getFennecLiveB2BData } =
    useFetchFennecLiveData();
  return (
    <RenderData
      data={getFennecLiveB2BData}
      expectedDataType="object"
      {...getFennecLiveB2BApiState}
    >
      <div className="space-y-6">
        <GuestCheckedTime
          startTime={getFennecLiveB2BData?.details?.startTime}
          endTime={getFennecLiveB2BData?.details?.checkInEnd}
        />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <TotalEventRevenueChart />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <RevenueOverTime />
          </div>
        </div>
        <TotalEntryContent tableClassName="lg:mt-0" />
        <NonGuestListContent />
      </div>
    </RenderData>
  );
}
