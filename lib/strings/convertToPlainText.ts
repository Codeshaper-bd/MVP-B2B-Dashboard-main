type TConvertToPlainTextArgs = {
  text: string | null | undefined;
  separator?: string;
};
export function convertToPlainText({
  text,
  separator = "_",
}: TConvertToPlainTextArgs): string {
  if (!text) {
    return "";
  }
  return text?.split(separator).join(" ") ?? "";
}
