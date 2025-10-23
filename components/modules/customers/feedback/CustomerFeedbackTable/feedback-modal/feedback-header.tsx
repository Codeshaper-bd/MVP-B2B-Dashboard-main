import React from "react";

import { CrossIcon as CrossIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

import type { IFeedbackModalProps } from ".";

function FeedbackHeader({ setIsOpen }: Pick<IFeedbackModalProps, "setIsOpen">) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold">Detail Feedback</h2>
      <Button
        color="secondary"
        className="border border-default-100 border-opacity-0 bg-transparent !p-4 transition-all duration-300 ease-linear hover:border hover:border-opacity-100 hover:bg-default-50 focus:border"
        type="button"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <CrossIcon className="size-5 bg-transparent text-[#85888E]" />
      </Button>
    </div>
  );
}

export default FeedbackHeader;
