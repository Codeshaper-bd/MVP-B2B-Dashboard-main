import { useCallback, useId } from "react";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { useUpdateTodoMutation } from "@/store/api/todo/todo-api";
import type { TTodo, TTodoStatus } from "@/store/api/todo/todo.types";
import { useToast } from "@/components/ui/use-toast";

const useToggleTodo = (props: TTodo) => {
  const { slug, status } = props || {};
  const [updateTodo, { isLoading: isTodoCheckLoading }] =
    useUpdateTodoMutation();
  const { toast } = useToast();
  const checkboxId = useId();
  const isTodoCompleted = status === "COMPLETED";

  const handlePropagation = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
    },
    [],
  );

  const handleTodoCheck: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      async (event) => {
        const loadingActionText = event?.target?.checked
          ? "Completing"
          : "In-completing";
        const successActionText = event?.target?.checked
          ? "completed"
          : "in-completed";
        const failedActionText = event?.target?.checked
          ? "completing"
          : "in-completing";
        const status: TTodoStatus = event?.target?.checked
          ? "COMPLETED"
          : "NOT_COMPLETED";

        const toastId = toast({
          variant: "loading",
          title: `${loadingActionText} To-Do Item`,
          description: `Please wait while we ${loadingActionText} your todo.`,
        });

        try {
          if (!props) {
            throw new Error(
              "Todo item not found. Please provide a valid todo item.",
            );
          }

          await updateTodo({
            slug,
            body: {
              status,
            },
          }).unwrap();
          toastId?.update({
            id: toastId.id,
            variant: "success",
            title: `Todo item ${successActionText} successfully`,
            description: `Congratulations! You have successfully ${successActionText} your todo.`,
          });
        } catch (error) {
          console.error("🚀 ~ update todo api ~ error:", error);
          toastId?.update({
            id: toastId.id,
            variant: "error",
            ...getApiErrorMessages({
              error,
              title: `Failed to ${failedActionText} todo item`,
              description: "Please try again later.",
            }),
          });
        }
      },
      [slug, toast, updateTodo, props],
    );

  return {
    handleTodoCheck,
    checkboxId,
    isTodoCompleted,
    handlePropagation,
    isTodoCheckLoading,
  };
};

export default useToggleTodo;
