"use client";

import React from "react";

import type { TNullish } from "@/store/api/common-api-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CompareModalContent from "./CompareModalContent";

interface IChangeImageDialogProps {
  dataId?: string | number | TNullish;
  open: boolean;
  setOpen?: () => void;
}

function CompareModal({ open, setOpen, dataId }: IChangeImageDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-xl p-6 sm:max-w-full sm:rounded-xl md:max-w-[880px]">
        <DialogHeader className="mb-5">
          <DialogTitle className="flex-1 text-center">
            Compare Promoter
          </DialogTitle>
        </DialogHeader>

        <div className="custom-scrollbar grid max-h-[50vh] grid-cols-1 gap-5 overflow-y-scroll md:max-h-[70vh] md:grid-cols-2 lg:max-h-[80vh]">
          <CompareModalContent defaultPromoterId={dataId} />
          <CompareModalContent />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CompareModal;
