"use client";

import { type CellContext } from "@tanstack/react-table";
import { useState } from "react";

import type { TFeedback } from "@/store/api/feedback/feedback.types";

import FeedbackModal from "./feedback-modal";

function FeedBackCell({ row: { original } }: CellContext<TFeedback, unknown>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div
        onClick={() => setIsOpen(true)}
        className="relative line-clamp-2 w-[300px] cursor-pointer text-sm font-normal leading-5 text-default-600"
      >
        {original?.comments}
      </div>

      <FeedbackModal isOpen={isOpen} setIsOpen={setIsOpen} data={original} />
    </div>
  );
}

export default FeedBackCell;
