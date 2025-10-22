import type { TUseFetchEmployeePerformanceDataArgs } from "@/hooks/data-fetch/useFetchEmployeePerformanceData";
import { getTimeAgo } from "@/lib/date-time/get-time-ago";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function GuestlistCard({ employeeData }: TUseFetchEmployeePerformanceDataArgs) {
  const guestList = employeeData?.performanceMetrics?.guestList;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Guestlist Role</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 text-default-700">
          <li className="flex justify-between">
            <span>Total Tickets Scanned: </span>
            <span>
              <strong className="text-default-1000">
                {guestList?.totalTicketsScanned || 0}{" "}
              </strong>
              tickets
            </span>
          </li>
          <li className="flex justify-between">
            <span>Last Ticket Scanned:</span>
            <strong className="text-default-1000">
              {getTimeAgo({
                inputDate: guestList?.lastTicketScanned,
              })}
            </strong>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default GuestlistCard;
