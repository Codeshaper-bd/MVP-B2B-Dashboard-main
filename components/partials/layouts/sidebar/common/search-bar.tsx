"use client";
import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";

import { useConfig } from "@/hooks/use-config";
import { useMenuHoverConfig } from "@/hooks/use-menu-hover";
import SearchIcon from "@/components/icons/SearchIcon";
import { Input } from "@/components/ui/input";

import CollapsedSearchBar from "./collapsed-search-bar";

export interface ISearchBarProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}
function SearchBar({ searchTerm, setSearchTerm }: ISearchBarProps) {
  const [config] = useConfig();
  const [hoverConfig] = useMenuHoverConfig();
  const { hovered } = hoverConfig;

  if (config.showSearchBar === false || config.sidebar === "compact") {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key={config.collapsed && !hovered ? "collapsed" : "expanded"}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {config.collapsed && !hovered ? (
          <CollapsedSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        ) : (
          <div className="relative">
            <SearchIcon className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-default-600" />
            <Input
              type="text"
              placeholder="Search"
              className="ps-11 text-base placeholder:text-default-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default memo(SearchBar);
