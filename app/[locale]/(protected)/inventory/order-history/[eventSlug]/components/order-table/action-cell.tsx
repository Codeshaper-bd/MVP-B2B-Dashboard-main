"üse client";
import type { CellContext } from "@tanstack/react-table";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import { useParams } from "next/navigation";

import type { TOrder } from "@/store/api/order-history/order-history.types";
import { ArrowRightIcon as RightArrowIcon } from "@/components/icons";

type TPageParams = Params & {
  locale: string;
  eventSlug: string;
};
function ActionCell({ row: { original } }: CellContext<TOrder, unknown>) {
  const { eventSlug } = useParams<TPageParams>();

  return (
    <div className="flex w-full items-center justify-center gap-9">
      <Link href={`/en/inventory/order-history/${eventSlug}/${original.id}`}>
        <RightArrowIcon className="size-[20px] cursor-pointer text-primary" />
      </Link>
    </div>
  );
}

export default ActionCell;
