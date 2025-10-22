import { memo } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface IFilterButtonProps {
  item: string;
  isActive: boolean;
  onClick: (item: string) => void;
}

function FilterButton({ item, isActive, onClick }: IFilterButtonProps) {
  return (
    <Button
      onClick={() => onClick(item)}
      color="secondary"
      className={cn("border-none", {
        "text-primary hover:text-primary": isActive,
      })}
      variant={isActive ? "default" : "ghost"}
    >
      {item}
    </Button>
  );
}

export default memo(FilterButton);
