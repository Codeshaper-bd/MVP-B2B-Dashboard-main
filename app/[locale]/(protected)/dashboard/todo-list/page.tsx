import { getSeoMeta } from "@/lib/get-seo-meta";
import TodoFilters from "@/components/modules/todo/todo-list/todo-filters";
import TodoPageContent from "@/components/modules/todo/todo-list/TodoPageContent";
import PageHeader from "@/components/partials/header/page-header";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = getSeoMeta({ title: "Todo List" });

function TodoListPage() {
  return (
    <div>
      <PageHeader title="To Do List" />

      <TodoFilters />
      <Card className="border-none bg-[#161B26] shadow-none">
        <CardContent className="p-4">
          <TodoPageContent />
        </CardContent>
      </Card>
    </div>
  );
}

export default TodoListPage;
