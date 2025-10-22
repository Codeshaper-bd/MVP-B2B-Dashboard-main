import Image from "next/image";
import Link from "next/link";

import RightArrowIcon from "@/components/icons/RightArrowIcon";
import { Card, CardContent } from "@/components/ui/card";

export type DetailsCardProps = {
  image: string;
  title: string;
  date: string;
  time: string;
  price: string;
  viewLink: string;
  quantity?: string;
};
function DetailsCard({ item }: { item: DetailsCardProps }) {
  const { image, title, date, time, price, viewLink, quantity } = item;
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-6 sm:flex-row sm:items-center">
          <div className={`${quantity ? "h-[114px]" : "h-[98px]"} w-[130px]`}>
            <Image
              src={image}
              alt={title}
              width={130}
              height={98}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-semibold text-default-900">
              <Link href={viewLink} className="hover:text-primary">
                {title}
              </Link>
            </h3>
            <div className="text-sm text-default-600">
              <span>{date}</span> <span>{time}</span>
            </div>
            <div className="text-sm text-default-600">
              <span>Price: </span>
              <span className="text-sm font-medium text-default-700">
                $ {price}
              </span>
            </div>
            {quantity && (
              <div className="text-sm text-default-600">
                <span>Quantity: </span>
                <span className="text-sm font-medium text-default-700">
                  {quantity}
                </span>
              </div>
            )}
          </div>
        </div>
        <Link
          href={viewLink}
          className="flex flex-none items-center gap-3 text-primary hover:text-primary/90"
        >
          <span className="text-sm font-medium">View Detail</span>
          <RightArrowIcon className="size-6" />
        </Link>
      </CardContent>
    </Card>
  );
}

export default DetailsCard;
