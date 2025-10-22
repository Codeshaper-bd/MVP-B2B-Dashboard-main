import { useCallback } from "react";

import { cn } from "@/lib/utils";
import type { TSingleFile } from "@/components/form/upload-single-file";

import Preview from "./Preview";

interface IPreviewListProps {
  data: TSingleFile[] | null | undefined;
  onRemove?: (data: TSingleFile | null | undefined) => void;
  className?: string;
}

function PreviewList({ data, onRemove, className }: IPreviewListProps) {
  const handleRemove = useCallback(
    ({
      file,
      onRemove,
    }: {
      file: TSingleFile | null | undefined;
      onRemove?: (data: TSingleFile | null | undefined) => void;
    }) =>
      () => {
        onRemove?.(file);
      },
    [],
  );

  if (!data?.length) {
    return null;
  }

  return (
    <div className={cn("mb-3 mt-1.5 grid grid-cols-3 gap-3", className)}>
      {data?.map((item, idx) => (
        <Preview
          file={item}
          key={item?.id || idx}
          onRemove={handleRemove({ file: item, onRemove })}
        />
      ))}
    </div>
  );
}

export default PreviewList;
