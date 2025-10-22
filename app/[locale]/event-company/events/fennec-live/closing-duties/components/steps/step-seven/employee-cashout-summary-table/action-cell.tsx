"üse client";
import type { CellContext } from "@tanstack/react-table";
import Link from "next/link";

import { cn } from "@/lib/utils";
import PencilIcon from "@/components/icons/PencilIcon";

import type { TDataProps } from "./columns";

function ActionCell({ row: { original } }: CellContext<TDataProps, unknown>) {
  return (
    <div className={cn("flex w-full items-center justify-center gap-9 pe-4")}>
      <Link href={`#`}>
        <PencilIcon className="size-4 cursor-pointer text-default-600 hover:text-primary" />
      </Link>
    </div>
  );
}

export default ActionCell;
