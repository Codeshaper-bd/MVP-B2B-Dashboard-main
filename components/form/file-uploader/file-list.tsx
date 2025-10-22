import { cn } from "@/lib/utils";
import XIcon from "@/components/icons/X";
import { Button } from "@/components/ui/button";

import FilePreview from "./file-preview";

interface FileListProps {
  files: File[];
  handleRemoveFile: (file: File) => void;
  className?: string;
  isMultiple?: boolean;
  singleFullWidth?: boolean;
  readonly?: boolean;
}

function FileList({
  files,
  handleRemoveFile,
  isMultiple,
  className,
  singleFullWidth,
  readonly,
}: FileListProps) {
  return (
    <div className={cn("flex h-full flex-col", className)}>
      {files.map((file, index) => (
        <div
          key={`file-${index}`}
          className={cn(
            "relative flex h-full items-center justify-between gap-3 py-2.5",
            {
              "border-b border-default-100": isMultiple,
              "block p-0": singleFullWidth || !isMultiple,
            },
          )}
        >
          <FilePreview
            file={file}
            isMultiple={isMultiple}
            singleFullWidth={singleFullWidth}
          />
          {!readonly && (
            <Button
              size="icon"
              color="destructive"
              type="button"
              onClick={() => handleRemoveFile(file)}
              rounded={singleFullWidth || !isMultiple ? "full" : undefined}
              className={cn(
                "flex-none",
                (singleFullWidth || !isMultiple) &&
                  "absolute -right-3 -top-3 bg-destructive",
              )}
            >
              <XIcon className="size-3" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

export default FileList;
