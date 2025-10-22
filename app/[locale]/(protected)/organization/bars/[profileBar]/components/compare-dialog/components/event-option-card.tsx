"use client";
import Image from "next/image";
import { memo, useCallback } from "react";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import { Label } from "@/components/ui/label";

type TEventOptionCardProps = {
  name: string | null;
  image: string | TNullish;
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
  id: TIdOrSlugOrIdentifier<"id">["id"];
  onSelect?: (
    slug: Omit<TEventOptionCardProps, "onSelect" | "isSelected">,
  ) => void;
  isSelected: boolean | TNullish;
};

function EventOptionCard({
  onSelect,
  isSelected,
  id,
  image,
  name,
  slug,
}: TEventOptionCardProps) {
  const handleClick = useCallback(
    () =>
      onSelect?.({
        id,
        image,
        name,
        slug,
      }),
    [id, image, name, slug, onSelect],
  );

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <Image
        src={getImageFallback({
          src: image,
          fallbackImageSize: 300,
        })}
        alt={name || "Event Image"}
        width={204}
        height={152}
        className={cn(
          "h-fit w-full rounded-xl border border-transparent object-center",
          isSelected ? "border-primary" : "",
        )}
      />

      <Label htmlFor={name ?? undefined} className="mt-2 text-sm">
        {name}
      </Label>
    </div>
  );
}

export default memo(EventOptionCard);
