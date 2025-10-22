import type { TNullish } from "@/store/api/common-api-types";
import { Card } from "@/components/ui/card";

type CreditCardInfoRow = {
  category: string;
  value: string | number;
};
type ICreditCardInfoTableProps = {
  totalRevenueLoss?: string | TNullish;
  rows?: CreditCardInfoRow[] | [];
};

function PerformanceSummaryCard({
  rows = [],
  totalRevenueLoss,
}: ICreditCardInfoTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between bg-default-50 px-6 py-4 text-xs font-medium">
        <span>CATEGORY</span>
        <span>VALUE</span>
      </div>
      {rows?.map((row: CreditCardInfoRow) => (
        <div
          key={row.category}
          className="flex items-center justify-between border-t border-default-100 bg-default px-6 py-4 text-sm font-normal"
        >
          <span>{row.category}</span>
          <span className="font-medium">{row.value}</span>
        </div>
      ))}
      {totalRevenueLoss && (
        <div className="flex items-center justify-between border-t border-default-100 bg-default px-6 py-4 text-sm font-medium text-default-900">
          <span>Total Revenue Loss</span>
          <span className="ms-2.5 font-semibold">{totalRevenueLoss}</span>
        </div>
      )}
    </Card>
  );
}
export default PerformanceSummaryCard;
