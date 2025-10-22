import { placeholderImages } from "@/config/client-config";
import type { TNullish } from "@/store/api/common-api-types";

interface IGetImageFallbackProps {
  src: string | TNullish;
  fallbackImageSize?: keyof typeof placeholderImages;
}

export function getImageFallback({
  src,
  fallbackImageSize = 300,
}: IGetImageFallbackProps): string {
  if (typeof src !== "string" || !src || src?.trim?.() === "") {
    return placeholderImages?.[fallbackImageSize] || "";
  }

  return src;
}
