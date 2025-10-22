"use client";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";

import FiltersTodo from "./filters-todo";
import FiltersValue from "./filters-value";
import CreateTodoModal from "../../create-todo";

function TodoFilters() {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <DynamicBreadcrumb className="mb-0 lg:mb-0" />
        <div className="flex items-center justify-between gap-3">
          <CreateTodoModal builtInTriggerOptions="large-icon-text-button" />
          <FiltersTodo />
        </div>
      </div>

      <div className="mb-6 flex justify-end">
        <FiltersValue />
      </div>
    </div>
  );
}

export default TodoFilters;
