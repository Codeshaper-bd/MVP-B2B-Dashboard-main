import Link from "next/link";
import { memo } from "react";

import BellIcon from "@/components/icons/BellIcon";
import { Button } from "@/components/ui/button";

function Notifications() {
  return (
    <Button type="button" className="bg-default-50 md:px-6" size="lg" asChild>
      <Link href="/en/inventory/inventory-management/notifications">
        <BellIcon className="me-1.5 size-5 text-default-700" /> Notifications
      </Link>
    </Button>
  );
}

export default memo(Notifications);
