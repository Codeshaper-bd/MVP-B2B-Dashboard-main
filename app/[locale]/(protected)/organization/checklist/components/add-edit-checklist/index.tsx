"use client";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import FlashIcon from "@/components/icons/FlashIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import SquarePenIcon from "@/components/icons/SquarePenIcon";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import Form from "./form";

interface IProps {
  id?: number | string;
}
function AddEditChecklist({ id }: IProps) {
  return (
    <DialogContextProvider disableAutoClose>
      <DialogTrigger asChild>
        <div className="flex-none">
          {id ? (
            <button
              type="button"
              className="inline-flex items-center gap-1 text-primary"
            >
              <SquarePenIcon className="me-1 size-4" />
              Edit
            </button>
          ) : (
            <Button type="button" color="primary" size="md">
              <PlusIcon className="me-1 size-4 text-default" />
              Add Checklist
            </Button>
          )}
        </div>
      </DialogTrigger>

      <CustomizedDialog
        maxWidth="512px"
        mode="grid-bg"
        status="transparent-with-rounded-border"
        title="Add Checklist Task"
        description="Create Custom Action Item for Checklist"
        descriptionClassName="pt-0"
        icon={<FlashIcon className="size-5 text-default-700" />}
        childrenContainerClassName="px-3"
        withCloseButton
      >
        <div className="px-2">
          <Form />
        </div>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default AddEditChecklist;
