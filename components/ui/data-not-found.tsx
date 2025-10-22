import { memo } from "react";

import { cn } from "@/lib/utils";

import { NoDataFound } from "../icons/NoDataFound";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  className?: string;
  subtitle?: string;
}

function DataNotFound({ title, subtitle, className, ...props }: Props) {
  return (
    <div
      className={cn("flex flex-col items-center py-7", className)}
      {...props}
    >
      <NoDataFound className="w-48 opacity-60" />
      <div className="mb-1 pt-6 text-lg font-semibold text-white">
        {title ?? "No Data Found"}
      </div>
      <p className="text-sm text-default-500">
        {subtitle ?? "Sorry we couldn’t find any data."}
      </p>
    </div>
  );
}

export default memo(DataNotFound);
