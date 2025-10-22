"use client";

import { cn } from "@/lib/utils";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import PlusIcon from "@/components/icons/PlusIcon";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import CreatePromoterForm from "../forms/CreatePromoterForm";

function CreatePromoterModal() {
  return (
    <DialogContextProvider disableAutoClose>
      <DialogTrigger asChild>
        <Button color="primary" className={cn("h-11 shrink-0 gap-1")}>
          Add Promoter
        </Button>
      </DialogTrigger>

      <CustomizedDialog
        maxWidth="512px"
        mode="grid-bg"
        status="transparent-with-rounded-border"
        title="Add Promoter"
        description="Please provide the required information to complete this form."
        descriptionClassName="pt-0"
        icon={<PlusIcon className="size-5 text-default-700" />}
        childrenContainerClassName="px-3"
        iconRounded="10px"
        withCloseButton
      >
        <div className="no-scrollbar h-fit">
          <CreatePromoterForm />
        </div>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default CreatePromoterModal;
