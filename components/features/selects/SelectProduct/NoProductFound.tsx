import React from "react";

import { InfoIcon as InfoIcon } from "@/components/icons";

function NoProductFound() {
  return (
    <div className="flex h-[244px] w-full items-center justify-center gap-3 rounded-[8px] bg-default-50">
      <InfoIcon className="size-5" />
      <p>Please select product</p>
    </div>
  );
}

export default NoProductFound;
