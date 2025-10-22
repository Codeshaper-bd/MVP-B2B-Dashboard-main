import DailyCashReport from "./daily-cash-report";
import DayEndReport from "./day-end-report";

function EndOfDayReport() {
  return (
    <div className="space-y-[72px]">
      <DailyCashReport />
      <DayEndReport />
    </div>
  );
}

export default EndOfDayReport;
