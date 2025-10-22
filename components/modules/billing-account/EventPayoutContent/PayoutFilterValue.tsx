"use client";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TGetAnEventPayoutArgs } from "@/store/api/events/events.types";
import { Tag } from "@/components/ui/tag";

function PayoutFilterValue() {
  const { updateAParam, getAllParamValue } =
    useManageSearchParams<Exclude<TGetAnEventPayoutArgs, void>>();
  const { payoutStatus } = getAllParamValue();

  const handleRemovePayoutStatus = () => {
    updateAParam({ key: "payoutStatus", value: undefined });
  };

  return (
    <div className="mb-6 flex flex-wrap justify-start gap-3 md:justify-end">
      {payoutStatus && (
        <Tag
          dot
          label={payoutStatus}
          onRemove={handleRemovePayoutStatus}
          className={`${
            payoutStatus === "COMPLETED"
              ? "statusGreen"
              : payoutStatus === "PENDING"
                ? "statusYellow"
                : "statusError"
          }`}
          iconClass="text-default-700"
        />
      )}
    </div>
  );
}

export default PayoutFilterValue;
