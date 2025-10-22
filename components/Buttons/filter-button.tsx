"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface IFilterItem {
  label: string;
  value: string;
}
export interface IFilterButtonProps {
  item: IFilterItem;
  isActive: boolean;
  onClick?: (item: IFilterItem) => void;
  className?: string;
}

function FilterButton({
  item,
  isActive,
  onClick,
  className,
}: IFilterButtonProps) {
  return (
    <Button
      onClick={() => onClick?.(item)}
      color="secondary"
      className={cn(
        {
          "text-primary hover:text-primary": isActive,
        },
        className,
      )}
      variant={isActive ? "default" : "ghost"}
    >
      {item?.label}
    </Button>
  );
}

export default FilterButton;
