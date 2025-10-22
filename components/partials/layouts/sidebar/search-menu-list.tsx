import Link from "next/link";

import type { FlatMenuItem } from "@/lib/menus/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function SearchMenuList({
  filtered,
  setSearchTerm,
  className,
}: {
  filtered: FlatMenuItem[];
  setSearchTerm: (searchTerm: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1 px-4", className)}>
      {filtered?.length === 0 && (
        <Button
          asChild
          fullWidth
          color="secondary"
          className="justify-start border-none text-start text-destructive hover:bg-primary hover:text-primary-foreground"
          onClick={() => setSearchTerm("")}
        >
          <Link href="javascript:void(0)">No results found</Link>
        </Button>
      )}
      {filtered?.map((item, index) => (
        <Button
          asChild
          key={`${index}`}
          fullWidth
          color="secondary"
          className="justify-start border-none text-start hover:bg-primary hover:text-primary-foreground"
          onClick={() => setSearchTerm("")}
        >
          <Link href={`/en${item?.href}`}>{item?.label}</Link>
        </Button>
      ))}
    </div>
  );
}

export default SearchMenuList;
