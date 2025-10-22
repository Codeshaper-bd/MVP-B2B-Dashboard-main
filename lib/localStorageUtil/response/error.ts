export type TCreateErrorResponseProps = {
  key: string;
  error: unknown;
  type?: "set" | "get" | "remove";
};

export type TErrorResponse = {
  success: boolean;
  message: string;
  error: unknown;
};

export type TCreateErrorResponse = (
  props: TCreateErrorResponseProps,
) => TErrorResponse;

const getErrorTypeMessage = (
  type: "set" | "get" | "remove" | undefined,
): string => {
  switch (type) {
    case "set":
      return "save";
    case "remove":
      return "delete";
    case "get":
      return "retrieve";
    default:
      return "";
  }
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message !== "") {
    return ` ${error.message}`;
  } else if (typeof error === "string" && error !== "") {
    return ` ${error}`;
  }
  return "";
};

const createErrorResponse: TCreateErrorResponse = ({
  key,
  error,
  type = "set",
}) => {
  const auxiliary = type === "set" ? "into" : "from";

  return {
    success: false,
    message: `Failed to ${getErrorTypeMessage(type)} the item '${key}' ${auxiliary} localStorage.${getErrorMessage(error)}`,
    error,
  };
};

export default createErrorResponse;
