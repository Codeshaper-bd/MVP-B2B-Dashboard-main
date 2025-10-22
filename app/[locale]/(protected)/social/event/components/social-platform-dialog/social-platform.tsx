import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import { Button } from "@/components/ui/button";

export interface ISocialPlatformProps {
  id: string | number | null | undefined;
  selectedId: string | number | null | undefined;
  image: string | null | undefined;
  name: string | null | undefined;
  isComingSoon: boolean | null | undefined;
  onClick?: (
    value: Omit<ISocialPlatformProps, "selectedId" | "onClick">,
  ) => void;
}

function SocialPlatform({
  id,
  selectedId,
  image,
  name,
  isComingSoon,
  onClick,
}: ISocialPlatformProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-transparent transition-opacity duration-300 hover:border-primary",
        {
          "border-primary": selectedId === id,
          // "opacity-50": isComingSoon,
        },
      )}
      onClick={() =>
        onClick?.({
          id,
          image,
          name,
          isComingSoon,
        })
      }
    >
      {/* CustomRadioGroup Positioned at the Top Right */}
      <div
        className={cn("absolute right-[6px] top-[6px]", {
          "!opacity-60": isComingSoon,
        })}
      >
        <CustomRadioGroup
          options={[
            {
              value: id || -1,
              name: name || "",
              checked: !!id && !!selectedId && id === selectedId,
            },
          ]}
          onChange={() => {
            onClick?.({
              id,
              image,
              name,
              isComingSoon,
            });
          }}
          value={
            !!id && !!selectedId && id === selectedId ? String(id) : undefined
          }
          className="flex items-center justify-center"
        />
      </div>

      {/* Social Media Icon */}
      <Image
        src={image || ""}
        alt={`${name} Icon`}
        width={50}
        height={50}
        className={cn("rounded-[12px] object-cover", {
          "!opacity-80": isComingSoon,
        })}
      />

      {/* Platform Name */}
      <h1 className="mt-3 text-sm capitalize text-default-1000">{name}</h1>

      {isComingSoon && (
        <Button className="absolute left-0 w-full overflow-hidden rounded-none border-none bg-gradient-to-r from-[#3BB5F3] via-[#4540EA] to-[#A55DCF] px-4 py-2 text-center font-semibold text-white">
          <Image
            src="/assets/social-svg/GridientSVG/1.svg"
            alt="this is image"
            width={59}
            height={51.5}
          />
          Coming Soon
          <Image
            src="/assets/social-svg/GridientSVG/2.svg"
            alt="this is image"
            width={59}
            height={51.5}
          />
        </Button>
      )}
    </div>
  );
}

export default SocialPlatform;
