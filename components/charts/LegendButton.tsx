import { cn } from "@/lib/utils";

export interface ILegendButtonProps {
  className?: string;
  bulletClassName?: string;
  label?: string;
}
function LegendButton({
  className,
  bulletClassName,
  label = "Revenue",
}: ILegendButtonProps) {
  return (
    <div
      className={cn(
        "flex flex-none items-center gap-1 text-sm font-medium text-default-600",
        className,
      )}
    >
      <span
        className={cn("inline-block h-2 w-2 rounded-full bg-[#F79009]")}
      ></span>
      {label}
    </div>
  );
}

export default LegendButton;
