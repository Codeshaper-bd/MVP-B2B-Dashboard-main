"use client";

import Image from "next/image";
import React from "react";

import { CalendarIcon as CalenderIcon } from "@/components/icons";
import CubeIcon from "@/components/icons/CubeIcon";
import { Card, CardContent } from "@/components/ui/card";

export type TStatus = "scheduled" | "draft" | "published";

export type TCardProps = {
  image: string;
  date: string;
  lastUpdateDate: string;
  title: string;
};

export default function SingleEventCard({
  image,
  date,
  lastUpdateDate,
  title,
}: TCardProps) {
  return (
    <Card className="border-none">
      <CardContent className="p-0">
        <div className="h-[180px] w-full rounded-md">
          <Image
            src={image || ""}
            alt={"image of event"}
            width={415}
            height={300}
            className="size-full rounded-md object-cover"
          />
        </div>
        <div className="space-y-3">
          <h2 className="mt-6 text-lg font-semibold text-default-700">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <CalenderIcon className="size-5" />
            <div className="text-base text-default-700">{date}</div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex flex-1 items-center gap-1">
              <CubeIcon className="size-4" />
              Inventory Last Update
            </span>
            <span className="text-base text-default-700">{lastUpdateDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
