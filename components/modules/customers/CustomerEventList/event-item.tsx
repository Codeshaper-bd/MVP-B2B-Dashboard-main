import Image from "next/image";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import { Card, CardContent } from "@/components/ui/card";

export interface IEventListItem {
  imageUrl: string;
  name: string;
  date: string;
  price: number;
  quantities?: string;
}
function EventListItem({
  imageUrl,
  name,
  date,
  price,
  quantities,
}: IEventListItem) {
  return (
    <Card className="bg-secondary">
      <CardContent className="p-4">
        <div className="flex items-center gap-5">
          <div className="h-[114px] w-[150px] flex-none">
            <Image
              src={getImageFallback({ src: imageUrl })}
              alt={name}
              width={300}
              height={300}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h3 className="mb-4 text-xl font-semibold text-[#F5F5F6]">
              {name}
            </h3>
            <p className="mb-4 text-sm text-default-600">{date}</p>
            <p>Price: {price}</p>
            {quantities && <p>Quantity: {quantities}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EventListItem;
