"use client";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TGetAllTodoArgs } from "@/store/api/todo/todo.types";

import CompletedTodos from "./components/CompletedTodos";
import InCompleteTodos from "./components/InCompletedTodos";

export default function TodoPageContent() {
  const { getAllParamValue } = useManageSearchParams<
    Exclude<TGetAllTodoArgs, void | undefined> & {
      notCompletedTodoPageNumber?: number;
    }
  >();
  const { status } = getAllParamValue();
  return (
    <div>
      {status ? (
        <div className="grid grid-cols-1 gap-6">
          {status === "NOT_COMPLETED" && <InCompleteTodos />}
          {status === "COMPLETED" && <CompletedTodos />}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <InCompleteTodos />
          <CompletedTodos />
        </div>
      )}
    </div>
  );
}
