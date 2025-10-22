"use client";
import { memo } from "react";

import { useMounted } from "@/hooks/use-mounted";
import Loader from "@/components/loader/loader";

function MountedProvider({ children }: { children: React.ReactNode }) {
  const mounted = useMounted();
  if (!mounted) {
    return <Loader />;
  }
  return children;
}

export default memo(MountedProvider);
