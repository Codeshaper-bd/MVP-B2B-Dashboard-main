import Image from "next/image";

import { InfoIcon as InfoIcon } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
interface PointItemProps {
  image: string;
  points: number;
  title: string;
}
function PointItem({ image, points, title }: PointItemProps) {
  return (
    <Card className="rounded-md border-none bg-[#1B1B1B] p-4">
      <CardContent className="p-0">
        <div className="flex items-center">
          <div className="flex flex-1 items-center gap-2.5">
            <Image
              src={image}
              alt=""
              width={100}
              height={100}
              className="h-[51px] w-[51px] flex-none"
            />
            <span className="flex-1 text-[28px] font-semibold text-default-1000">
              {points}
            </span>
          </div>
          <div className="flex flex-none items-center gap-1">
            <span className="text-base font-medium text-default-1000">
              {title}
            </span>
            <InfoIcon className="size-5 text-[#E0B148]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PointItem;
