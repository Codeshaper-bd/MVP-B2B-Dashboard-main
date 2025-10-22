import { throwErrorOnInvalidNumber } from "../data-types/number";

const modes = {
  page: "page",
  offset: "offset",
} as const;
export type TPageMode = (typeof modes)["page"];
export type TOffsetMode = (typeof modes)["offset"];
export type TMode = (typeof modes)[keyof typeof modes];
export type TPageModeProps = {
  mode: TPageMode;
  page: number;
  pageSize: number;
  index: number;
};
export type TOffsetModeProps = {
  mode: TOffsetMode;
  limit: number;
  startOffset: number;
  index: number;
};
export type TCalculateSerialNumberProps<T extends TMode = "page"> =
  T extends TPageMode
    ? TPageModeProps
    : T extends TOffsetMode
      ? TOffsetModeProps
      : never;

export function calculateSerialNumber<T extends TMode = "page">(
  props: TCalculateSerialNumberProps<T>,
): number {
  try {
    props.mode = props.mode || "page";

    // Handling invalid mode
    if (props?.mode !== "page" && props?.mode !== "offset") {
      throw new Error("Invalid mode. Expected 'page' or 'offset'.");
    }

    switch (props?.mode) {
      case "page": {
        const { page, pageSize, index } = props || {};
        throwErrorOnInvalidNumber(page, "page");
        throwErrorOnInvalidNumber(pageSize, "pageSize");
        throwErrorOnInvalidNumber(index, "index");

        if (page < 1 || pageSize < 0 || index < 0) {
          throw new Error(
            "Invalid input: 'page' and 'pageSize' must be >= 0, 'index' must be >= 0.",
          );
        }

        return (page - 1) * pageSize + index + 1;
      }

      case "offset": {
        const { limit, startOffset, index } = props || {};
        throwErrorOnInvalidNumber(limit, "limit");
        throwErrorOnInvalidNumber(startOffset, "startOffset");
        throwErrorOnInvalidNumber(index, "index");

        if (limit < 0 || startOffset < 0 || index < 0) {
          throw new Error(
            "Invalid input: 'limit' must be >= 1, 'startOffset' and 'index' must be >= 0.",
          );
        }

        return startOffset + index + 1;
      }

      default:
        break;
    }

    // Fallback (should never reach here due to validation)
    throw new Error("Unexpected error in calculateSerialNumber.");
  } catch (error) {
    console.error("Error in calculateSerialNumber:", error);
    return 1;
  }
}
