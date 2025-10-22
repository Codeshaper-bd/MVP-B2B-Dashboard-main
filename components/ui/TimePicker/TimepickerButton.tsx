import { cn } from "@/lib/utils";

interface ITimePickerButton {
  value: number;
  selected: boolean;
  disabled?: boolean;
  readonly?: boolean;
  onClick: () => void;
}
function TimepickerButton({
  value,
  selected,
  disabled,
  readonly,
  onClick,
}: ITimePickerButton) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full min-w-20 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium leading-6",
        selected
          ? "bg-secondary text-secondary-foreground"
          : "text-default-700 hover:bg-secondary",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        readonly ? "pointer-events-none" : "",
      )}
      id={`hour-${value}`}
      type="button"
      disabled={disabled || readonly}
    >
      {value}
    </button>
  );
}

export default TimepickerButton;
