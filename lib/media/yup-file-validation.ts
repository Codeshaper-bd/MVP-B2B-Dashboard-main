import * as Yup from "yup";

import type { TNullish } from "@/store/api/common-api-types";

// Define the options type
type FileValidationOptions = {
  isMultiple?: boolean;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  fileSizeUnit?: "B" | "KB" | "MB" | "GB";
  isOptional?: boolean;
};

const fileSizeUnits: FileValidationOptions["fileSizeUnit"][] = [
  "B",
  "KB",
  "MB",
  "GB",
];

// Function to create the file validation schema
export const createFileValidationSchema = ({
  isMultiple = false,
  acceptedFileTypes = ["image/png", "image/jpeg", "image/jpg"],
  maxFileSize = 5,
  fileSizeUnit = "MB",
  isOptional = false,
}: FileValidationOptions) => {
  const res = acceptedFileTypes
    ?.map((type) => type?.split("/")?.[1] || type)
    ?.join(", ");
  const maxFileSizeInByte =
    maxFileSize * 1024 ** fileSizeUnits.indexOf(fileSizeUnit);

  const fileSchema = Yup.mixed()
    .test("fileType", `Unsupported file type. Please provide ${res}`, (val) => {
      const value = val as File | TNullish;
      if (!value) {
        return true;
      } // Skip validation if no file is provided
      return acceptedFileTypes.includes(value.type);
    })
    .test(
      "fileSize",
      `File size is too large. Max allowed size is ${maxFileSize}${fileSizeUnit}`,
      (val) => {
        const value = val as File | TNullish;
        if (!value) {
          return true;
        } // Skip validation if no file is provided
        return value?.size <= maxFileSizeInByte;
      },
    );

  const schema = isMultiple
    ? Yup.array().of(fileSchema).min(1, "At least one file is required")
    : fileSchema;

  return isOptional
    ? schema.optional().nullable().notRequired()
    : schema.required("File is required");
};
