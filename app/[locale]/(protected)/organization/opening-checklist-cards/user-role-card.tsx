import React from "react";

import { ArrowRightIcon as RightArrowIcon } from "@/components/icons";

function UserRoleCard() {
  return (
    <div className="h-fit space-y-5 rounded-[14px] border bg-[#121723] px-4 py-5">
      <div className="space-y-6">
        <h2 className="text-sm font-semibold text-default-1000">Admin</h2>

        <div className="flex w-fit cursor-pointer items-center gap-2 rounded-[8px] bg-default-100 px-3.5 py-2.5">
          <span className="relative block h-2 w-2 rounded-full bg-[#17B26A] before:absolute before:start-0 before:top-0 before:h-full before:w-full before:rounded-full"></span>
          <p className="text-xs font-medium text-default-700">
            Completed <span className="ms-0.5">0/7</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 rounded-[8px] bg-default-50 px-3 py-2 text-default-700">
        <span className="text-sm font-semibold">More</span>
        <RightArrowIcon className="size-3.5" />
      </div>
    </div>
  );
}

export default UserRoleCard;
