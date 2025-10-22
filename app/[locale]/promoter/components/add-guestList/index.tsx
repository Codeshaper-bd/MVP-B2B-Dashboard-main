import { DialogDescription } from "@radix-ui/react-dialog";

import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import UsersIcon from "@/components/icons/UsersIcon";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import GuestListForm from "./guestList-form";

function AddGuestList() {
  return (
    <DialogContextProvider disableAutoClose>
      <DialogTrigger asChild>
        <Button
          color="primary"
          className="w-[140px] rounded-[8px] px-3.5 py-2.5"
          size="44"
        >
          + Add GuestList
        </Button>
      </DialogTrigger>
      <CustomizedDialog
        maxWidth="512px"
        mode="grid-bg"
        status="transparent-with-rounded-border"
        title="Add Guestlist"
        description="Please provide the required information to complete this form."
        icon={<UsersIcon className="size-5 text-default-700" />}
        withCloseButton
      >
        <DialogDescription className="hidden" />
        <GuestListForm />
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default AddGuestList;
