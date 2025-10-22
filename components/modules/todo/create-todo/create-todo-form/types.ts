import type { TCreateTodoArgs } from "@/store/api/todo/todo.types";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

export type TOptionType = {
  value: string;
  label: string;
};

export type TGroupOptionType = {
  label: string;
  options: TOptionType[];
};

export type TFormInputs = Omit<TCreateTodoArgs, "tags" | "dueDate"> & {
  tags: IOption[];
  dueDate: Date | null;
};
