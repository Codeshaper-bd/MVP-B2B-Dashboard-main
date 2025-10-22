import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import type { TNullish } from "@/store/api/common-api-types";
interface IGuestCheckedTimeProps {
  startTime: string | TNullish;
  endTime: string | TNullish;
}
function GuestCheckedTime({ startTime, endTime }: IGuestCheckedTimeProps) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:gap-7">
      <div className="space-y-4">
        <div className="space-y-2">
          <h2>Start Time</h2>
          <p>Earliest guests can be checked in.</p>
        </div>
        <div className="flex overflow-hidden rounded-[8px] border border-default-200">
          <div className="flex flex-1 items-center justify-between bg-default-50 px-3 py-2 text-[16px] font-medium">
            {convertUTCToLocal({
              utcDateTime: startTime,
              format: "HH:mm A",
            })}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h2>Check In End</h2>
          <p>Lates guest can be checked in.</p>
        </div>
        <div className="flex overflow-hidden rounded-[8px] border border-default-200">
          <div className="flex flex-1 items-center justify-between bg-default-50 px-3 py-2 text-[16px] font-medium">
            {convertUTCToLocal({
              utcDateTime: endTime,
              format: "HH:mm A",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestCheckedTime;
