import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";
import RefreshIcon from "@/components/icons/RefreshIcon";
import UploadIcon from "@/components/icons/UploadIcon";
import { Checkbox } from "@/components/ui/checkbox";

export interface IGeneratedImageProps {
  id?: string | number;
  src?: string | null;
  alt?: string | null;
  isSelected?: boolean;
  onSelect?: React.FormEventHandler<HTMLButtonElement> &
    ((checked: boolean) => void);
  onRegenerate?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  isRegenerateLoading?: boolean;
}

function GeneratedImage({
  alt,
  isSelected,
  onSelect,
  onRegenerate,
  src,
  isLoading,
  isRegenerateLoading,
}: IGeneratedImageProps) {
  let content: React.ReactNode = null;
  if (!isLoading) {
    content = (
      <>
        <div className="absolute left-3 top-3 z-[1] h-fit w-fit">
          <Checkbox
            color="success"
            className={cn(
              "size-6 border-2",
              !isSelected ? "border-[#FDB022]" : "",
            )}
            onChange={onSelect}
            checked={isSelected}
          />
        </div>

        <div className="absolute right-3 top-3 z-[1] flex h-fit w-fit gap-2">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-default backdrop-blur"
            onClick={onRegenerate}
            disabled={isRegenerateLoading}
          >
            <UploadIcon
              className={cn(
                "size-5 text-default-700",
                isLoading ? "animate-spin" : "",
              )}
            />
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-default backdrop-blur"
            onClick={onRegenerate}
            disabled={isRegenerateLoading}
          >
            <RefreshIcon
              className={cn(
                "size-5 text-default-700",
                isLoading ? "animate-spin" : "",
              )}
            />
          </button>
        </div>

        <Image
          src={
            src ||
            "/assets/product-2/ai-generated-campaigns/generated-image.svg"
          }
          alt={alt || "Generated Image"}
          height={240}
          width={400}
          className="h-full w-full object-cover"
        />
      </>
    );
  } else if (isLoading) {
    content = (
      <div className="flex h-full w-full items-center justify-center">
        <Image
          src={src || "/assets/product-2/loading.svg"}
          alt={alt || "Generated Image Loading..."}
          width={49}
          height={48}
          className="mx-auto aspect-auto size-12 animate-spin object-contain"
        />
      </div>
    );
  }

  return (
    <div className="relative h-60 w-full overflow-hidden rounded-xl border border-solid border-default-100 bg-default-100 shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]">
      {content}
    </div>
  );
}

export default GeneratedImage;
