import type { TNullish } from "@/store/api/common-api-types";
import { Card } from "@/components/ui/card";

type CreditCardInfoRow = {
  label: string;
  value: string | number;
};
type ISummaryCardProps = {
  title?: string | TNullish;
  rows?: CreditCardInfoRow[] | [];
};

export default function SummaryCard({ title, rows }: ISummaryCardProps) {
  return (
    <Card className="space-y-3 overflow-hidden px-6 py-4">
      <div className="flex items-center gap-4">
        <h3 className="text-base font-semibold text-default-900">{title}</h3>
      </div>
      <div className="w-full border-b border-dashed border-default-100"></div>
      {rows?.map((row: CreditCardInfoRow) => (
        <div
          key={row.label}
          className="flex items-center justify-between bg-default text-sm font-normal"
        >
          <span>{row.label}</span>
          <span className="font-medium text-default-900">{row.value}</span>
        </div>
      ))}
    </Card>
  );
}
