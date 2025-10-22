import type { CellContext } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";

import useIsEventCompany from "@/hooks/feature/useIsEventCompany";
import type { TNullish } from "@/store/api/common-api-types";
import { useLazyDownloadInvoiceByIdQuery } from "@/store/api/transactions/transactions-api";
import type { TTransaction } from "@/store/api/transactions/transactions.types";
import DownloadIcon from "@/components/icons/DownloadIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import EyeIcon from "@/components/icons/EyeIcon";

import ViewTransaction from "../../modals/ViewTransaction";

export interface ISelectedId {
  transactionId: number | null;
  gatewayReferenceId: string | TNullish;
  amount: number | TNullish;
}
const initialSelectedId = {
  transactionId: null,
  gatewayReferenceId: null,
  amount: null,
};
function TransactionAction({
  row: { original },
}: CellContext<TTransaction, unknown>) {
  const transactionId = original.id;
  const [selectedId, setSelectedId] = useState<ISelectedId>(initialSelectedId);
  const [triggerDownload] = useLazyDownloadInvoiceByIdQuery();
  const [open, setOpen] = useState(false);
  const isEventCompany = useIsEventCompany();

  const handleDownload = async () => {
    if (!transactionId) {
      return;
    }
    const blobUrl = await triggerDownload(transactionId?.toString()).unwrap();

    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `invoice-${transactionId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };
  useEffect(() => {
    if (!open) {
      setSelectedId(initialSelectedId);
    }
  }, [open]);

  return (
    <div className="flex w-fit items-center gap-4">
      <button
        className="flex cursor-pointer items-center gap-3 text-default-600 hover:text-primary"
        onClick={() => {
          setOpen(true);
          setSelectedId({
            transactionId: Number(original.id),
            gatewayReferenceId: original.gatewayReferenceId,
            amount: original?.amount,
          });
        }}
      >
        <EyeIcon className="h-4 w-4" />
      </button>
      <button
        onClick={handleDownload}
        className="flex cursor-pointer items-center gap-3 text-default-600 hover:text-primary"
      >
        <DownloadIcon className="h-4 w-4" />
      </button>
      <Link
        href={
          isEventCompany
            ? "/en/event-company/support/contact-support"
            : "/en/support/contact-support"
        }
      >
        <EmailIcon className="size-4" />
      </Link>
      <ViewTransaction open={open} setOpen={setOpen} selectedId={selectedId} />
    </div>
  );
}

export default TransactionAction;
