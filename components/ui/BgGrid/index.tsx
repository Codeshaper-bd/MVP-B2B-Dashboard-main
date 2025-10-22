import React from "react";

import { cn } from "@/lib/utils";

import Content from "./Content";
import Grid from "./Grid";

interface IBgGridProps {
  children?: React.ReactNode;
  className?: string;
}

function BgGrid({ children, className }: IBgGridProps) {
  return (
    <div className={cn("!relative !z-0 h-fit w-fit", className)}>
      {children}
    </div>
  );
}

BgGrid.Grid = Grid;
BgGrid.Content = Content;

export default BgGrid;
