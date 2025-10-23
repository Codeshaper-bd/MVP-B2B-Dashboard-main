"use client";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import ListIcon from "@/components/icons/ListIcon";
import { PlusIcon as PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import CreateTodoForm from "./create-todo-form";

type TCreateTodoModalProps = {
  triggerTarget?: React.ReactNode;
  builtInTriggerOptions?: "small-icon-button" | "large-icon-text-button";
};

function CreateTodoModal({
  builtInTriggerOptions = "small-icon-button",
  triggerTarget = null,
}: TCreateTodoModalProps) {
  let triggerTargetOptionContent: React.ReactNode = null;
  if (builtInTriggerOptions === "small-icon-button") {
    triggerTargetOptionContent = (
      <Button color="secondary" size="icon" className="h-9 w-9">
        <PlusIcon className="size-5 text-default-700" />
      </Button>
    );
  } else if (builtInTriggerOptions === "large-icon-text-button") {
    triggerTargetOptionContent = (
      <Button color="primary">
        <PlusIcon className="me-1 h-3.5 w-3.5 text-primary-foreground" />
        Create New List
      </Button>
    );
  }

  return (
    <DialogContextProvider>
      <DialogTrigger asChild>
        {triggerTarget || triggerTargetOptionContent}
      </DialogTrigger>

      <CustomizedDialog
        maxWidth="512px"
        status="transparent-with-rounded-border"
        mode="grid-bg"
        position="left"
        title="Add To-Do List"
        description="Please provide the required information to complete this form."
        icon={<ListIcon className="size-5" />}
        withCloseButton
        iconRounded="10px"
        descriptionClassName="pt-0"
      >
        <div className="custom-scrollbar max-h-[65vh]">
          <CreateTodoForm />
        </div>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default CreateTodoModal;
