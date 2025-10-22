import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// get api error message title
type TErrorReturnType = {
  title: string;
  description: string;
};
type TGetErrorMessageArgs = {
  error: unknown;
  title?: string;
  description?: string;
};
export const getApiErrorMessages = ({
  error,
  title = "Something went wrong",
  description = "",
}: TGetErrorMessageArgs): TErrorReturnType => {
  let message = title;
  let descriptions = description;
  // errors
  if (
    !!error &&
    typeof error === "object" &&
    "data" in error &&
    !!error.data &&
    typeof error.data === "object" &&
    "message" in error.data &&
    "errors" in error.data
  ) {
    if (typeof error.data.message === "string") {
      message = error.data.message;
    }
    if (Array.isArray(error.data.errors)) {
      descriptions = error.data.errors
        ?.map((error) => error.message)
        .join(", ");
    }
  }

  return {
    title: message,
    description: descriptions,
  };
};
export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage: string = "",
): string => {
  if (error instanceof Error) {
    return error?.message ?? "";
  }

  if (typeof error === "string") {
    return error;
  }

  const isErrorAnObject = !!error && typeof error === "object";

  if (!isErrorAnObject) {
    return fallbackMessage;
  }

  /* RTK Query Error handle start */
  // handling SerializedError start
  if (
    "name" in error ||
    "message" in error ||
    "stack" in error ||
    "code" in error
  ) {
    const { name, message, stack, code } = (error || {}) as SerializedError;
    const errorArr: string[] = [];

    if (name) {
      errorArr.push(name);
    }
    if (message) {
      errorArr.push(message);
    }
    if (stack) {
      errorArr.push(stack);
    }
    if (code) {
      errorArr.push(code);
    }
    return errorArr.join(", ");
  }

  // handling SerializedError end

  // --------------------------------------------

  // handling FetchBaseQueryError start
  const statusArr = [
    "FETCH_ERROR",
    "PARSING_ERROR",
    "TIMEOUT_ERROR",
    "CUSTOM_ERROR",
  ] as const;

  if (
    "status" in error &&
    typeof error.status === "string" &&
    statusArr.includes(error.status as (typeof statusArr)[number])
  ) {
    const fetchBaseQueryError = error as FetchBaseQueryError;
    const errorArr: string[] = [];

    switch (fetchBaseQueryError.status) {
      case "FETCH_ERROR":
        {
          errorArr.push("Fetch Error");
          errorArr.push(fetchBaseQueryError.error);
        }
        break;
      case "PARSING_ERROR":
        {
          errorArr.push("Parsing Error");
          errorArr.push(fetchBaseQueryError.error);
        }
        break;
      case "TIMEOUT_ERROR":
        {
          errorArr.push("Timeout Error");
          errorArr.push(fetchBaseQueryError.error);
        }
        break;
      case "CUSTOM_ERROR":
        {
          errorArr.push("Custom Error");
          errorArr.push(fetchBaseQueryError.error);
        }
        break;

      default:
        break;
    }

    return errorArr.join(", ");
  }
  // handling FetchBaseQueryError end

  /* RTK Query Error handle end */

  // Other error handling

  if (
    !!error &&
    typeof error === "object" &&
    "data" in error &&
    !!error.data &&
    typeof error.data === "object" &&
    "message" in error.data
  ) {
    if (typeof error.data.message === "string") {
      return error.data.message;
    }
    if (Array.isArray(error.data.message)) {
      return error.data.message.join(", ");
    }
  }

  if (!!error && typeof error === "object") {
    const titleMessage = "message" in error ? error.message : "";

    if ("errors" in error) {
      // array of errors
      if (Array.isArray(error.errors)) {
        return [
          titleMessage,
          ...(error?.errors?.map((err) => err?.message) ?? []),
        ].join(", ");
      }

      // single string error
      if (typeof error.errors === "string") {
        return [titleMessage, error.errors].join(", ");
      }

      // single object string error
      if (
        error?.errors &&
        typeof error.errors === "object" &&
        "errors" in error &&
        "message" in error.errors
      ) {
        return [titleMessage, error?.errors?.message].join(", ");
      }
    }

    if ("error" in error) {
      // array of errors
      if (Array.isArray(error.error)) {
        return [
          titleMessage,
          ...(error?.error?.map((err) => err?.message) ?? []),
        ].join(", ");
      }

      // single string error
      if (typeof error.error === "string") {
        return [titleMessage, error.error].join(", ");
      }

      // single object string error
      if (
        typeof error.error === "object" &&
        error?.error &&
        "message" in error.error
      ) {
        return [titleMessage, error?.error?.message].join(", ");
      }
    }
  }

  return fallbackMessage;
};
