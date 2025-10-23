"use client";

import { useState } from "react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { cn } from "@/lib/utils";
import { useDeleteTodoMutation } from "@/store/api/todo/todo-api";
import type { TTodo } from "@/store/api/todo/todo.types";
import ConfirmationDialog from "@/components/features/alert-dialog/confirmationDialog";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useToast } from "@/components/ui/use-toast";

import useToggleTodo from "../hooks/useToggleTodo";

function Todo(props: TTodo & { isHighlighted?: boolean }) {
  const { id, title, description, dueDate, slug, status, tags, priority } =
    props;
  const {
    isTodoCompleted,
    handleTodoCheck,
    checkboxId,
    handlePropagation,
    isTodoCheckLoading,
  } = useToggleTodo(props);

  const [isOpen, setOpen] = useState(false);
  const [deleteTodo, { isLoading }] = useDeleteTodoMutation();
  const { toast } = useToast();

  const handleDeleteTodo = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Deleting Todo",
      description: "Please wait while we delete your todo",
    });

    try {
      await deleteTodo(slug).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Todo Deleted Successfully!",
        description: "You have successfully deleted a todo.",
      });
      setOpen(false);
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Todo Delete Failed",
        description: "Something went wrong while deleting todo.",
      });
      setOpen(false);
    }
  };

  return (
    <li
      className={cn(
        "group relative mx-5 flex items-start gap-2.5 overflow-hidden rounded-[10px] border-b border-border p-4 pb-8 pt-4 transition-all duration-300 ease-in-out last:border-none hover:bg-default-200",
        {
          "mx-0 rounded-none hover:bg-transparent": props?.isHighlighted,
        },
      )}
    >
      <div className="mt-0.5">
        <label
          htmlFor={`todoChecked-${checkboxId}`}
          className="cursor-pointer"
          onClick={handlePropagation}
          onPointerDown={handlePropagation}
        >
          <span
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded-full border-2 border-default-500 transition-colors",
              isTodoCompleted ? "border-success bg-success" : "bg-transparent",
            )}
          >
            {isTodoCompleted ? (
              <Icon
                icon="rivet-icons:check"
                className="h-full w-2.5 text-default-50"
                strokeWidth={4}
              />
            ) : null}
          </span>
        </label>

        <input
          type="checkbox"
          className="hidden"
          id={`todoChecked-${checkboxId}`}
          checked={isTodoCompleted}
          onChange={handleTodoCheck}
          disabled={isTodoCheckLoading}
        />
      </div>

      <div className="w-full">
        <div className="flex justify-between gap-3">
          <div className="max-w-[80%]">
            <h3
              className={cn("mb-1 text-sm font-medium text-default-900", {
                "text-default-500": isTodoCompleted,
              })}
            >
              {title}
            </h3>
            <p
              className={cn("text-sm text-default-700", {
                "text-default-500": isTodoCompleted,
              })}
            >
              {description}
            </p>
          </div>
          <div className="h-9">
            <div className="hidden group-hover:block">
              <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
                <DeleteIcon className="size-5" />
              </Button>
              <ConfirmationDialog
                title={`Delete - ${title}?`}
                description="Are you sure you want to delete this todo?"
                alertText="This todo will be permanently removed."
                isOpen={isOpen}
                setIsOpen={setOpen}
                confirmText="Delete"
                isLoading={isLoading}
                onConfirmClick={handleDeleteTodo}
                buttonSize="lg"
              />
            </div>
          </div>
        </div>

        <div className="mt-3 flex w-full gap-3 capitalize">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {/* priority */}
            {!!priority && (
              <div
                className={cn(
                  "flex w-fit items-center justify-center gap-1 rounded-full bg-[#DF1C41] px-2 py-0.5 text-xs font-medium leading-4 text-white",
                  isTodoCompleted ? "bg-[#DF1C41]/50" : "",
                )}
              >
                <span className="size-1 rounded-full bg-white" />
                Priority
              </div>
            )}

            {/* due_date */}
            {!!dueDate &&
              convertUTCToLocal({
                utcDateTime: dueDate,
                format: "MMM DD, YYYY",
              }) ===
                convertUTCToLocal({
                  utcDateTime: new Date()?.toUTCString(),
                  format: "MMM DD, YYYY",
                }) && (
                <div
                  className={cn(
                    isTodoCompleted
                      ? "flex w-fit items-center justify-center rounded-[999px] border border-solid border-default-200 bg-default-100 px-2 py-0.5 text-xs font-medium leading-4 text-[#CDD0D5]"
                      : "flex w-fit items-center justify-center rounded-full bg-[#F8C9D2] px-2 py-0.5 text-xs font-medium leading-4 text-[#710E21]",
                  )}
                >
                  Today
                </div>
              )}

            {/* other tags */}
            {tags?.map((tagItem, index) => (
              <div
                key={index}
                className={cn(
                  isTodoCompleted
                    ? "flex w-fit items-center justify-center rounded-full border border-solid border-default-200 bg-default-200 px-2 py-0.5 text-xs font-medium leading-4 text-[#CDD0D5]"
                    : "flex items-center justify-center rounded-full bg-[#FFDAC2] px-2 py-0.5 text-xs font-medium leading-4 text-[#6E330C]",
                )}
              >
                {tagItem}
              </div>
            ))}
          </div>

          <div
            className={cn(
              "flex flex-none items-center gap-1 text-xs leading-4",
              isTodoCompleted ? "text-[#CDD0D5]" : "text-default-500",
            )}
          >
            <CalenderIcon className="h-4 w-4" />
            {!!dueDate &&
              convertUTCToLocal({
                utcDateTime: dueDate,
              })}
          </div>
        </div>
      </div>
    </li>
  );
}

export default Todo;
