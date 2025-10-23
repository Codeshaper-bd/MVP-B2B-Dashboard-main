"use client";

import { MinusIcon as MinusIcon } from "@/components/icons";
import { PlusIcon as PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

function Counter({ count = 0 }: { count?: number }) {
  return (
    <div className="flex items-center gap-3">
      <Button
        size="icon"
        className="h-6 w-6 border-none bg-[#C8C8C8] text-default hover:bg-destructive hover:text-default-1000"
        rounded="full"
        type="button"
      >
        <MinusIcon className="h-3.5 w-3.5" />
      </Button>
      <div className="min-w-[20px] text-center text-lg font-semibold text-[#605C5C]">
        {count}
      </div>

      <Button
        size="icon"
        className="h-6 w-6 border-none bg-[#C8C8C8] text-default hover:bg-primary hover:text-default-1000"
        rounded="full"
        type="button"
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default Counter;
