"use client";
import { forwardRef, useCallback, useId, useRef, useState } from "react";

import { PlusIcon as PlusIcon } from "@/components/icons";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

import ImagePreview from "./ImagePreview";
import ImageCropper from "../file-uploader2/image-cropper";

export type TSingleFileMode = {
  multiple?: false;
  value?: File | null;
  onChange?: (file: TFileMode["value"]) => void;
};

export type TMultiFileMode = {
  multiple: true;
  limit?: number;
  value?: File[] | null;
  onChange?: (value: TFileMode["value"]) => void;
};

export type TFileMode = TSingleFileMode | TMultiFileMode;

type TFileInputButtonProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "multiple"
> & {
  label?: string | number;
  labelClassName?: string;
  error?: string | number | boolean | null;
  acceptAllFiles?: boolean;
  enableCropper?: boolean;
  cropperAspectRatio?: number;
  cropperWidth?: number;
  cropperHeight?: number;
  cropperShape?: "rect" | "round";
  removeBackground?: boolean;
  maxFileSize?: number;
} & TFileMode;

type THandleImageRemoveProps =
  | {
      onChange?: TSingleFileMode["onChange"];
    }
  | {
      index: number;
      allFiles?: TMultiFileMode["value"];
      currentFile?: TSingleFileMode["value"];
      onChange?: TMultiFileMode["onChange"];
    };
const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

