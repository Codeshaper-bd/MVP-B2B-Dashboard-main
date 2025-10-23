"use client";
import { useState } from "react";

import { PlusIcon as PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

import CreateDevice from "./create-device";

function CreateDevices() {
  const [open, setOpen] = useState<boolean | void | null | undefined>(false);
  return (
    <>
      <Button
        color="primary"
        rounded="lg"
        className="flex gap-1.5 md:px-4"
        onClick={() => setOpen(true)}
      >
        <PlusIcon className="size-5" /> Add Device
      </Button>
      <CreateDevice open={!!open} setOpen={setOpen} />
    </>
  );
}

export default CreateDevices;
