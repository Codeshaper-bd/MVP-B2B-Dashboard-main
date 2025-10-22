"use client";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import CrossIcon from "@/components/icons/CrossIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import CompareForm, { type TCompareIdProps } from "./compare-form";

function CompareEmployeeDialog() {
  const { getAParamValue, updateAParam } =
    useManageSearchParams<TCompareIdProps>();
  const compareEmployeeId = getAParamValue("compareEmployeeId");
  if (compareEmployeeId) {
    return (
      <Button
        type="button"
        color="primary"
        className="capitalize"
        onClick={() =>
          updateAParam({ key: "compareEmployeeId", value: undefined })
        }
      >
        <CrossIcon className="me-1 size-4 text-primary-foreground" /> Clear
        Compare
      </Button>
    );
  }
  return (
    <DialogContextProvider>
      <DialogTrigger asChild>
        <Button type="button" color="primary" className="capitalize">
          Compare Employees
        </Button>
      </DialogTrigger>

      <CustomizedDialog
        maxWidth="400px"
        mode="ring-bg"
        title="Compare Employees"
        description=""
        descriptionClassName="pt-0"
        icon={<UsersIcon className="size-5 text-primary-foreground" />}
        childrenContainerClassName="px-3"
        withCloseButton
      >
        <div className="px-2">
          <CompareForm />
        </div>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default CompareEmployeeDialog;