const FileInputButton = forwardRef<HTMLInputElement, TFileInputButtonProps>(
  (
    {
      label,
      labelClassName,
      error,
      multiple,
      onChange,
      value,
      enableCropper = false,
      cropperAspectRatio,
      cropperWidth,
      cropperHeight,
      cropperShape = "rect",
      removeBackground,
      maxFileSize,
      ...restProps
    },
    ref,
  ) => {
    const formFieldId = useId();
    const internalRef = useRef<HTMLInputElement>(null);
    const finalRef = (ref || internalRef) as React.RefObject<HTMLInputElement>;
    const fileLimit = "limit" in restProps ? (restProps?.limit ?? 5) : 5;

    // Cropper state
    const [cropperFile, setCropperFile] = useState<File | null>(null);
    const [isCropperOpen, setIsCropperOpen] = useState(false);
    const [pendingFileIndex, setPendingFileIndex] = useState<number | null>(
      null,
    );

    // File size error state
    const [fileSizeError, setFileSizeError] = useState<string | null>(null);

    const handleChange = useCallback(
      ({
        multiple,
        onChange,
        enableCropper,
        maxFileSize,
        ...restProps
      }: TFileMode & {
        acceptAllFiles?: boolean;
        enableCropper?: boolean;
        maxFileSize?: number;
      }) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
          const inputFiles = e?.target?.files;

          if (!inputFiles) {
            return;
          }

          let validFiles = Array.from(inputFiles).filter((file) =>
            restProps.acceptAllFiles ? true : allowedTypes.includes(file.type),
          );

          if (maxFileSize) {
            const maxSizeInBytes = maxFileSize * 1024;
            const oversizedFiles = validFiles.filter(
              (file) => file.size > maxSizeInBytes,
            );

            if (oversizedFiles.length > 0) {
              setFileSizeError(`File size must be less than ${maxFileSize}KB.`);
            } else {
              setFileSizeError(null);
            }

            validFiles = validFiles.filter(
              (file) => file.size <= maxSizeInBytes,
            );
          } else {
            setFileSizeError(null);
          }

          if (enableCropper && validFiles.length > 0) {
            // Open cropper for the first valid file
            setCropperFile(validFiles[0]);
            setIsCropperOpen(true);
            setPendingFileIndex(null);
          } else {
            // Process files normally without cropping
            if (multiple) {
              const filesToAdd =
                "limit" in restProps
                  ? validFiles.slice(0, restProps.limit)
                  : validFiles;
              onChange?.(filesToAdd);
            } else {
              onChange?.(validFiles[0]);
            }
          }

          e.target.value = "";
          e.target.files = null;
        },
      [],
    );

    const handleCropComplete = useCallback(
      (croppedFile: File) => {
        if (multiple) {
          if (pendingFileIndex !== null) {
            // Replace file at specific index
            const currentFiles = value || [];
            const newFiles = [...currentFiles];
            newFiles[pendingFileIndex] = croppedFile;
            onChange?.(newFiles);
          } else {
            // Add new file to array
            const currentFiles = value || [];
            const newFiles = [...currentFiles, croppedFile];
            onChange?.(newFiles);
          }
        } else {
          // Single file mode
          onChange?.(croppedFile);
        }

        setCropperFile(null);
        setIsCropperOpen(false);
        setPendingFileIndex(null);
      },
      [multiple, onChange, value, pendingFileIndex],
    );

    const handleCropCancel = useCallback(() => {
      setCropperFile(null);
      setIsCropperOpen(false);
      setPendingFileIndex(null);
    }, []);

    const handleImageRemove = useCallback(
      (props: THandleImageRemoveProps) => () => {
        if (!("index" in props)) {
          props?.onChange?.(undefined);
          return;
        }

        const { index, allFiles, currentFile, onChange } = props;

        const files =
          props?.allFiles?.filter(
            (fileVal, i) =>
              (index !== null && index !== undefined && i !== index) ||
              (currentFile !== null &&
                currentFile !== undefined &&
                fileVal !== undefined &&
                fileVal !== null &&
                fileVal !== currentFile),
          ) ?? [];

        onChange?.(files);
      },
      [],
    );

    const handleImageEdit = useCallback(
      (file: File, index?: number) => () => {
        if (enableCropper) {
          setCropperFile(file);
          setIsCropperOpen(true);
          setPendingFileIndex(index ?? null);
        }
      },
      [enableCropper],
    );

    const doNotRememberPreviousFile = useCallback(
      (e: React.MouseEvent<HTMLInputElement, MouseEvent>) =>
        (e.currentTarget.value = ""),
      [],
    );

    const customInput = (
      <label
        htmlFor={`fileInput${formFieldId}`}
        className="flex h-[59px] w-[78.667px] cursor-pointer items-center justify-center rounded-[8px] border border-solid border-default-200 bg-default-50 px-[27px] py-[17.5px]"
      >
        <PlusIcon className="size-4" />
      </label>
    );

    let content: React.ReactNode = null;

    if (Array.isArray(value) ? !value?.length : !value) {
      content = customInput;
    } else {
      if (multiple) {
        content = (
          <div className="flex flex-wrap gap-1.5">
            {value?.map((file, index) => (
              <ImagePreview
                key={index}
                index={index}
                file={file}
                onClick={handleImageRemove({
                  index,
                  allFiles: value,
                  onChange,
                  currentFile: file,
                })}
                onEdit={
                  enableCropper ? handleImageEdit(file, index) : undefined
                }
              />
            ))}

            {fileLimit > (value?.length ?? 0) && (
              <FileInputButton
                onChange={(newFile) => {
                  if (newFile) {
                    onChange?.([...(value ?? []), newFile] as File[]);
                  }
                }}
                enableCropper={enableCropper}
                cropperAspectRatio={cropperAspectRatio}
                cropperWidth={cropperWidth}
                cropperHeight={cropperHeight}
                cropperShape={cropperShape}
                maxFileSize={maxFileSize}
              />
            )}
          </div>
        );
      } else {
        content = (
          <ImagePreview
            file={value}
            onClick={handleImageRemove({ onChange })}
            onEdit={enableCropper && value ? handleImageEdit(value) : undefined}
          />
        );
      }
    }

    return (
      <div>
        <LabelErrorWrapper
          htmlFor={`fileInput${formFieldId}`}
          error={error || fileSizeError}
          label={label}
          labelClassName={labelClassName}
        >
          <input
            ref={finalRef}
            type="file"
            id={`fileInput${formFieldId}`}
            hidden
            multiple={multiple}
            {...restProps}
            onChange={
              multiple
                ? handleChange({
                    multiple,
                    onChange,
                    value,
                    limit: fileLimit,
                    enableCropper,
                    maxFileSize,
                  })
                : handleChange({
                    multiple,
                    onChange,
                    value,
                    enableCropper,
                    maxFileSize,
                  })
            }
            onClick={doNotRememberPreviousFile}
            accept={
              restProps.acceptAllFiles
                ? undefined
                : "image/jpeg,image/jpg,image/png"
            }
          />

          {content}
        </LabelErrorWrapper>

        {cropperFile && (
          <ImageCropper
            file={cropperFile}
            isOpen={isCropperOpen}
            onClose={handleCropCancel}
            onCropComplete={handleCropComplete}
            aspectRatio={cropperAspectRatio}
            cropWidth={cropperWidth}
            cropHeight={cropperHeight}
            cropShape={cropperShape}
            removeBackground={removeBackground}
          />
        )}
      </div>
    );
  },
);

FileInputButton.displayName = "FileInputButton";

export default FileInputButton;
