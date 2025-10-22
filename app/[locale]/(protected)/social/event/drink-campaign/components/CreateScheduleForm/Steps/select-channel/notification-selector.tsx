import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import { Card } from "@/components/ui/card";

const options = [
  {
    id: "email",
    label: "Email",
    icon: "/assets/all/email.png",
    available: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: "/assets/all/instagram.png",
    available: true,
  },
  {
    id: "sms",
    label: "SMS",
    icon: "/assets/all/email.png",
    available: false,
  },
];

export default function NotificationSelector() {
  const [selectedId, setSelectedId] = useState("email");

  return (
    <div className="flex flex-wrap gap-4">
      {options.map(({ id, label, icon, available }) => (
        <Card
          key={id}
          className={cn(
            "relative flex h-[144px] w-[132px] cursor-pointer items-center justify-center border-2",
            {
              "border-primary": id === selectedId,
            },
          )}
          onClick={() => available && setSelectedId(id)}
        >
          <div className="flex flex-col items-center text-center">
            <Image src={icon} alt={label} width={48} height={48} />
            <div className="mt-3 text-base font-medium text-default-1000">
              {label}
            </div>
          </div>

          <CustomRadioGroup
            options={[
              {
                value: id || -1,
                name: "",
                checked: !!id && !!selectedId && id === selectedId,
              },
            ]}
            value={
              !!id && !!selectedId && id === selectedId ? String(id) : undefined
            }
            className="absolute right-2 top-2"
          />
          {!available && (
            <div className="absolute start-0 top-1/2 w-full -translate-y-1/2 bg-gradient-to-r from-[#3BB5F3] via-[#4540EA] to-[#A55DCF] py-1.5 text-center uppercase text-default-1000">
              COMING SOON
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
