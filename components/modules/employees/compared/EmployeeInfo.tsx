"use client";

import type { TUseFetchEmployeePerformanceDataArgs } from "@/hooks/data-fetch/useFetchEmployeePerformanceData";
import { getEmployeeStatusColor } from "@/lib/get-status-colors";
import { cn } from "@/lib/utils";
import CrossIcon from "@/components/icons/CrossIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SearchEmployee from "../search-employee";

type TEmployeeInfoArgs = {
  showActivity?: boolean;
  isFromCompare?: boolean | undefined;
  setShowActivity?: (show: boolean) => void;
} & TUseFetchEmployeePerformanceDataArgs;

function EmployeeInfo({
  employeeData,
  showActivity,
  setShowActivity,
  isFromCompare,
}: TEmployeeInfoArgs) {
  const getEmployeeInfoData = employeeData?.employee;
  /* get all employeesInfo */
  const { roles, firstName, lastName, status } = getEmployeeInfoData || {};
  return (
    <Card className="shadow-none">
      <CardHeader className="md:m-0 md:flex-row md:items-center">
        <CardTitle className="flex-1 font-semibold">Employee details</CardTitle>
        <SearchEmployee isFromCompare={isFromCompare} />
      </CardHeader>

      <div className="mx-6 mb-6 border-b border-default-100" />

      <CardContent>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            <div className="w-fit text-base text-default-1000 md:w-[200px]">
              Employee:
            </div>
            <div className="text-default-1000">
              {firstName} {lastName}
            </div>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-fit text-base text-default-1000 md:w-[200px]">
              Role:
            </div>
            <div className="flex flex-wrap gap-2">
              {roles?.map((role, index) => (
                <Badge
                  key={`role-${index}`}
                  className={cn(getEmployeeStatusColor(role?.name))}
                >
                  {role?.name}
                </Badge>
              ))}
            </div>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-fit text-base text-default-1000 md:w-[200px]">
              Status:
            </div>
            <div className="">
              <Badge color={status === "Active" ? "success" : "waringTwo"}>
                {status}
              </Badge>
            </div>
          </li>
        </ul>
        <Button
          onClick={() => setShowActivity && setShowActivity(!showActivity)}
          className="mt-5"
          color="primary"
        >
          {showActivity ? (
            <span className="flex items-center">
              <CrossIcon className="me-1 size-4 text-primary-foreground" />
              Close Activity History
            </span>
          ) : (
            "View Activity History"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

export default EmployeeInfo;
