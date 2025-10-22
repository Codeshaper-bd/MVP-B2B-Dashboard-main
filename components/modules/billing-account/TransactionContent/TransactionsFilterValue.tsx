"use client";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TGetAllTransactionsArgs } from "@/store/api/transactions/transactions.types";
import { Tag } from "@/components/ui/tag";

function TransactionsFilterValue() {
  const { updateAParam, getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllTransactionsArgs, void>>();
  const { paymentStatus } = getAllParamValue();

  const handleRemovePaymentStatus = () => {
    updateAParam({ key: "paymentStatus", value: undefined });
  };

  return (
    <div className="mb-6 flex flex-wrap justify-start gap-3 md:justify-end">
      {paymentStatus && (
        <Tag
          dot
          label={paymentStatus}
          onRemove={handleRemovePaymentStatus}
          className={`${
            paymentStatus === "COMPLETED"
              ? "statusGreen"
              : paymentStatus === "PENDING"
                ? "statusYellow"
                : "statusError"
          }`}
          iconClass="text-default-700"
        />
      )}
    </div>
  );
}

export default TransactionsFilterValue;
