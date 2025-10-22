"use client";
import React from "react";

import { cn } from "@/lib/utils";

import Title from "./Title";

interface ITitleContainerProps {
  children?: React.ReactNode;
  className?: string;
}

function TitleContainer({ children, className }: ITitleContainerProps) {
  return (
    <div
      className={cn("flex min-h-[76px] items-center px-6 py-2.5", className)}
    >
      {children}
    </div>
  );
}

TitleContainer.Title = Title;

export default TitleContainer;
