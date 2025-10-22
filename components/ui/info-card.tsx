import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface IInfoCardProps extends VariantProps<typeof infoCardVariants> {
  title: string;
  icon?: ReactNode;
  className?: string;
}

const infoCardVariants = cva("text-base leading-6 flex items-center gap-2", {
  variants: {
    color: {
      default: "text-default-800",
      primary: "text-primary",
      secondary: "text-secondary",
      destructive: "text-destructive",
      warning: "text-warning",
      info: "text-info",
      success: "text-success",
      alert: "text-alert",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

function InfoCard({ title, icon, className, color }: IInfoCardProps) {
  return (
    <div className={cn(infoCardVariants({ color }), className)}>
      {icon && <span>{icon}</span>}
      <p>{title}</p>
    </div>
  );
}

export default InfoCard;
