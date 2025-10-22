import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Rating from "@/components/ui/Rating";

import type { IFeedbackModalProps } from ".";

function FeedbackContent({ data }: Pick<IFeedbackModalProps, "data">) {
  const { comments, reviewer, rating } = data;
  return (
    <div className="p-6">
      <div className="mb-5 flex gap-3">
        <Avatar className="size-10">
          <AvatarImage src={reviewer?.media?.url || ""} alt="reviewer" />
          <AvatarFallback>{reviewer?.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>

        <div>
          <h2 className="mb-1.5 text-sm font-medium text-[#F5F5F6]">
            {reviewer?.name}
          </h2>
          <Rating rating={rating || 0} />
        </div>
      </div>
      <p className="text-base text-[#F5F5F6]">{comments}</p>
    </div>
  );
}

export default FeedbackContent;
