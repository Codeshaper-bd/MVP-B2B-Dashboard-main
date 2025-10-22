import Image from "next/image";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TNullish } from "@/store/api/common-api-types";
import { Card } from "@/components/ui/card";

type CreditCardInfoRow = {
  category?: string;
  amount?: string | number;
  description?: string | number;
};
type ICreditCardInfoTableProps = {
  url?: string | TNullish;
  creditCardTotal?: string | TNullish;
  cashOnHandTotal?: string | TNullish;
  title?: string | TNullish;
  rows?: CreditCardInfoRow[] | [];
};

function CreditCardInfoTable({
  url,
  title,
  rows = [],
  creditCardTotal,
  cashOnHandTotal,
}: ICreditCardInfoTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-4 px-6 py-4">
        {url && (
          <Image
            alt={"Credit Card"}
            width={38}
            height={28}
            className="h-7 w-[38px] rounded-sm border border-default-50"
            src={getImageFallback({ src: url, fallbackImageSize: 100 })}
          />
        )}

        <h3 className="text-base font-semibold text-default-900">{title}</h3>
      </div>
      <div className="flex items-center justify-between bg-default-50 px-6 py-4 text-xs font-medium">
        <span className="uppercase">
          {rows[0].description ? "Description" : "CATEGORY"}
        </span>
        <span>AMOUNT</span>
      </div>
      {rows?.map((row: CreditCardInfoRow) => (
        <div
          key={row.description || row.category}
          className="flex items-center justify-between border-t border-default-100 bg-default px-6 py-4 text-sm font-normal"
        >
          <span>{row.description || row.category}</span>
          <span className="font-medium">{row.amount}</span>
        </div>
      ))}
      {creditCardTotal && creditCardTotal && (
        <div className="space-y-4 border-t border-default-100 bg-default px-6 py-4 text-sm font-medium">
          <div className="flex items-center justify-between text-default-900">
            <span>CREDIT CARD TOTAL:</span>
            <span className="ms-2.5 font-semibold text-primary">
              {creditCardTotal}
            </span>
          </div>
          <div className="flex items-center justify-between text-default-900">
            <span>TOTAL CASH ON HAND:</span>
            <span className="ms-2.5 font-semibold text-primary">
              {cashOnHandTotal}
            </span>
          </div>
        </div>
      )}
    </Card>
  );
}
export default CreditCardInfoTable;
