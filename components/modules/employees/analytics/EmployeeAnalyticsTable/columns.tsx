"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { getEmployeeStatusColor } from "@/lib/get-status-colors";
import { cn } from "@/lib/utils";
import type { TEmployee } from "@/store/api/employees/employees.types";
import TablePageNumber from "@/components/features/TablePageNumber";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<TEmployee>[] = [
  {
    id: "serial",
    header: "NO",
    cell: TablePageNumber,
    size: 50,
  },
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row: { original } }) => (
      <div className="flex items-center gap-3">
        <Avatar className="border-[0.75px] border-[#FFFFFF1F] bg-default-100">
          <AvatarImage
            src={original?.media?.url ?? ""}
            alt={`${original.firstName} ${original.lastName}`}
          />
          <AvatarFallback>
            {original.firstName?.charAt(0).toUpperCase()}
            {original?.lastName?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="whitespace-nowrap text-default-900">
            {original.firstName} {original.lastName}
          </span>
          <span className="whitespace-nowrap lowercase text-default-600">
            {original.email}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          className={cn(
            "flex max-w-fit items-center gap-2 border-[#085D3A] bg-[#053321] font-medium text-[#75E0A7]",
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
          {status as string}
        </Badge>
      );
    },
  },
  {
    accessorKey: "roles",
    header: "Role",
    cell: ({ row }) => {
      const roles = row.getValue("roles") as { id: number; name: string }[];

      if (!roles || roles.length === 0) {
        return <span>No Role</span>;
      }

      return (
        <div className="flex flex-wrap gap-1">
          {roles.map((role) => (
            <Badge
              key={role.id}
              className={cn("font-medium", getEmployeeStatusColor(role?.name))}
            >
              {role.name}
            </Badge>
          ))}
        </div>
      );
    },
    size: 150,
  },
  {
    accessorKey: "id",
    header: () => <div className="text-end text-default-600">ACTION</div>,
    // cell: EmployeeAction,
    cell: ({ row: { original } }) => (
      <div className={cn("flex items-center justify-end gap-4")}>
        <Link
          href={`./view-employment-analytics/${original.id}`}
          className="text-sm font-semibold text-primary"
        >
          View Analytics
        </Link>
      </div>
    ),
  },
];
