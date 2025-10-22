import { Loader2 } from "lucide-react";
import Image from "next/image";

function DataLoader() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex animate-pulse flex-col items-center gap-1.5">
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
          <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-default-1000">
            <Loader2 className="me-2 h-4 w-4 animate-spin" />
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
}

export default DataLoader;
