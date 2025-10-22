import React from "react";

import { cn } from "@/lib/utils";

import Content from "./Content";
import Rings from "./Rings";

interface IBgRingsProps {
  children?: React.ReactNode;
  className?: string;
}

function BgRings({ children, className }: IBgRingsProps) {
  return (
    <div
      className={cn(
        "relative !z-0 h-fit w-fit rounded-full bg-primary px-[15px] py-3.5",
        className,
      )}
    >
      {children}
    </div>
  );
}

BgRings.Rings = Rings;
BgRings.Content = Content;

export default BgRings;
