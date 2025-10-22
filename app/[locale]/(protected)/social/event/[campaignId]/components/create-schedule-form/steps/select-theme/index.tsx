"use client";

import { useState } from "react";

import SearchComponent from "@/components/ui/search-component";

import ThemePlatform, { type IThemePlatformProps } from "./theme-platform";

const themes: Omit<IThemePlatformProps, "onClick" | "selectedId">[] = [
  { id: 1, name: "Halloween", image: "/assets/social-svg/theme.svg" },
  { id: 2, name: "Christmas", image: "/assets/social-svg/christmas.svg" },
  { id: 3, name: "Diwali", image: "/assets/social-svg/diwali.svg" },
  { id: 4, name: "Raya", image: "/assets/social-svg/raya.svg" },
  {
    id: 5,
    name: "Chinese New Year at the 2025. This is very sweetable year for me.",
    image: "/assets/social-svg/newyear.svg",
  },
  { id: 6, name: "Other", image: "/assets/social-svg/others.svg" },
];

function SelectTheme() {
  const [selectedId, setSelectedId] = useState<Omit<
    IThemePlatformProps,
    "selectedId" | "onClick"
  > | null>(null);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Select Theme</h1>
        <SearchComponent
          placeholder="Search"
          className="w-64 border border-gray-600 bg-transparent text-white focus:border-primary focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {themes?.map((theme) => (
          <ThemePlatform
            {...theme}
            key={theme.id}
            onClick={setSelectedId}
            selectedId={selectedId?.id}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectTheme;
