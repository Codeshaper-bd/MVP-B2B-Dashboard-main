import { type CellContext } from "@tanstack/react-table";
import { useState } from "react";

import type { TFeedback } from "@/store/api/feedback/feedback.types";
import ReplyIcon from "@/components/icons/ReplyIcon";
import SquarePenIcon from "@/components/icons/SquarePenIcon";
import { Button } from "@/components/ui/button";

import FeedbackModal from "./feedback-modal";

function ReplayComponent({
  row: { original },
}: CellContext<TFeedback, unknown>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hasReplies = original?.replies && original.replies.length > 0;
  const lastReply = hasReplies
    ? original.replies[original.replies.length - 1]
    : null;

  return (
    <>
      {!hasReplies ? (
        <Button
          color="secondary"
          className="h-[36px] w-[90px] items-center gap-1 rounded-[8px] px-3 py-2"
          onClick={() => setIsOpen(true)}
        >
          <span>
            <ReplyIcon className="h-[18px] w-[20px] cursor-pointer font-semibold text-default-600" />
          </span>
          <span className="w-[42px]">Reply</span>
        </Button>
      ) : (
        <div className="flex gap-2">
          <p className="line-clamp-2 w-full max-w-[180px]">
            {lastReply?.reply}
          </p>
          <SquarePenIcon
            className="h-[18px] w-[20px] cursor-pointer self-end font-semibold text-default-600"
            onClick={() => setIsOpen(true)}
          />
        </div>
      )}
      <FeedbackModal isOpen={isOpen} setIsOpen={setIsOpen} data={original} />
    </>
  );
}

export default ReplayComponent;
