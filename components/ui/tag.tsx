"use client";
import { cn } from "@/lib/utils";
import { CrossIcon as CrossIcon } from "@/components/icons";

export interface ITagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
  iconClass?: string;
  dot?: boolean;
}

function Tag({ label, onRemove, className, iconClass, dot }: ITagProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-[#1849A9] px-3 py-1 capitalize text-[#84CAFF]",
        className,
        dot &&
          "relative pl-5 before:absolute before:left-2 before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-full before:bg-current before:content-['']",
      )}
    >
      <span className="text-xs font-medium">{label}</span>
      <CrossIcon
        className={cn("h-4 w-4 cursor-pointer text-[#1570EF]", iconClass)}
        onClick={() => {
          if (onRemove) {
            onRemove();
          }
        }}
      />
    </div>
  );
}

export { Tag };
