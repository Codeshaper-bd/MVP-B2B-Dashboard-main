"use client";

import type { Dispatch, SetStateAction } from "react";

import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import { PlusIcon as PlusIcon } from "@/components/icons";

import EditPromoterForm from "../forms/EditPromoterForm";

export interface IEditPromoterModalProps {
  userId: string | number | null | undefined;
  open: boolean;
  setOpen:
    | Dispatch<SetStateAction<boolean | void | null | undefined>>
    | null
    | undefined;
}

function EditPromoterModal({ userId, open, setOpen }: IEditPromoterModalProps) {
  return (
    <DialogContextProvider disableAutoClose open={open} onOpenChange={setOpen}>
      <CustomizedDialog
        maxWidth="512px"
        mode="grid-bg"
        status="transparent-with-rounded-border"
        title="Edit Promoter"
        description="Please provide the required information to complete this form."
        descriptionClassName="pt-0"
        icon={<PlusIcon className="size-5 text-default-700" />}
        childrenContainerClassName="px-3"
        iconRounded="10px"
        withCloseButton
      >
        <div className="no-scrollbar xl:min-h-[550px]">
          <EditPromoterForm userId={userId} />
        </div>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default EditPromoterModal;
