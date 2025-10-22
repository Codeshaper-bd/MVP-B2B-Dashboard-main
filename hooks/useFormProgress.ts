import {
  useWatch,
  type Control,
  type FieldValues,
  type Path,
  type FieldErrors,
} from "react-hook-form";

interface UseFormProgressOptions<
  TFieldValues extends FieldValues = FieldValues,
> {
  fields: Path<TFieldValues>[];
  control: Control<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  weights?: Record<Path<TFieldValues>, number>;
}

export const useFormProgress = <
  TFieldValues extends FieldValues = FieldValues,
>({
  fields,
  control,
  errors,
  weights,
}: UseFormProgressOptions<TFieldValues>) => {
  const watchedValues = useWatch({
    control,
  });

  // Calculate form completion progress
  const calculateProgress = () => {
    if (weights) {
      let totalWeight = 0;
      let filledWeight = 0;

      fields.forEach((fieldName) => {
        const fieldValue = watchedValues[fieldName];
        const weight = weights[fieldName] || 1;
        const hasError = errors && errors[fieldName];

        totalWeight += weight;

        // Only count as filled if field has value AND no validation errors
        const isFilled =
          fieldValue &&
          (typeof fieldValue === "string" ? fieldValue.trim() !== "" : true) &&
          !hasError;
        if (isFilled) {
          filledWeight += weight;
        }
      });

      const percentage = Math.round((filledWeight / totalWeight) * 100);
      return Math.min(percentage, 100);
    } else {
      const filledFields = fields.filter((fieldName) => {
        const fieldValue = watchedValues[fieldName];
        const hasError = errors && errors[fieldName];

        // Only count as filled if field has value AND no validation errors
        return (
          fieldValue &&
          (typeof fieldValue === "string" ? fieldValue.trim() !== "" : true) &&
          !hasError
        );
      }).length;

      const totalFields = fields.length;

      const percentage = Math.round((filledFields / totalFields) * 100);
      return Math.min(percentage, 100);
    }
  };

  const progress = calculateProgress();

  return {
    progress,
    watchedValues: watchedValues as TFieldValues,
  };
};
