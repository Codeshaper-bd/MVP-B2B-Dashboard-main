"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import DefaultTask from "./default-task";
import AddEditChecklist from "../../components/add-edit-checklist";
import ChecklistBoard from "../../components/checklist-board";
import FilterButton from "../../components/filter-button";

type TFilterTypes = "Manager" | "Barternder" | "Barback" | "Bottle-Girls";
const filterItems: TFilterTypes[] = [
  "Manager",
  "Barternder",
  "Barback",
  "Bottle-Girls",
];
function MainContent() {
  const [filterItem, setFilterItem] = useState<TFilterTypes>("Manager");
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-1.5">
          <div className="flex flex-wrap items-center gap-0.5">
            {filterItems.map((item, index) => (
              <FilterButton
                key={`filter-button-${index}`}
                item={item}
                isActive={filterItem === item}
                onClick={() => setFilterItem(item)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      <DefaultTask />
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="mb-6 flex">
            <h3 className="flex-1 text-lg font-semibold text-default-900">
              Custom Checklist
            </h3>
            <AddEditChecklist />
          </div>
          <div>
            <ChecklistBoard />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MainContent;
