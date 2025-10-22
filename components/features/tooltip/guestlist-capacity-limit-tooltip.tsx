import { memo } from "react";

function GuestListCapacityLimitTooltip() {
  return (
    <div className="space-y-3">
      <h6 className="text-center text-xs font-medium not-italic leading-[18px] text-default-1000">
        Options:
      </h6>

      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium not-italic leading-[18px] text-default-1000">
          1. % of Club Capacity
        </p>
        <p className="text-xs font-medium not-italic leading-[18px] text-default-1000">
          2. Numerical Limit
        </p>
      </div>
    </div>
  );
}

export default memo(GuestListCapacityLimitTooltip);
