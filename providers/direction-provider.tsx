"use client";
import { DirectionProvider as RadixDirProvider } from "@radix-ui/react-direction";
import React, { memo, useEffect } from "react";

import { useConfig } from "@/hooks/use-config";

function DirectionProvider({
  direction,
  children,
}: {
  direction: React.ComponentProps<typeof RadixDirProvider>["dir"];
  children: React.ReactNode;
}) {
  const [, setConfig] = useConfig();

  useEffect(() => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      isRtl: direction === "rtl",
    }));
  }, [direction, setConfig]);

  return <RadixDirProvider dir={direction}>{children}</RadixDirProvider>;
}

export default memo(DirectionProvider);
