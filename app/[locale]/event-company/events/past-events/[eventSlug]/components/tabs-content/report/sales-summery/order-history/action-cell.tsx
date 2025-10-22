"üse client";
import type { CellContext } from "@tanstack/react-table";
import Link from "next/link";

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import type { TPastEventOrder } from "@/store/api/past-event/past-event.types";
import RightArrowIcon from "@/components/icons/RightArrowIcon";

function ActionCell({
  row: { original },
}: CellContext<TPastEventOrder, unknown>) {
  const { eventSlug } = useFetchAnEventData();
  const orderId = original?.orderId;
  const orderDetailsLink = `/en/inventory/order-history/${eventSlug}/${orderId}`;
  return (
    <div className="flex w-full items-center justify-center gap-9">
      <Link href={orderDetailsLink}>
        <RightArrowIcon className="size-[20px] cursor-pointer text-primary" />
      </Link>
    </div>
  );
}

export default ActionCell;
