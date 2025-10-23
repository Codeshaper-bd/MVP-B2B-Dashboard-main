"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";

import useObjectURL from "@/hooks/useObjectURL";
import { CrossIcon as CrossIcon } from "@/components/icons";

export interface ImagePreviewProps {
  id?: string | number;
  file?: Blob | MediaSource | File | null;
  onClick?: (props: Omit<ImagePreviewProps, "onClick">) => void;
  onEdit?: () => void;
  index?: number;
}

function ImagePreview({ file, id, onClick, onEdit, index }: ImagePreviewProps) {
  const { objectUrl, isLoading } = useObjectURL(file);

  const handleClick = useCallback(
    ({ onClick, file, id, index }: ImagePreviewProps) =>
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        onClick?.({ file, id, index });
      },
    [],
  );

  const handleEdit = useCallback(
    (onEdit?: () => void) =>
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        onEdit?.();
      },
    [],
  );

  let content: React.ReactNode = null;
  if (isLoading) {
    content = <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
  }
  if (!isLoading && objectUrl) {
    content = (
      <Image
        src={objectUrl}
        alt={objectUrl ? "Image preview" : "N/A"}
        width={79}
        height={59}
        className="h-full w-full object-contain"
      />
    );
  }
  if (!objectUrl && !isLoading) {
    content = "N/A";
  }

  return (
    <div className="relative h-[59px] w-[79px] shrink-0 rounded-[var(--radius-md,8px)] border border-solid border-[#333741] bg-[#161B26]">
      {content}

      <div className="absolute right-[-4.33px] top-[-6px]">
        <button
          type="button"
          className="flex h-fit w-fit cursor-pointer items-center justify-center rounded-full bg-warning p-[5px]"
          onClick={handleClick({ file, id, index, onClick })}
        >
          <CrossIcon className="size-2 shrink-0 text-white" />
        </button>
      </div>
    </div>
  );
}

export default ImagePreview;
