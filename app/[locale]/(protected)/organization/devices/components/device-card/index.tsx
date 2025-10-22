"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import DeleteIcon from "@/components/icons/DeleteIcon";
import EditPenIcon from "@/components/icons/EditPenIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import RemoveConfirmDialog from "./remove-dialog";

interface DeviceCardProps {
  image: string;
  isActive: boolean;
  title: string;
  deviceId: string;
  category: string;
}
function DeviceCard({
  image,
  isActive,
  title,
  deviceId,
  category,
}: DeviceCardProps) {
  const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false);
  const handleDelete = () => {
    setIsConfirmDelete(true);
  };
  return (
    <>
      <div className="group overflow-hidden rounded-xl border border-default-100 bg-default transition-shadow hover:shadow-base">
        <div className="relative aspect-[1/0.75] w-full overflow-hidden">
          <Image
            className="object-cover transition-transform group-hover:scale-105"
            alt="device one"
            src={image}
            fill
          />
          <Badge
            color="success"
            className="absolute left-4 top-4 py-0.5 text-xs"
            dot={true}
          >
            Active
          </Badge>
        </div>
        <div className="p-4">
          <div className="mb-5 flex justify-between gap-3 pt-1">
            <h3 className="text-xl">
              <Link href="#" className="transition-colors hover:text-primary">
                {title}
              </Link>
            </h3>
            <button className="shrink-0 text-default-1000 transition-colors hover:text-primary">
              <EditPenIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="mb-5 space-y-2">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-default-700">
              <span className="w-20 shrink-0">Device ID</span> :
              <span className="mt-px">{deviceId}</span>
            </div>
            {category && (
              <div className="flex items-center gap-1.5 text-sm font-semibold text-default-700">
                <span className="w-28 shrink-0">Last Login Time</span> :
                <Link
                  href="#"
                  className="mt-px transition-colors hover:text-primary"
                >
                  {category}
                </Link>
              </div>
            )}
          </div>
          <Button
            color="secondary"
            className="w-full gap-2"
            size="xl"
            onClick={handleDelete}
          >
            <DeleteIcon className="h-5 w-5" /> Remove Device
          </Button>
        </div>
      </div>
      <RemoveConfirmDialog
        isConfirmDelete={isConfirmDelete}
        setIsConfirmDelete={setIsConfirmDelete}
      />
    </>
  );
}

export default DeviceCard;
