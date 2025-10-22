"use client";

import Image from "next/image";

import CustomizedDialog from "@/components/CustomizedDialog";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import DeviceIcon from "@/components/icons/DeviceIcon";

type TChallengeType = "admin" | "bar" | "check" | "guest";
type TChallengeTypeOption = {
  label: string;
  value: TChallengeType;
};

export const typeOfChallengeOptions: TChallengeTypeOption[] = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Bar",
    value: "bar",
  },
  {
    label: "Check",
    value: "check",
  },
  {
    label: "Guest List",
    value: "guest",
  },
];

interface CreateDeviceProps {
  open: boolean;
  setOpen: React.Dispatch<
    React.SetStateAction<boolean | void | null | undefined>
  >;
}

function CreateDevice({ open, setOpen }: CreateDeviceProps) {
  return (
    <DialogContextProvider open={open} onOpenChange={setOpen}>
      <CustomizedDialog
        maxWidth="512px"
        status="transparent-with-rounded-border"
        mode="grid-bg"
        position="left"
        title="Display Organization QR"
        description="Please select category and scan QR Code with device will be connected"
        icon={<DeviceIcon className="size-6" />}
        withCloseButton
        iconRounded="10px"
        descriptionClassName="pt-0"
        onClose={({ setClose }) => {
          setClose();
        }}
      >
        <div className="space-y-5">
          {/* <SelectReact options={typeOfChallengeOptions} /> */}
          <div className="flex justify-center rounded-lg bg-default-50 p-7">
            <div className="relative aspect-square w-[294px] overflow-hidden rounded-lg">
              <Image
                className="object-cover transition-transform group-hover:scale-105"
                alt="QR Code"
                src="/images/devices/qr-code.png"
                fill
              />
            </div>
          </div>
        </div>
      </CustomizedDialog>
    </DialogContextProvider>
  );
}

export default CreateDevice;
