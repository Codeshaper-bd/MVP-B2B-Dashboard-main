import { useCallback } from "react";

export const useBlockNumberInputScroll = ({
  onWheel,
  onTouchMove,
  type,
}: Pick<React.ComponentProps<"input">, "onWheel" | "onTouchMove" | "type">) => {
  const handleNumberInput = useCallback(
    <
      T extends
        | React.WheelEvent<HTMLInputElement>
        | React.TouchEvent<HTMLInputElement>,
    >(
      e: T,
      type: React.ComponentProps<"input">["type"],
      callback?: (e: T) => void,
    ) => {
      try {
        if (type === "number") {
          e.stopPropagation();
          e.currentTarget.blur();
          callback?.(e);
          return;
        }
        callback?.(e);
      } catch (error) {
        console.error("Error handling number input:", error);
      }
    },
    [],
  );
  const onWheelHandler = useCallback(
    (e: React.WheelEvent<HTMLInputElement>) => {
      handleNumberInput(e, type, onWheel);
    },
    [handleNumberInput, onWheel, type],
  );
  const onTouchMoveHandler = useCallback(
    (e: React.TouchEvent<HTMLInputElement>) => {
      handleNumberInput(e, type, onTouchMove);
    },
    [handleNumberInput, onTouchMove, type],
  );

  return { onWheel: onWheelHandler, onTouchMove: onTouchMoveHandler };
};
