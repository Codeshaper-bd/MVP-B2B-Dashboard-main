import RevenueOverTime from "@/components/modules/fennec-live/charts/RevenueOverTime";
import TotalEventRevenueChart from "@/components/modules/fennec-live/charts/TotalEventRevenueChart";
import LiveChallengesTable from "@/components/modules/fennec-live/tables/LiveChallengesTable";
import LivePromotionsTable from "@/components/modules/fennec-live/tables/LivePromotionsTable";

export default function Overview() {
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <TotalEventRevenueChart />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <RevenueOverTime />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <LiveChallengesTable />
        <LivePromotionsTable />
      </div>
    </>
  );
}
