import React from "react";

import BellIcon from "@/components/icons/BellIcon";
import { Button } from "@/components/ui/button";

function ManageNotifications() {
  return (
    <div>
      <Button type="button" className="bg-default-50 md:px-6" size="lg">
        <BellIcon className="me-1.5 size-5 text-default-700" />
        Manage Notifications
      </Button>
    </div>
  );
}

export default ManageNotifications;
