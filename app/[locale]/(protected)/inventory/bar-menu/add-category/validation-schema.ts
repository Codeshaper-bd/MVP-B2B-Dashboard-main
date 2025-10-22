import * as yup from "yup";

import { createFileValidationSchema } from "@/lib/media/yup-file-validation";
export const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  media: createFileValidationSchema({
    isMultiple: true,
    isOptional: true,
    maxFileSize: 5,
    fileSizeUnit: "MB",
    acceptedFileTypes: ["image/jpeg", "image/png"],
  }),
});
