"use client";
import type { CellContext } from "@tanstack/react-table";
import Link from "next/link";

import EyeIcon from "@/components/icons/EyeIcon";

import type { TDataProps } from "./columns";

function ActionCell({ row: { original } }: CellContext<TDataProps, unknown>) {
  return (
    <div className="flex w-full items-center justify-center gap-9">
      <Link href={`./customer-management/${1}`}>
        <EyeIcon className="size-[20px] cursor-pointer text-primary" />
      </Link>
    </div>
  );
}

export default ActionCell;
