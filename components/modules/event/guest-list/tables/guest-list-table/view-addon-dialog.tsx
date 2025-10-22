import { type CellContext } from "@tanstack/react-table";
import { useState } from "react";

import type { TGuestListItem } from "@/store/api/events/events.types";
import AddonDialogContent from "@/components/modules/addon/modals/AddonDialogContent";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function ViewAddonDialog({
  row: { original },
}: CellContext<TGuestListItem, unknown>) {
  const addonsCount = original?.addOnsCount;
  const [isOpen, setIsOpen] = useState(false);

  if (!addonsCount) {
    return (
      <span className="text-center text-sm text-default-1000">
        {addonsCount}
      </span>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button type="button" className="font-medium text-primary">
          Click to View
        </button>
      </DialogTrigger>
      <DialogContent className="min-h-[300px] pb-5 md:max-w-[600px]">
        {isOpen && (
          <AddonDialogContent
            ticketSoldId={String(original?.id || "")}
            guestName={original?.name || ""}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ViewAddonDialog;
