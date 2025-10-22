import BarRevenue from "@/components/modules/fennec-live/charts/BarRevenue";
import BarStatistics from "@/components/modules/fennec-live/charts/BarStatistics";

function Bar() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-7 2xl:col-span-8">
        <BarRevenue />
      </div>

      <div className="col-span-12 lg:col-span-5 2xl:col-span-4">
        <BarStatistics />
      </div>
    </div>
  );
}

export default Bar;
