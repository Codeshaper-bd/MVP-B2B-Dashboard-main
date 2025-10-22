import type { TUseFetchEmployeePerformanceDataArgs } from "@/hooks/data-fetch/useFetchEmployeePerformanceData";
import { getTimeAgo } from "@/lib/date-time/get-time-ago";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function BartendarCard({ employeeData }: TUseFetchEmployeePerformanceDataArgs) {
  const barTender = employeeData?.performanceMetrics?.barTender;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bartender Role</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 text-default-700">
          <li className="flex justify-between">
            <span>Total Drinks Served: </span>
            <span>
              <strong className="text-default-1000">
                {barTender?.totalDrinksServed || 0}
              </strong>{" "}
              drinks
            </span>
          </li>
          <li className="flex justify-between">
            <span>Most Popular Drink : </span>
            <span>
              <strong className="text-default-1000">
                {barTender?.mostPopularDrink || "N/A"}
              </strong>
            </span>
          </li>
          <li className="flex justify-between">
            <span>Last Drink Served :</span>
            <strong className="text-default-1000">
              {getTimeAgo({
                inputDate: barTender?.lastDrinkServed,
              })}
            </strong>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default BartendarCard;
