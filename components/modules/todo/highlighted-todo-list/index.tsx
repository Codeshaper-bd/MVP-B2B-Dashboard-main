"use client";
import Link from "next/link";

import CreateTodoModal from "@/components/modules/todo/create-todo";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import TodoList from "./todo-list";

function HighlightedTodoList({ seeAllLink }: { seeAllLink: string }) {
  return (
    <Card>
      <CardHeader className="border-b py-4">
        <div className="flex flex-wrap items-center">
          <CardTitle className="flex-1 text-[16px]">To-Do List</CardTitle>

          <div className="flex flex-none items-center gap-3">
            <CreateTodoModal />

            <Button
              color="secondary"
              size="md"
              className="text-[#85888E] hover:text-[#85888E]"
              asChild
            >
              <Link href={seeAllLink}>See all</Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <TodoList isHighlighted={true} />
    </Card>
  );
}

export default HighlightedTodoList;
