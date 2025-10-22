import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

function SeparatorLabel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 py-6 text-lg font-semibold text-default-900",
        className,
      )}
    >
      <Separator className="flex-1" />
      <div className="flex-none"> {children}</div>
      <Separator className="flex-1" />
    </div>
  );
}

export default SeparatorLabel;
