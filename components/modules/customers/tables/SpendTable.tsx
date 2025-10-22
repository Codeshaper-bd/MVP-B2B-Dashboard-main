import { useMemo } from "react";

import { convertToNumber } from "@/lib/data-types/number";
import { useGetCustomersStatisticsQuery } from "@/store/api/customer-lookup/customer-lookup-api";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface ISpendTable {
  userId?: number;
  isValidUserId: boolean;
}
export default function SpendTable({ userId, isValidUserId }: ISpendTable) {
  const { data: getCustomersStatisticsRes, ...getCustomersStatisticsApiState } =
    useGetCustomersStatisticsQuery(
      {
        customerId: userId,
      },
      {
        skip: !isValidUserId,
      },
    );
  const getCustomersStatisticsData = getCustomersStatisticsRes?.data;
  const {
    totalSpend,
    averageBarSpend,
    averageTicketSpend,
    barSpend,
    ticketSpend,
    totalVisit,
    numberOfTickets,
  } = getCustomersStatisticsData || {};

  const data = useMemo(
    () => [
      {
        label: "Total Spend",
        value: `$${convertToNumber({ value: totalSpend, digit: 2 })}`,
      },
      {
        label: "Total Ticket Spend",
        value: `$${convertToNumber({ value: ticketSpend ?? 0, digit: 2 })}`,
      },
      {
        label: "Total Tickets Purchased",
        value: `${convertToNumber({ value: numberOfTickets ?? 0, digit: 2 })}`,
      },
      {
        label: "Average Ticket Spend",
        value: `$${convertToNumber({ value: averageTicketSpend ?? 0, digit: 2 })}`,
      },
      {
        label: "Total Visits",
        value: `${convertToNumber({ value: totalVisit ?? 0, digit: 0 })}`,
      },
      {
        label: "Average Bar Spend Per Night",
        value: `$${convertToNumber({ value: averageBarSpend ?? 0, digit: 2 })}`,
      },
      {
        label: "Total Bar Spend",
        value: `$${convertToNumber({ value: barSpend ?? 0, digit: 2 })}`,
      },
    ],
    [
      totalSpend,
      ticketSpend,
      averageTicketSpend,
      totalVisit,
      averageBarSpend,
      barSpend,
      numberOfTickets,
    ],
  );

  return (
    <div className="mt-4 w-full">
      <Table tableWrapper="border border-default-200 rounded-md">
        <TableHeader className="[&_tr]:border-t-0">
          <TableRow>
            <TableHead>FIELD LABEL</TableHead>
            <TableHead className="text-end md:pr-20">VALUE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <RenderData
            expectedDataType="object"
            data={getCustomersStatisticsData}
            {...getCustomersStatisticsApiState}
            loadingSkeleton={<TableSkeleton length={6} />}
          >
            {data.map((item, index) => (
              <TableRow key={index} className="last:border-b-0">
                <TableCell>{item.label}</TableCell>
                <TableCell className="text-end md:pr-20">
                  {item.value}
                </TableCell>
              </TableRow>
            ))}
          </RenderData>
        </TableBody>
      </Table>
    </div>
  );
}
