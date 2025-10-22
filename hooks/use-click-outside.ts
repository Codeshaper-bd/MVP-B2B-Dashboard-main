"use client";
import { useEffect } from "react";

type THandleClickOutsideProps<T extends HTMLElement | null = null> = {
  callback?: (event?: MouseEvent) => void;
  ref: React.RefObject<T | null>;
};

function handleClickOutside<
  T extends HTMLElement | null = null,
  EventType extends MouseEvent | TouchEvent = MouseEvent,
>({ ref, callback }: THandleClickOutsideProps<T>) {
  return (event: EventType) => {
    if (
      ref.current &&
      event?.target instanceof Node &&
      !ref?.current?.contains?.(event.target)
    ) {
      callback?.();
    }
  };
}

type TUseClickOutsideProps<T extends HTMLElement | null> = {
  ref: React.RefObject<T | null>;
  callback?: () => void;
};

// Hook to detect clicks outside of the element
function useClickOutside<T extends HTMLElement | null>({
  ref,
  callback,
}: TUseClickOutsideProps<T>) {
  useEffect(() => {
    const mouseEventListener = handleClickOutside<T>({ callback, ref });
    const touchEventListener = handleClickOutside<T, TouchEvent>({
      callback,
      ref,
    });
    const controller = new AbortController();
    const signal = controller.signal;

    document?.addEventListener("mousedown", mouseEventListener, { signal });
    document?.addEventListener("touchstart", touchEventListener, { signal });

    return () => {
      controller.abort();
    };
  }, [ref, callback]);
}

export default useClickOutside;
