"use client";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { cn } from "@/lib/utils";
import type { TGetAllEmployeesArgs } from "@/store/api/employees/employees.types";
import { Tag } from "@/components/ui/tag";

function EmployeeFiltersValue() {
  const { updateMultipleParam, getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllEmployeesArgs, void>>();

  const { status, role } = getAllParamValue();

  return (
    <div className="flex flex-wrap justify-end gap-3">
      {status && (
        <Tag
          label={status}
          onRemove={() => updateMultipleParam({ status: undefined })}
          className={cn({
            statusGreen: status === "Active",
            statusOrange: status === "Pending",
          })}
          iconClass={cn({
            "text-green-500": status === "Active",
            "text-orange-500": status === "Pending",
          })}
        />
      )}

      {role && (
        <Tag
          label={role.split(",").join(", ")}
          onRemove={() => updateMultipleParam({ role: undefined })}
          className="statusBlue"
          iconClass="text-blue-500"
        />
      )}
    </div>
  );
}

export default EmployeeFiltersValue;
