"use client";

import { useRef, useState } from "react";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import MailIcon from "@/components/icons/MailIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import CustomerInviteForms from "../forms/CustomerInviteForm";

function CustomerInviteDialog() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <DialogContextProvider disableAutoClose>
      <DialogTrigger asChild>
        <Button type="button" color="primary" size="lg">
          <MailIcon className="me-1.5 h-4 w-4" /> Invite Customer
        </Button>
      </DialogTrigger>

      <CustomizedDialog
        maxWidth="512px"
        mode="grid-bg"
        status="transparent-with-rounded-border"
        title="Invite Customer"
        description=""
        descriptionClassName="pt-0"
        icon={<UsersIcon className="size-5 text-default-700" />}
        childrenContainerClassName="px-3"
        withCloseButton
      >
        <DialogDescription className="hidden" />
        <ScrollArea className="h-[calc(100vh-26.5rem)] px-3 md:h-fit">
          <CustomerInviteForms
            ref={submitButtonRef}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        </ScrollArea>

        <CustomizedDialog.Buttons>
          <CustomizedDialog.Buttons.SecondaryButton
            size="lg"
            disabled={isSubmitting}
          >
            Cancel
          </CustomizedDialog.Buttons.SecondaryButton>

          <CustomizedDialog.Buttons.PrimaryButton
            onClick={() => submitButtonRef.current?.click()}
            disabled={isSubmitting}
            size="lg"
          >
            <ButtonLoadingContent
              isLoading={isSubmitting}
              actionContent="Submit"
            />
          </CustomizedDialog.Buttons.PrimaryButton>
        </CustomizedDialog.Buttons>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default CustomerInviteDialog;
