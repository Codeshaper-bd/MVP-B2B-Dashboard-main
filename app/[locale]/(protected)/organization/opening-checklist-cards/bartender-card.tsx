import React from "react";

import FileCheck from "@/components/icons/FileCheck";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

function BartenderCard() {
  return (
    <div className="h-fit space-y-5 rounded-[14px] border bg-[#121723] px-4 py-5">
      <div className="space-y-6">
        <div className="space-y-4">
          <Avatar shape="square">
            <AvatarImage alt="avatar" src="/assets/avatar/avatar-6.png" />
          </Avatar>
          <h2 className="text-sm font-semibold text-default-1000">Admin</h2>
        </div>

        <div className="flex w-fit cursor-pointer items-center gap-2 rounded-full border border-[#065986] bg-[#062C41] px-2 py-0.5">
          <span className="relative block h-2 w-2 rounded-full bg-[#0BA5EC] before:absolute before:start-0 before:top-0 before:h-full before:w-full before:rounded-full"></span>
          <p className="text-xs font-medium text-default-700">
            Ready to Review
          </p>
        </div>
      </div>
      <div className="flex cursor-pointer items-center gap-2 rounded-[8px] border bg-default-50 px-3.5 py-2.5 text-default-700">
        <FileCheck className="size-5" />
        <p className="text-[16px] font-semibold">View Checklist</p>
      </div>
    </div>
  );
}

export default BartenderCard;
