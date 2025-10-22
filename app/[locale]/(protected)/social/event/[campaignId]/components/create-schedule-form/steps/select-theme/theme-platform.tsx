import Image from "next/image";

import { cn } from "@/lib/utils";

export interface IThemePlatformProps {
  id: string | number | null | undefined;
  selectedId: string | number | null | undefined;
  image: string | null | undefined;
  name: string | null | undefined;
  onClick?: (
    value: Omit<IThemePlatformProps, "selectedId" | "onClick">,
  ) => void;
}
function ThemePlatform({
  id,
  selectedId,
  image,
  name,
  onClick,
}: IThemePlatformProps) {
  return (
    <div
      className={cn(
        "relative flex h-52 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-transparent hover:border-primary",
        {
          "border-primary": selectedId === id,
        },
      )}
      onClick={() =>
        onClick?.({
          id,
          image,
          name,
        })
      }
    >
      <Image
        src={image || ""}
        alt={`${name} Icon`}
        width={400}
        height={400}
        className="h-full w-full object-cover"
      />

      {/* Positioned Text */}
      <h1 className="absolute bottom-6 left-7 line-clamp-2 break-words text-lg font-bold text-white">
        {name}
      </h1>
    </div>
  );
}

export default ThemePlatform;
