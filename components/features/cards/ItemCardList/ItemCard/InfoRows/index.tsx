import { cn } from "@/lib/utils";

import Info, { type TInfoProps } from "./Info";

export type TInfoRowsProps = {
  className?: string;
  data: TInfoProps[] | null | undefined;
};

function InfoRows({ className, data }: TInfoRowsProps) {
  return (
    <div className={cn("grid gap-3", className)}>
      {data?.map((info, index) => <Info key={index} {...info} />)}
    </div>
  );
}

export default InfoRows;
