"use client";
import React, { Fragment, useState } from "react";
import { useDropzone } from "react-dropzone";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

import FileActions from "./file-actions";
import FileList from "./file-list";
import FileUploaderLabel from "./file-uploader-label";
import ImageCropper from "./image-cropper";
import ImageLoader from "./image-loader";
import type { IFileUploaderProps } from "./utils";

function FileUploader({
  label,
  error,
  isLoading,
  files,
  setFiles,
  isMultiple = true,
  singleFullWidth = false,
  readonly,
  fileUploadLabel = <FileUploaderLabel readonly={readonly} />,
  onDelete,
  acceptAllFiles = false,
  aspectRatio,
  cropWidth,
  cropHeight,
  cropShape = "rect",
  removeBackground = false,
}: IFileUploaderProps & {
  aspectRatio?: number;
  cropWidth?: number;
  cropHeight?: number;
  cropShape?: "rect" | "round";
  removeBackground?: boolean;
}) {
  const [cropFile, setCropFile] = useState<File | null>(null);
  const [isCropOpen, setIsCropOpen] = useState(false);

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  const { getRootProps, getInputProps, open } = useDropzone({
    multiple: isMultiple,
    accept: acceptAllFiles
      ? undefined
      : {
          "image/jpeg": [".jpeg", ".jpg"],
          "image/png": [".png"],
        },
    onDrop: (acceptedFiles) => {
      const filteredFiles = acceptAllFiles
        ? acceptedFiles
        : acceptedFiles.filter((file) => allowedTypes.includes(file.type));

      // If it's a single file and it's an image, open the cropper
      if (
        !isMultiple &&
        filteredFiles.length > 0 &&
        filteredFiles[0].type.startsWith("image")
      ) {
        setCropFile(filteredFiles[0]);
        setIsCropOpen(true);
      } else {
        setFiles([...(files || []), ...filteredFiles]);
      }
    },
  });

  const handleRemoveFile = async (file: File) => {
    try {
      const filtered = files?.filter((i) => i.name !== file.name);
      setFiles?.(filtered || []);
      const res = await onDelete?.(file);
      if (res) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCropComplete = (croppedFile: File) => {
    setFiles([croppedFile]);
    setCropFile(null);
    setIsCropOpen(false);
  };

  const handleCropClose = () => {
    setCropFile(null);
    setIsCropOpen(false);
  };

  const handleFileUpdate = (index: number, newFile: File) => {
    const updatedFiles = [...(files || [])];
    updatedFiles[index] = newFile;
    setFiles(updatedFiles);
  };

  if (isLoading) {
    return <ImageLoader />;
  }
  return (
    <Fragment>
      {label && <Label htmlFor="files">{label}</Label>}

      <div {...getRootProps({ className: "dropzone" })}>
        {!readonly && <input {...getInputProps()} />}
        {files?.length ? null : fileUploadLabel}
      </div>

      {files?.length ? (
        <div
          className={cn("mt-4 rounded-md border border-default-200 p-3", {
            "w-full p-0": singleFullWidth,
          })}
        >
          <FileList
            files={files}
            handleRemoveFile={handleRemoveFile}
            onFileUpdate={handleFileUpdate}
            isMultiple={isMultiple}
            singleFullWidth={singleFullWidth}
            readonly={readonly}
          />

          {isMultiple && <FileActions setFiles={setFiles} open={open} />}
        </div>
      ) : null}
      {error && <div className="mt-2 text-sm text-destructive">{error}</div>}

      {cropFile && (
        <ImageCropper
          file={cropFile}
          isOpen={isCropOpen}
          onClose={handleCropClose}
          onCropComplete={handleCropComplete}
          aspectRatio={aspectRatio}
          cropWidth={cropWidth}
          cropHeight={cropHeight}
          cropShape={cropShape}
          removeBackground={removeBackground}
        />
      )}
    </Fragment>
  );
}

export default FileUploader;
