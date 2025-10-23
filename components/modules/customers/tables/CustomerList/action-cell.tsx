"üse client";

import type { CellContext } from "@tanstack/react-table";
import Link from "next/link";

import type { TCustomerLookup } from "@/store/api/customer-lookup/customer-lookup.types";
import { ArrowRightIcon as RightArrowIcon } from "@/components/icons";
import { usePathname } from "@/components/navigation";

function ActionCell({
  row: { original },
}: CellContext<TCustomerLookup, unknown>) {
  const { id } = original;
  const pathName = usePathname();
  const isDashboard = pathName?.includes("/dashboard");
  const customerDetailsURL = isDashboard
    ? `/en/event-company/customers/customer-lookup/${id}`
    : `./customer-lookup/${id}`;
  return (
    <Link href={customerDetailsURL}>
      <RightArrowIcon className="size-5 text-primary" />
    </Link>
  );
}

export default ActionCell;
