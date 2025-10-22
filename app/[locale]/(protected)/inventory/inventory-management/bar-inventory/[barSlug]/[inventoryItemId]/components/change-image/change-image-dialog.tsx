"use client";
import type { TTBarInventoryItemData } from "@/store/api/bar-inventory/bar-inventory.types";
import type { TNullish } from "@/store/api/common-api-types";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import RepeatIcon from "@/components/icons/RepeatIcon";

import ChangeImageForm from "./change-image-form";

interface IChangeImageDialogProps {
  open: boolean;
  setOpen?: React.Dispatch<
    React.SetStateAction<boolean | void | null | undefined>
  >;
  item?: TNullish | TTBarInventoryItemData;
}

function ChangeImageDialog({ item, open, setOpen }: IChangeImageDialogProps) {
  return (
    <DialogContextProvider disableAutoClose open={open} onOpenChange={setOpen}>
      <CustomizedDialog
        maxWidth="512px"
        mode="grid-bg"
        status="transparent-with-rounded-border"
        title="Change Images"
        description="Select a new image for this category below."
        icon={<RepeatIcon className="size-5 text-default-700" />}
        withCloseButton
      >
        <ChangeImageForm item={item} />
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default ChangeImageDialog;
