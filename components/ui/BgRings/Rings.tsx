import React from "react";

import { cn } from "@/lib/utils";

interface IRingsProps {
  className?: string;
  ringClassNames?: {
    one?: string;
    two?: string;
    three?: string;
    four?: string;
    five?: string;
    six?: string;
    seven?: string;
  };
}

function Rings({ className, ringClassNames }: IRingsProps) {
  return (
    <>
      <div
        className={cn(
          "absolute left-1/2 top-1/2 !-z-10 size-24 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-default-100 border-opacity-100",
          className,
          ringClassNames?.one,
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 !-z-10 size-36 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-default-100 border-opacity-90",
          className,
          ringClassNames?.two,
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 !-z-10 size-48 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-default-100 border-opacity-75",
          className,
          ringClassNames?.three,
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 !-z-10 size-60 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-default-100 border-opacity-60",
          className,
          ringClassNames?.four,
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 !-z-10 size-48 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-default-100 border-opacity-45",
          className,
          ringClassNames?.five,
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 !-z-10 size-72 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-default-100 border-opacity-30",
          className,
          ringClassNames?.six,
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 !-z-10 size-[336px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-default-100 border-opacity-15",
          className,
          ringClassNames?.seven,
        )}
      />
    </>
  );
}

export default Rings;
