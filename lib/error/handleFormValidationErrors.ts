import type { Path, UseFormSetError } from "react-hook-form";

export type TFormValidationErrors = {
  path: string;
  message: string;
  expected: string;
  received: string | null;
  displayMessage: string;
};
export const handleFormValidationErrors = <
  TFormData extends Record<string, unknown>,
>(
  error: unknown,
  setError: UseFormSetError<TFormData>,
  defaultField: keyof TFormData = "name" as keyof TFormData,
): boolean => {
  if (
    !!error &&
    typeof error === "object" &&
    "data" in error &&
    !!error.data &&
    typeof error.data === "object" &&
    "errors" in error.data
  ) {
    const errors = error.data.errors as Array<TFormValidationErrors>;

    if (errors && errors.length > 0) {
      errors.forEach((errorItem) => {
        const fieldPath =
          (errorItem?.path as string) || (defaultField as string);
        setError(fieldPath as Path<TFormData>, {
          message: errorItem.message,
        });
      });

      return true;
    }
  }

  return false;
};
