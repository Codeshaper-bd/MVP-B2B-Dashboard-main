"use client";
import Image from "next/image";
import React, { useState } from "react";

import CheckIcon from "@/components/icons/CheckIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { deviceData } from "./data";
import OpenDeactiveModal from "./OpenDeactiveModal";

const deviceCategory = [
  {
    name: "Bartender",
    value: "bartender",
  },
  {
    name: "Guestlist",
    value: "guestlist",
  },
  {
    name: "Coatcheck",
    value: "coatcheck",
  },
];
export default function DeviceContent() {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [id, setId] = useState<number | null>(null);
  const [actionConfirm, setActionConfirm] = useState<boolean>(false);

  const handleCategoryChange = (value: string) => {
    if (selectedCategory.includes(value)) {
      setSelectedCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSelectedCategory((prev) => [...prev, value]);
    }
  };

  const activeStatusHandler = (id: number, status: string) => {
    setOpenPopup(true);
    setType(status);
    setId(id);
  };

  return (
    <div>
      <div className="flex flex-col justify-start gap-3 md:flex-row md:items-center">
        <p className="text-sm font-normal text-white">Select Category</p>
        <div className="flex flex-col gap-4 md:w-8/12 md:flex-row md:items-center">
          {deviceCategory.map((item, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-between gap-4 rounded-lg border border-secondary px-2 py-2 md:w-3/12"
            >
              <Label
                htmlFor={item.value}
                className="flex w-full cursor-pointer items-center justify-between gap-4 text-base font-normal text-default-700"
              >
                <span>{item.name}</span>
                <Checkbox
                  id={item.value}
                  checked={selectedCategory.includes(item.value)}
                  onChange={(value) => {
                    handleCategoryChange(item.value);
                  }}
                  color="success"
                />
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-start gap-4 py-6 md:flex-row">
        {deviceData.map((item, index: number) => (
          <div
            key={index}
            className="relative rounded-lg border border-secondary"
          >
            <Image src={item.image} alt={item.title} className="rounded-t-lg" />
            <Badge
              color={item.status === "Active" ? "success" : "waringTwo"}
              className={`absolute left-2 top-2 border py-[1px] text-[12px] text-sm font-normal ${item.status === "Active" ? "text-[#75E0A7]" : "text-[#F7B27A]"}`}
            >
              <div
                className={`mr-2 h-1.5 w-1.5 rounded-full ${item.status === "Active" ? "bg-[#75E0A7]" : "bg-[#F7B27A]"}`}
              ></div>
              {item.status}
            </Badge>
            <Badge className="absolute right-2 top-2 border border-[#1849A9] bg-[#102A56] py-[1px] text-[12px] text-sm font-normal text-[#84CAFF]">
              <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#2E90FA]"></div>
              {item.category}
            </Badge>
            <div className="p-4">
              <p className="text-xl font-semibold text-white">{item.title}</p>
              <p className="mt-3 text-sm text-white">
                Current User <span className="ml-3">:</span> {item.userName}
              </p>
            </div>
            <div className="mb-4 flex items-center justify-between gap-4 px-4">
              <Button
                onClick={() => activeStatusHandler(item.id, "ping")}
                className="flex w-1/2 items-center gap-2 bg-default-50 py-[17px] hover:bg-default-100 md:py-[23px]"
              >
                Ping
              </Button>
              <Button
                onClick={() => activeStatusHandler(item.id, item.status)}
                className="flex w-1/2 items-center gap-2 bg-default-50 py-[17px] hover:bg-default-100 md:py-[23px]"
              >
                {item.status === "Active" ? "Deactivate" : "Active"}
              </Button>
            </div>
          </div>
        ))}
      </div>
      {openPopup && (
        <OpenDeactiveModal
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          type={type}
          id={id}
          setActionConfirm={setActionConfirm}
        />
      )}

      {/* modal action successfull  */}

      <AlertDialog open={actionConfirm} onOpenChange={setActionConfirm}>
        <StatusAlert
          status="success"
          withCloseButton
          icon={<CheckIcon className="size-5 text-black" />}
          title={
            type === "ping"
              ? "Ping Successful"
              : type === "Active"
                ? "Successful Deactivation"
                : "Successful Activation"
          }
          description={
            type === "ping"
              ? "The device has responded successfully to the ping."
              : type !== "Active"
                ? "This device Activate Successfully"
                : "the device is now inactive and has been removed from your active devices list."
          }
        >
          <div className="w-full gap-3">
            <Button
              fullWidth
              color="primary"
              onClick={() => setActionConfirm(false)}
            >
              Okay
            </Button>
          </div>
        </StatusAlert>
      </AlertDialog>
    </div>
  );
}
