export type TOtpState = {
  isFieldHighlighted: boolean;
  isFieldFocused: boolean;
};

export type TGetOtpInputHighlightStateArgs = {
  index: number;
  isFocused: boolean;
  value: string;
  totalLength: number;
};

type TGetOtpInputHighlightState = (
  args: TGetOtpInputHighlightStateArgs,
) => TOtpState;

export const getOtpInputHighlightState: TGetOtpInputHighlightState = ({
  index,
  isFocused,
  value,
  totalLength,
}) => {
  if (index < 0 || index >= totalLength || typeof value !== "string") {
    return {
      isFieldHighlighted: false,
      isFieldFocused: false,
    };
  }

  return {
    isFieldHighlighted:
      value.length > index || (value.length === index && isFocused),
    isFieldFocused: isFocused && value.length === index,
  };
};
