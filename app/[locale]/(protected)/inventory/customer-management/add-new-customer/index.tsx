"use client";

import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import CustomerIcon from "@/components/icons/sidebar/CustomerIcon";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import CustomerForm from "./customer-form";

function AddNewCustomer() {
  return (
    <DialogContextProvider disableAutoClose>
      <DialogTrigger asChild>
        <Button color="primary" size="default">
          + Add New Customer
        </Button>
      </DialogTrigger>
      <CustomizedDialog
        maxWidth="512px"
        mode="grid-bg"
        status="transparent-with-rounded-border"
        title="Add - Customer"
        description="Please provide the required information to complete this form."
        icon={<CustomerIcon className="size-5 text-default-700" />}
        withCloseButton
      >
        <CustomerForm />
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default AddNewCustomer;
