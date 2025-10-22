"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

import SwitchHorizontalIcon from "@/components/icons/SwitchHorizontalIcon";
import { Button } from "@/components/ui/button";

interface TransferButtonProps {
  barSlug?: string;
  className?: string;
}

function TransferButton({ barSlug, className = "" }: TransferButtonProps) {
  const params = useParams();
  // Get the current locale from the URL
  const locale =
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[1]
      : params.locale || "en";

  // Use provided barSlug or get it from params if available
  const sourceBarSlug = barSlug || (params.barSlug as string);

  // Create the query object only if sourceBarSlug exists
  const query = sourceBarSlug ? { source: sourceBarSlug } : {};

  return (
    <Link
      href={{
        pathname: `/${locale}/inventory/inventory-management/transfer`,
        query,
      }}
      passHref
    >
      <Button asChild color="primary" className={className}>
        <span>
          <SwitchHorizontalIcon className="me-1 size-4" /> Transfer
        </span>
      </Button>
    </Link>
  );
}

export default TransferButton;
