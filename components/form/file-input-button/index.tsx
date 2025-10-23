"use client";
import { forwardRef, useCallback, useId, useRef } from "react";

import { PlusIcon as PlusIcon } from "@/components/icons";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

import ImagePreview from "./ImagePreview";

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
    { label, labelClassName, error, multiple, onChange, value, ...restProps },
    ref,
  ) => {
    const formFieldId = useId();
    const internalRef = useRef<HTMLInputElement>(null);
    const finalRef = (ref || internalRef) as React.RefObject<HTMLInputElement>;
    const fileLimit = "limit" in restProps ? (restProps?.limit ?? 5) : 5;

    const handleChange = useCallback(
      ({
        multiple,
        onChange,
        ...restProps
      }: TFileMode & { acceptAllFiles?: boolean }) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
          const inputFiles = e?.target?.files;

          if (!inputFiles) {
            return;
          }

          const validFiles = Array.from(inputFiles).filter((file) =>
            restProps.acceptAllFiles ? true : allowedTypes.includes(file.type),
          );

          if (multiple) {
            const filesToAdd =
              "limit" in restProps
                ? validFiles.slice(0, restProps.limit)
                : validFiles;
            onChange?.(filesToAdd);
          } else {
            onChange?.(validFiles[0]);
          }

          e.target.value = "";
          e.target.files = null;
        },
      [],
    );

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
              />
            ))}

            {fileLimit > (value?.length ?? 0) && (
              <FileInputButton
                onChange={(newFile) => {
                  if (newFile) {
                    onChange?.([...(value ?? []), newFile] as File[]);
                  }
                }}
              />
            )}
          </div>
        );
      } else {
        content = (
          <ImagePreview
            file={value}
            onClick={handleImageRemove({ onChange })}
          />
        );
      }
    }

    return (
      <div>
        <LabelErrorWrapper
          htmlFor={`fileInput${formFieldId}`}
          error={error}
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
                ? handleChange({ multiple, onChange, value, limit: fileLimit })
                : handleChange({ multiple, onChange, value })
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
      </div>
    );
  },
);

FileInputButton.displayName = "FileInputButton";

export default FileInputButton;
