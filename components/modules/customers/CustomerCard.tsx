import Image from "next/image";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import { Card, CardContent } from "@/components/ui/card";

export interface ICustomerCardProps {
  url?: string;
  customerName: string;
  customerId: string;
  email: string;
}
function CustomerCard({
  url,
  customerName,
  customerId,
  email,
}: ICustomerCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-4 h-[254px] w-full rounded-md bg-default-50">
          <Image
            src={getImageFallback({ src: url })}
            alt=""
            width={300}
            height={254}
            className="size-full rounded-md object-cover"
          />
        </div>
        <h3 className="mb-1.5 text-base font-semibold text-default-700">
          {customerName}
        </h3>
        <p className="mb-1.5 text-sm text-default-600">{email}</p>
        <p className="text-sm text-default-600">ID: {customerId}</p>
      </CardContent>
    </Card>
  );
}

export default CustomerCard;
