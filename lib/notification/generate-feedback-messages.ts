// Define the supported operation types.
export type TOperationType = "create" | "update" | "delete";

// Define the verb forms for each operation.
type TOperationForms = {
  base: string; // e.g. "Create", "Update", "Delete"
  progressive: string; // e.g. "Creating", "Updating", "Deleting"
  past: string; // e.g. "Created", "Updated", "Deleted"
};

const operationForms: Record<TOperationType, TOperationForms> = {
  create: { base: "Create", progressive: "Creating", past: "Created" },
  update: { base: "Update", progressive: "Updating", past: "Updated" },
  delete: { base: "Delete", progressive: "Deleting", past: "Deleted" },
} as const;

// The structure for the messages to be returned.
export interface OperationFeedbackMessages {
  loadingMessage: { title: string; description: string };
  successMessage: { title: string; description: string };
  errorMessage: { title: string; description: string };
}

// Interface for custom overrides.
interface FeedbackMessageOverrides {
  loadingTitle?: string;
  loadingDescription?: string;
  successTitle?: string;
  successDescription?: string;
  errorTitle?: string;
  errorDescription?: string;
}

// Options object accepted by the utility.
export interface GenerateFeedbackMessagesOptions {
  name: string;
  pluralName?: string;
  isPlural?: boolean;
  overrides?: FeedbackMessageOverrides;
}

/**
 * Converts a string to Title Case.
 * Each word's first letter is capitalized and the rest are lowercased.
 *
 * @param str - The string to convert.
 * @returns The converted string in title case.
 */
function toTitleCase(str: string): string {
  return (
    str?.replace(
      /\w\S*/g,
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    ) ?? ""
  );
}

/**
 * Generates user-friendly feedback messages for an operation (create, update, or delete)
 * on a given module or item. This utility ensures the item name follows title case,
 * so the messages are consistent regardless of the format passed by the developer.
 *
 * @param operation - The operation type: "create", "update", or "delete".
 * @param config - Options including the item's singular/plural names, an optional flag to use plural messaging,
 *                 and optional text overrides.
 *
 * @returns An object containing loadingMessage, successMessage, and errorMessage.
 */
function generateFeedbackMessages(
  operation: TOperationType,
  config: GenerateFeedbackMessagesOptions,
): OperationFeedbackMessages {
  const { name, pluralName, isPlural = false, overrides } = config;

  // Determine the effective label (using pluralName if the flag is set, or falling back to name)
  // and enforce title case for consistency.
  const rawLabel = isPlural ? pluralName || `${name}s` : name;
  const effectiveLabel = toTitleCase(rawLabel);
  const effectiveLabelLC = effectiveLabel.toLowerCase();

  // Retrieve the proper verb forms for the given operation.
  const forms = operationForms[operation];

  // Build the default messages.
  const defaultLoadingTitle = `${forms.progressive} ${effectiveLabel}`;
  const defaultLoadingDescription = `Please wait while we ${forms.progressive.toLowerCase()} your ${effectiveLabelLC}.`;
  const defaultSuccessTitle = `Successfully ${forms.past} ${effectiveLabel}!`;
  const defaultSuccessDescription = `Your ${effectiveLabelLC} has been successfully ${forms.past.toLowerCase()}.`;
  const defaultErrorTitle = `Failed to ${forms.base} ${effectiveLabel}`;
  const defaultErrorDescription = `We encountered an error while ${forms.progressive.toLowerCase()} your ${effectiveLabelLC}.${process.env.NODE_ENV === "production" ? ` Please try again later or contact support if the issue persists.` : ""}`;

  return {
    loadingMessage: {
      title: overrides?.loadingTitle || defaultLoadingTitle,
      description: overrides?.loadingDescription || defaultLoadingDescription,
    },
    successMessage: {
      title: overrides?.successTitle || defaultSuccessTitle,
      description: overrides?.successDescription || defaultSuccessDescription,
    },
    errorMessage: {
      title: overrides?.errorTitle || defaultErrorTitle,
      description: overrides?.errorDescription || defaultErrorDescription,
    },
  };
}

export default generateFeedbackMessages;
