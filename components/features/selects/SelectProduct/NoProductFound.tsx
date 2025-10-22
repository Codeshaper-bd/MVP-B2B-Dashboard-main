import React from "react";

import InfoIcon from "@/components/icons/InfoIcon";

function NoProductFound() {
  return (
    <div className="flex h-[244px] w-full items-center justify-center gap-3 rounded-[8px] bg-default-50">
      <InfoIcon className="size-5" />
      <p>Please select product</p>
    </div>
  );
}

export default NoProductFound;
