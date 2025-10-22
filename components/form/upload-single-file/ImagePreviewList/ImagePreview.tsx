import Image from "next/image";

import useObjectURL from "@/hooks/useObjectURL";
import { cn } from "@/lib/utils";

import type { TSingleFile, TUploadSingleFileProps } from "..";

interface ImagePreviewProps
  extends Pick<TUploadSingleFileProps, "previewMode"> {
  file: TSingleFile | null | undefined;
  hidePreviewInside?: boolean;
}

function ImagePreview({
  previewMode,
  file,
  hidePreviewInside,
}: ImagePreviewProps) {
  const { objectUrl, isLoading } = useObjectURL(file?.file);

  if (hidePreviewInside || !file || !file.file) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Image
          src={"/assets/product-2/loading.svg"}
          alt="preview"
          width={49}
          height={48}
          className="h-12 w-12 shrink-0 animate-spin rounded-xl object-contain"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <Image
        alt={file?.file?.name || "preview"}
        width={1000}
        height={300}
        className={cn("h-full w-full rounded-md object-cover", {
          "object-contain": previewMode === "contain",
        })}
        src={objectUrl}
      />
    </div>
  );
}

export default ImagePreview;
