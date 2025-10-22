type TBlockInvalidKeysArgs = {
  e: React.KeyboardEvent<HTMLInputElement>;
  keysToBlock?: string[];
  allowDecimal?: boolean;
};

const defaultKeys = ["-", "e", "E", ".", ","];
export function blockInvalidKeys({
  e,
  keysToBlock = defaultKeys,
  allowDecimal = false,
}: TBlockInvalidKeysArgs): void {
  // If decimal is allowed, remove "." and "," from the keys to block
  const keysToBlockFiltered = allowDecimal
    ? keysToBlock.filter((key) => key !== ".")
    : keysToBlock;

  if (keysToBlockFiltered.includes(e.key)) {
    e.preventDefault();
  }
}
