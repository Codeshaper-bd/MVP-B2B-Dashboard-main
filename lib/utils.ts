import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hexToRGB = (hex: string, alpha?: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
};

export function generateFormattedEvenDays(
  year: number,
  month: number,
): string[] {
  const daysInMonth: number = new Date(year, month, 0).getDate();

  const monthNames: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const evenDays: string[] = [];

  for (let day = 2; day <= daysInMonth; day += 2) {
    evenDays.push(`${monthNames[month - 1]} ${day}`);
  }

  return evenDays;
}

export function generateRandomNumbers(
  count: number,
  min: number = 50,
  max: number = 1200,
): number[] {
  const randomNumbers: number[] = [];

  // Generate the specified count of random numbers within the given range
  for (let i = 0; i < count; i++) {
    const randomNumber: number =
      Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

export type TCopySuccess = {
  success: true;
  error: null;
  message: string;
};

export type TCopyFailed = {
  success: false;
  error: unknown;
  errorMessage: string;
};

export type TCopyExtras =
  | {
      onCopySuccess?: (success: TCopySuccess) => void;
      onCopyError?: (error: TCopyFailed) => void;
    }
  | void
  | undefined;

export const copyText = async (text: string, extras: TCopyExtras) => {
  const { onCopySuccess, onCopyError } = extras || {};

  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      const success: TCopySuccess = {
        success: true,
        error: null,
        message: "Copied successfully!",
      };
      onCopySuccess?.(success);
      return success;
    } catch (e) {
      console.error("Failed to copy text:", e);

      const error: TCopyFailed = {
        success: false,
        error: e,
        errorMessage:
          e instanceof Error ? (e as Error).message : "Failed to copy",
      };
      onCopyError?.(error);

      return error;
    }
  }

  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    const success: TCopySuccess = {
      success: true,
      error: null,
      message: "Copied successfully!",
    };
    onCopySuccess?.(success);
    return success;
  } catch (e) {
    console.error("Failed to copy text:", e);

    const error: TCopyFailed = {
      success: false,
      error: e,
      errorMessage:
        e instanceof Error ? (e as Error).message : "Failed to copy",
    };
    onCopyError?.(error);

    return error;
  }
};
