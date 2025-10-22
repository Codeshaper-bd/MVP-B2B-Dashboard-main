import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
function SalesTicketSummary() {
  return (
    <Card className="rounded-xl bg-default shadow-lg [&>div:first-child]:rounded-t-[10px]">
      <Table>
        <TableHeader>
          <TableRow className="border border-default-100 bg-default-50 text-xs font-medium text-default-700">
            <TableHead>ITEM TYPES</TableHead>
            <TableHead>NET SALES</TableHead>
            <TableHead>GROSS SALES</TableHead>
            <TableHead>TAX COLLECTED</TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead>NON SALES</TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead>CASH DEPOSIT</TableHead>
            <TableHead>AMOUNT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            [
              "NAB",
              "$59.10",
              "$59.02",
              "HST",
              "$933.76",
              "-",
              "-",
              "TOTAL CASH",
              "$8055.45",
            ],
            [
              "BAR",
              "$6994.53",
              "$7029.93",
              "",
              "",
              "",
              "",
              "PAYOUT & CASHBACK",
              "$0.00",
            ],
            ["COVER", "$75.22", "$75.22", "", "", "", "", "", ""],
            ["OWN USE", "$52.84", "$52.84", "", "", "", "", "", ""],
            ["NO TAX", "$13.72", "$13.72", "", "", "", "", "", ""],
            [
              "Total Sales",
              "$7195.61",
              "$7231.01",
              "Total Taxes",
              "$933.76",
              "Non Sales",
              "$0.00",
              "Net Cash",
              "$8055.45",
            ],
            [
              "Gift Cert.",
              "$0.00",
              "$0.00",
              "Gift Cert.",
              "$0.00",
              "-",
              "-",
              "-",
              "-",
            ],
          ].map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell
                  key={j}
                  className="text-sm font-normal text-default-700"
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6 space-y-4 px-6 py-[18px]">
        <div className="text-sm font-medium text-default-900">
          Total Cash: <span className="ml-2 text-primary">$7,231.01</span>
        </div>
        <div className="text-sm font-medium text-default-900">
          PayOut & Cashback:
          <span className="ml-2 text-primary">$1,181.74</span>
        </div>
      </div>
    </Card>
  );
}

export default SalesTicketSummary;
