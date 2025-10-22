type EnvVarType = string | number;

export function getEnvVar<T extends EnvVarType = "string">(
  key: string,
  options?: {
    type: T;
    fallback?: T extends "number" ? number : string;
  },
): T extends "number" ? number : string {
  const { type, fallback } = options || {};
  const value = process?.env?.[key];

  if (value === undefined || value === null || value === "") {
    if (fallback !== undefined) {
      return fallback;
    }

    throw new Error(`❌ Missing required environment variable: ${key}`);
  }

  if (type === "number") {
    const num = Number(value);
    if (Number.isNaN(num)) {
      if (fallback !== undefined) {
        return fallback;
      }

      throw new Error(`❌ Environment variable ${key} must be a valid number`);
    }
    return num as T extends "number" ? number : string;
  }

  return value as T extends "number" ? number : string;
}
