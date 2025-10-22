"use client";
import { useState } from "react";

import SelectInput from "@/components/SelectInput";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
const options = [
  {
    label: "20 minutes before closing",
    value: "20",
  },
  {
    label: "10 minutes before closing",
    value: "10min",
  },
  {
    label: "At Closing",
    value: "atClosing",
  },
  {
    label: "5 minutes after closing",
    value: "5min",
  },
  {
    label: "10 minutes after closing ",
    value: "10min",
  },
  {
    label: "20 minutes after closing ",
    value: "20min",
  },
];
function AutoLockForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="flex-none">
          <Switch color="success" id="guestList" onCheckedChange={setIsOpen} />
        </div>
        <div className="max-w-[412px] flex-1">
          <Label htmlFor="guestList">Auto-lock for Guestlist Fennec Live</Label>
          {isOpen && (
            <div className="mt-3 space-y-3">
              <SelectInput
                label="Latest Add to Guestlist"
                options={options}
                placeholder="Select closing Time"
              />
              <SelectInput
                label="Latest Guest Check-In"
                options={options}
                placeholder="Select Check in Time"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-none">
          <Switch color="success" id="barTender" onCheckedChange={setIsOpen2} />
        </div>
        <div className="max-w-[412px] flex-1">
          <Label htmlFor="barTender">Auto-lock for Bartender Access</Label>
          {isOpen2 && (
            <div className="mt-3 space-y-3">
              <SelectInput
                options={options}
                placeholder="Select closing Time"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AutoLockForm;
