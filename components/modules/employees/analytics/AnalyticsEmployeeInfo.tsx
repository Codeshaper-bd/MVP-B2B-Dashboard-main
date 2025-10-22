"use client";

import type { TUseFetchEmployeePerformanceDataArgs } from "@/hooks/data-fetch/useFetchEmployeePerformanceData";
import { getEmployeeStatusColor } from "@/lib/get-status-colors";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import CrossIcon from "@/components/icons/CrossIcon";
import DocumentIcon from "@/components/icons/DocumentIcon";
import EditEmployeeDialog from "@/components/modules/employees/modals/EditEmployeeDialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SearchEmployee from "../search-employee";
type TEmployeeInfoArgs = {
  showActivity?: boolean;
  setShowActivity?: (show: boolean) => void;
} & TUseFetchEmployeePerformanceDataArgs;

function AnalyticsEmployeeInfo({
  employeeData,
  showActivity,
  setShowActivity,
}: TEmployeeInfoArgs) {
  const getEmployeeInfoData = employeeData?.employee;

  const { id, roles, media, firstName, email, lastName, status } =
    getEmployeeInfoData || {};
  return (
    <Card className="shadow-none">
      <CardHeader className="md:m-0 md:flex-row md:items-center">
        <CardTitle className="flex-1 font-semibold">Employee details</CardTitle>
        <SearchEmployee />
      </CardHeader>

      <div className="mx-6 mb-6 border-b border-default-100" />

      <CardContent>
        <ul className="space-y-3">
          <Avatar className="h-16 w-16 rounded-full">
            <AvatarImage
              src={getImageFallback({
                src: media?.url,
              })}
              alt={`${firstName} ${lastName} profile picture`}
            />
          </Avatar>
          <li className="flex items-center gap-2">
            <div className="w-fit text-base text-default-1000 md:w-[200px]">
              Full name:
            </div>
            <div className="font-medium text-default-1000">
              {firstName} {lastName}
            </div>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-fit text-base text-default-1000 md:w-[200px]">
              Email:
            </div>
            <div className="text-default-700">{email}</div>
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
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <EditEmployeeDialog isEmployeeAnalytics employeeId={id || -1} />
          <Button
            onClick={() => setShowActivity && setShowActivity(!showActivity)}
            color="secondary"
            className="rounded-[8px] !px-3"
          >
            {showActivity ? (
              <span className="flex items-center">
                <CrossIcon className="me-1 size-5" />
                Close Activity History
              </span>
            ) : (
              <span className="flex items-center">
                <DocumentIcon className="me-1 size-5" />
                View Activity History
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AnalyticsEmployeeInfo;
