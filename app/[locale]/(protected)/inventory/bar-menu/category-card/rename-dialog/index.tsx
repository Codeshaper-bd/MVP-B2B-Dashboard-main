"use client";

import type { TBarMenu } from "@/store/api/bar-menu/bar-menu.types";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import TextInputIcon from "@/components/icons/TextInputIcon";

import RenameForm from "./rename-form";

interface Props {
  open: boolean;
  setOpen?: React.Dispatch<
    React.SetStateAction<boolean | void | null | undefined>
  >;
  item: TBarMenu;
}
function RenameDialog({ item, open, setOpen }: Props) {
  return (
    <DialogContextProvider disableAutoClose open={open} onOpenChange={setOpen}>
      <CustomizedDialog
        maxWidth="512px"
        mode="grid-bg"
        status="transparent-with-rounded-border"
        title="Rename"
        description="Enter a new name for this category below."
        icon={<TextInputIcon className="size-5 text-default-700" />}
        withCloseButton
      >
        <RenameForm item={item} />
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default RenameDialog;
