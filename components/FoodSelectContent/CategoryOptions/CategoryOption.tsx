"use client";
import Image from "next/image";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import type { TBarMenu } from "@/store/api/bar-menu/bar-menu.types";

export interface ICategoryOptionProps extends TBarMenu {
  // id?: string | number;
  // image?: string;
  // title?: string;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    data: TBarMenu | undefined | null,
  ) => void;
  selectedSlug: string | undefined | null;
}

type THandleClick = (props: {
  data: TBarMenu | undefined | null;
  onClick?: ICategoryOptionProps["onClick"];
  selectedSlug: ICategoryOptionProps["selectedSlug"];
}) => (e: React.MouseEvent<HTMLDivElement>) => void;

function CategoryOption(props: ICategoryOptionProps) {
  const { slug, media, name, onClick, selectedSlug } = props;
  const isSelected =
    selectedSlug !== null &&
    selectedSlug !== undefined &&
    // selectedSlug !== -1 &&
    selectedSlug !== "" &&
    selectedSlug !== " " &&
    String(slug) === String(selectedSlug);

  const handleClick: THandleClick =
    ({ data, onClick, selectedSlug }) =>
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (data === null || data === undefined) {
        return;
      }

      if (
        selectedSlug !== null &&
        selectedSlug !== undefined &&
        // selectedSlug !== -1 &&
        selectedSlug !== "" &&
        selectedSlug !== " " &&
        data?.id !== null &&
        data?.id !== undefined &&
        data?.id !== -1 &&
        String(data?.id) === String(selectedSlug)
      ) {
        onClick?.(e, null);
        return;
      }

      onClick?.(e, data);
    };

  return (
    <div
      className="group shrink-0 cursor-pointer space-y-3.5"
      onClick={handleClick({ data: props, onClick, selectedSlug })}
    >
      <div
        className={cn(
          "relative aspect-[1.462068965517241] h-full w-[106px] overflow-hidden rounded-[6.758px] border-2 border-solid border-transparent transition-all duration-300 ease-linear",
          isSelected ? "border-primary" : "group-hover:border-primary/80",
        )}
      >
        <Image
          src={
            getImageFallback({ src: media?.url, fallbackImageSize: 100 }) || ""
          }
          width={106}
          height={73}
          alt={name || "drink"}
          className="h-full w-full object-cover"
        />
      </div>

      <p
        className={cn(
          "text-wrap break-words text-center text-sm font-medium leading-5 text-white transition-all duration-300 ease-linear",
          isSelected ? "text-primary" : "group-hover:text-primary/80",
        )}
      >
        {name}
      </p>
    </div>
  );
}

export default CategoryOption;
