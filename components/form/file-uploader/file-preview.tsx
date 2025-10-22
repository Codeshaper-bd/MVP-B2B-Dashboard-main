"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import NotSupported from "./not-supported";
import { calculateFileSize } from "./utils";

function FilePreview({
  file,
  isMultiple,
  singleFullWidth,
}: {
  file: File;
  isMultiple?: boolean;
  singleFullWidth?: boolean;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  useEffect(() => {
    if (file.type.startsWith("image")) {
      const objectUrl = URL.createObjectURL(file);
      setImageSrc(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
        setImageSrc(null);
      };
    }
  }, [file]);

  if (file.type.startsWith("image") && imageSrc) {
    return (
      <div
        className={cn("flex items-center gap-3", {
          "block w-full p-1": singleFullWidth,
        })}
      >
        <div
          className={cn("w-full", {
            "h-16 w-16": isMultiple,
            "h-[170px] w-full": singleFullWidth || !isMultiple,
          })}
        >
          <Image
            width={isMultiple ? 70 : 300}
            height={isMultiple ? 48 : 100}
            alt={file.name}
            src={imageSrc}
            className="h-full w-full rounded-md object-contain"
          />
        </div>
        {isMultiple && (
          <div>
            <h3 className="line-clamp-1 truncate text-wrap break-words text-base font-medium text-default-900">
              {file.name}
            </h3>
            <p className="text-sm text-default-600">
              {calculateFileSize(file.size)}
            </p>
          </div>
        )}
      </div>
    );
  }
  return <NotSupported />;
}

export default FilePreview;
