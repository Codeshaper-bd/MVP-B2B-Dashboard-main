"use client";

import { useDropzone } from "react-dropzone";

import { cn } from "@/lib/utils";
import CrossIcon from "@/components/icons/CrossIcon";
import { Button } from "@/components/ui/button";
import LabelErrorWrapper, {
  type TLabelErrorWrapperProps,
} from "@/components/ui/LabelErrorWrapper";

import ImagePreviewList from "./ImagePreviewList";
import FileUploaderLabel from "./uploader-label";

export type TSingleFile = {
  id?: string | number;
  file: File | null | undefined;
};

export type TUploadSingleFileProps = {
  files: TSingleFile[] | null | undefined;
  setFiles: (files: TUploadSingleFileProps["files"]) => void;
  fileUploaderLabel?: React.ReactNode;
  hidePreviewInside?: boolean;
  previewMode?: "contain" | "cover";
  middleContent?: React.ReactNode;
  multiple?: boolean;
  readonly?: boolean;
} & TLabelErrorWrapperProps;

function UploadSingleFile({
  files,
  setFiles,
  hidePreviewInside,
  previewMode = "cover",
  middleContent,
  multiple = false,
  readonly,
  fileUploaderLabel = <FileUploaderLabel readOnly={readonly} />,
  ...labelErrorProps
}: TUploadSingleFileProps) {
  const { getRootProps, getInputProps } = useDropzone({
    multiple,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => ({
          id: crypto.randomUUID(),
          file,
        })),
      );
    },
  });

  const closeTheFile = () => {
    setFiles([]);
  };

  let content: React.ReactNode = (
    <div {...getRootProps({ className: "dropzone h-full w-full" })}>
      {!readonly && <input {...getInputProps()} />}
      {fileUploaderLabel}
    </div>
  );

  if (!hidePreviewInside && files?.length) {
    content = (
      <div className="relative h-full w-full">
        <Button
          size="icon"
          onClick={closeTheFile}
          rounded="full"
          className="absolute right-2 top-2 text-default-600 hover:text-primary"
        >
          <CrossIcon className="h-2.5 w-2.5" />
        </Button>
        <ImagePreviewList
          data={files}
          hidePreviewInside={hidePreviewInside}
          previewMode={previewMode}
        />
      </div>
    );
  }

  return (
    <LabelErrorWrapper
      {...labelErrorProps}
      className={labelErrorProps?.labelClassName}
    >
      {!!middleContent && middleContent}

      <div
        className={cn(
          "h-full w-full",
          files?.length
            ? "max-h-full min-h-[126px] w-full rounded-md border border-border"
            : "",
        )}
      >
        {content}
      </div>
    </LabelErrorWrapper>
  );
}

export default UploadSingleFile;
