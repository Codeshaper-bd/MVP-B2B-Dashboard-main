"use client";

import { useGetOverviewTodoQuery } from "@/store/api/todo/todo-api";
import Todo from "@/components/modules/todo/todo-list/components/todo";
import RenderData from "@/components/render-data";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import TodoSkeleton from "@/components/skeleton/todo-skeleton";
import { CardContent } from "@/components/ui/card";

function TodoList({ isHighlighted }: { isHighlighted: boolean }) {
  const { data: getAllTodoRes, ...getAllTodoApiState } =
    useGetOverviewTodoQuery();
  const getAllTodoData = getAllTodoRes?.data;

  return (
    <CardContent>
      <RenderData
        {...getAllTodoApiState}
        expectedDataType="array"
        data={getAllTodoData}
        loadingSkeleton={
          <SkeletonWrapper
            size={3}
            className="last-border-none border-border [&_>div]:border-b [&_>div]:py-4"
          >
            <TodoSkeleton />
          </SkeletonWrapper>
        }
      >
        <div className="last-border-none">
          {getAllTodoData?.map((todo, idx) => (
            <Todo
              key={todo.id || idx}
              {...todo}
              isHighlighted={isHighlighted}
            />
          ))}
        </div>
      </RenderData>
    </CardContent>
  );
}

export default TodoList;
