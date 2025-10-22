"use client";
import { useEffect, useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import AssignContent from "./assign-content";
import ListContent from "./list-content";
import type { IShowListOfEventsModalProps, TEventModalType } from "./types";

function ShowListOfEventsModal({
  promoter,
  open,
  onOpenChange,
}: IShowListOfEventsModalProps) {
  const [tab, setTab] = useState<TEventModalType>("list");
  useEffect(() => {
    if (!open) {
      setTab("list");
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl sm:max-w-full sm:rounded-xl md:max-w-[800px]">
        {tab === "list" && <ListContent promoter={promoter} setTab={setTab} />}
        {tab === "assign" && (
          <AssignContent promoter={promoter} setTab={setTab} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ShowListOfEventsModal;
