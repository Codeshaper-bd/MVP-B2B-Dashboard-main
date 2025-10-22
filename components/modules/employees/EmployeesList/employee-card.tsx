import { memo, useState } from "react";

import useGetLoggedInUser from "@/hooks/feature/useGetLoggedInUser";
import { getEmployeeStatusColor } from "@/lib/get-status-colors";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import {
  isEventCompanyAdmin,
  isEventCompanyCoAdmin,
  isNightClubAdmin,
  isNightClubCoAdmin,
} from "@/lib/user/checkAuth";
import { cn } from "@/lib/utils";
import type { TEmployee } from "@/store/api/employees/employees.types";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import NetworkBarIcon from "@/components/icons/NetworkBarIcon";
import { useRouter } from "@/components/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import DeleteEmployeeDialog from "./delete-employees-dialog";
import EditEmployeeDialog from "../modals/EditEmployeeDialog";

type TEmployeeCardProps = TEmployee & {};

function EmployeeCard({
  firstName,
  lastName,
  id,
  email,
  media,
  roles,
  status,
  phone,
}: TEmployeeCardProps) {
  const [open, setOpen] = useState<boolean>(false);
  const loggedInUser = useGetLoggedInUser();
  const router = useRouter();

  const isLoggedInAdmin =
    isNightClubAdmin(loggedInUser) || isEventCompanyAdmin(loggedInUser);
  const isLoggedInCoAdmin =
    isNightClubCoAdmin(loggedInUser) || isEventCompanyCoAdmin(loggedInUser);

  const isCurrentUser = loggedInUser?.id === id;

  const isEmployeeCoAdmin =
    roles?.some((role) => role.name === "Co-Admin") ?? false;

  let showDelete = false;

  if (isLoggedInAdmin) {
    showDelete = !isCurrentUser;
  } else if (isLoggedInCoAdmin) {
    showDelete = !isEmployeeCoAdmin;
  }

  return (
    <>
      <Card
        onClick={() => router.push(`./view-employees/${id}`)}
        className="group cursor-pointer hover:border-primary"
      >
        <CardContent className="relative p-6">
          <div className="absolute end-6 top-6 flex items-center gap-2">
            {status === "Pending" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="size-4 cursor-pointer text-default-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <TooltipArrow className="w-4 fill-default" />
                    <p>Employee Accounts activates with initial sign-in</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <Badge
              className={cn(
                "flex items-center gap-2 border-[#085D3A] bg-[#053321] text-[#75E0A7]",
                {
                  "border-[#93370D] bg-[#4E1D09] text-[#FEC84B]":
                    status === "Pending",
                },
              )}
            >
              <span
                className={cn("size-2 rounded-full bg-[#17B26A]", {
                  "bg-[#FEC84B]": status === "Pending",
                })}
              ></span>
              {status}
            </Badge>
          </div>

          <Avatar className="h-16 w-16 rounded-full">
            <AvatarImage
              src={getImageFallback({
                src: media?.url,
              })}
              alt={`${firstName} ${lastName} profile picture`}
            />
          </Avatar>

          <h2 className="mb-1 mt-4 text-base font-medium text-default-1000 group-hover:text-primary">
            {firstName} {lastName}
          </h2>

          <div className="flex items-center gap-2">
            <EmailIcon className="size-5 text-default-600" />
            <span className="text-sm text-default-700">{email}</span>
          </div>

          {/* bottom content */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <div className="flex flex-1 flex-wrap items-center gap-1">
              {roles?.map((role, index) => (
                <Badge
                  key={`role-badge-${index}`}
                  className={cn(getEmployeeStatusColor(role?.name))}
                >
                  {role?.name}
                </Badge>
              ))}
            </div>

            <div className="flex flex-none items-center justify-end gap-2">
              {status !== "Pending" && (
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    router.push(`./view-employment-analytics/${id}`);
                  }}
                  type="button"
                  variant="ghost"
                  size="icon"
                  color="primary"
                  className="text-success hover:text-default"
                  rounded="full"
                  disabled
                >
                  <NetworkBarIcon className="size-5" />
                </Button>
              )}
              {showDelete && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  color="primary"
                  className="text-default-600"
                  rounded="full"
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpen(true);
                  }}
                >
                  <DeleteIcon className="size-5" />
                </Button>
              )}

              <div onClick={(event) => event.stopPropagation()}>
                <EditEmployeeDialog employeeId={id || -1} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <DeleteEmployeeDialog
        id={id || -1}
        firstName={firstName}
        lastName={lastName}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

export default memo(EmployeeCard);
