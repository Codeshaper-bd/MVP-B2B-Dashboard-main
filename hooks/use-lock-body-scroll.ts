"use client";
import { useEffect } from "react";

const getScrollbarWidth = (): number => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return 0;
  }
  return window.innerWidth - document.documentElement.clientWidth;
};

export const useLockBodyScroll = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      const scrollbarWidth = getScrollbarWidth();
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isLocked]);
};
