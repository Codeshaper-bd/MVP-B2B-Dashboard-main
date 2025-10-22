export type TCreateSuccessResponseProps<T> = {
  key: string;
  data: T | null;
  type?: "set" | "get" | "remove";
};

export type TSuccessResponse<T> = {
  success: boolean;
  data: T | null;
  message: string;
};

type TCreateSuccessResponse = <T>({
  key,
  data,
  type,
}: TCreateSuccessResponseProps<T>) => TSuccessResponse<T>;

const getSuccessTypeMessage = (
  type: "set" | "get" | "remove" | undefined,
): string => {
  switch (type) {
    case "set":
      return "saved";
    case "remove":
      return "deleted";
    case "get":
      return "retrieved";
    default:
      return "";
  }
};

const createSuccessResponse: TCreateSuccessResponse = ({
  key,
  data,
  type,
}) => ({
  success: true,
  data,
  message: `Successfully ${getSuccessTypeMessage(type)} the item '${key}' from localStorage.`,
});

export default createSuccessResponse;
