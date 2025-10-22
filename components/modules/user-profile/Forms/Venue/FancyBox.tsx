"use client";
import { Fancybox as NativeFancyBox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import type { OptionsType } from "@fancyapps/ui/types/Fancybox/options";
import { useEffect, useRef } from "react";

interface IFancyBoxProps {
  delegate?: string;
  options?: Partial<OptionsType>;
  children: React.ReactNode;
}

function FancyBox({
  children,
  delegate = "[data-fancybox]",
  options = {},
}: IFancyBoxProps) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current as HTMLElement | null;

    NativeFancyBox.bind(container, delegate, options);

    return () => {
      NativeFancyBox.unbind(container);
      NativeFancyBox.close();
    };
  });

  return <div ref={containerRef}>{children}</div>;
}

export default FancyBox;
