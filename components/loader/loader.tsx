"use client";
import { Loader2 } from "lucide-react";
import Image from "next/image";

import { useMounted } from "@/hooks/use-mounted";
function Loader() {
  const mounted = useMounted();
  return mounted ? null : (
    <div className="flex h-screen flex-col items-center justify-center space-y-2 bg-background">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/main-logo.png"
          alt=""
          width={100}
          height={30}
          className="w-32"
          priority
        />
      </div>
      <span className="mt-1 inline-flex items-center gap-1">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </span>
    </div>
  );
}

export default Loader;
