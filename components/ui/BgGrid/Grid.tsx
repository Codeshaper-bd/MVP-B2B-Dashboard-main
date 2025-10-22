import Image from "next/image";

import { cn } from "@/lib/utils";

interface IGridProps {
  className?: string;
}

function Grid({ className }: IGridProps) {
  return (
    <>
      <div className={cn("absolute -left-6 -top-6 !-z-20", className)}>
        <div className="!-z-20 size-[320px] sm:size-[336px]">
          <Image
            src={"/images/svg/bg-grid.svg"}
            alt="background grid"
            width={336}
            height={336}
            className="!-z-20 size-[320px] object-contain sm:size-[336px]"
          />
        </div>
      </div>
    </>
  );
}

export default Grid;
