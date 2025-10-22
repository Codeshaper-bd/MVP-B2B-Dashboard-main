"use client";
import { Icon as IconIfyIcon } from "@iconify/react";
import React from "react";

import { cn } from "@/lib/utils";

const Icon = React.forwardRef<
  React.ElementRef<typeof IconIfyIcon>,
  React.ComponentPropsWithoutRef<typeof IconIfyIcon>
>(({ className, ...props }, ref) => (
  <IconIfyIcon className={cn("", className)} ref={ref} {...props} />
));
Icon.displayName = "Icon";

export { Icon };
