"use client";
import { Search } from "lucide-react";
import { useMemo } from "react";

import { filterMenuItems, getFlatMenuItems } from "@/lib/menus/utils";
import { selectAuthUser } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";
import { usePathname } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import SearchMenuList from "../search-menu-list";
import type { ISearchBarProps } from "./search-bar";

function CollapsedSearchBar({ searchTerm, setSearchTerm }: ISearchBarProps) {
  const pathName = usePathname();
  // flatten once when pathname changes
  const loggedInUser = useAppSelector(selectAuthUser);

  const allMenus = useMemo(
    () => getFlatMenuItems(pathName, loggedInUser),
    [pathName, loggedInUser],
  );

  // recompute filtered list when searchTerm or allMenus change
  const filtered = useMemo(
    () => filterMenuItems(allMenus, searchTerm),
    [allMenus, searchTerm],
  );
  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger asChild>
        <Button
          color="secondary"
          fullWidth
          className="mx-auto h-12 w-12 p-0 ring-offset-sidebar md:p-0"
        >
          <Search className="h-6 w-6" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        className="z-50 border-sidebar bg-secondary"
        align="start"
      >
        <div className="relative">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-default-600" />
          <Input
            type="text"
            placeholder="Search Menu..."
            className="ps-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative mt-2">
          <ScrollArea className="h-[calc(100vh_-_500px)]">
            <SearchMenuList
              filtered={filtered}
              setSearchTerm={setSearchTerm}
              className="px-0"
            />
          </ScrollArea>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
export default CollapsedSearchBar;
