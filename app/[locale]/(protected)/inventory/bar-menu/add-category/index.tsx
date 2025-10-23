import { DialogDescription } from "@radix-ui/react-dialog";

import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import { PlusIcon as PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import CategoryForm from "./category-form";

function AddCategory() {
  return (
    <DialogContextProvider disableAutoClose>
      <DialogTrigger asChild>
        <Button
          color="primary"
          className="w-[140px] rounded-[8px] px-3.5 py-2.5"
          size="default"
        >
          + Add Category
        </Button>
      </DialogTrigger>
      <CustomizedDialog
        maxWidth="512px"
        mode="grid-bg"
        status="transparent-with-rounded-border"
        title="Add Category"
        icon={<PlusIcon className="size-5 text-default-700" />}
        withCloseButton
      >
        <DialogDescription className="hidden" />
        <CategoryForm />
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default AddCategory;
