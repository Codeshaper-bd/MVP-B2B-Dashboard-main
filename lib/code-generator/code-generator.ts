const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const specialCharacters = "!@#$%^&*()_+";
const withoutSpecialCharacters = `${letters}${numbers}`;
const mixCharacters = `${letters}${numbers}${specialCharacters}`;
const invalidCharacters = new Set(["0", "", " ", ".", "-"]);

type TGetSourceTypeProps = {
  getOnlyNumbers?: boolean;
  getOnlyLetters?: boolean;
  includeSpecialCharacters?: boolean;
};

const getSourceType = ({
  getOnlyNumbers,
  getOnlyLetters,
  includeSpecialCharacters,
}: TGetSourceTypeProps): string => {
  if (getOnlyNumbers) {
    return numbers;
  } else if (getOnlyLetters) {
    return letters;
  } else if (includeSpecialCharacters) {
    return mixCharacters;
  }

  return withoutSpecialCharacters;
};

const isValidCharacter = (char: string): boolean =>
  !invalidCharacters.has(char);

const replaceInvalidCharacters = (code: string, source: string): string => {
  const sourceLength = source.length;

  if (!isValidCharacter(code[0])) {
    code =
      source.charAt(Math.floor(Math.random() * sourceLength)) + code.slice(1);
  }

  if (!isValidCharacter(code[code.length - 1])) {
    code =
      code.slice(0, -1) +
      source.charAt(Math.floor(Math.random() * sourceLength));
  }

  // Check again if the first or last character is invalid and call the function recursively if needed
  if (!isValidCharacter(code[0]) || !isValidCharacter(code[code.length - 1])) {
    return replaceInvalidCharacters(code, source);
  }

  return code;
};

export const generateRandomCode = (
  props:
    | ({
        length?: number;
      } & TGetSourceTypeProps)
    | void,
): string => {
  const {
    length = 6,
    getOnlyNumbers,
    getOnlyLetters,
    includeSpecialCharacters,
  } = props || {};
  if (length < 1 || length >= Number.MAX_SAFE_INTEGER) {
    throw new Error("Invalid code length");
  }

  let result: string = "";
  const source = getSourceType({
    getOnlyNumbers,
    getOnlyLetters,
    includeSpecialCharacters,
  });
  const charactersLength = source?.length || 0;

  for (let i = 0; i < length; i++) {
    result += source.charAt(Math.floor(Math.random() * charactersLength));
  }

  return replaceInvalidCharacters(result, source);
};

export const getSetOfUniqueCodes = ({
  length = 6,
  numberOfSet = 4,
  getOnlyNumbers,
  getOnlyLetters,
  includeSpecialCharacters,
}: {
  length: number;
  numberOfSet?: number;
} & TGetSourceTypeProps): string[] => {
  if (numberOfSet > Math.pow(mixCharacters.length, length)) {
    throw new Error(
      "Cannot generate the requested number of unique codes with the given length.",
    );
  }

  const generatedCodes = new Set<string>();

  while (generatedCodes.size < numberOfSet) {
    const code = generateRandomCode({
      length,
      getOnlyNumbers,
      getOnlyLetters,
      includeSpecialCharacters,
    });
    generatedCodes.add(code);
  }

  return Array.from(generatedCodes);
};
