import Image from "next/image";
import Link from "next/link";

import type { TBar } from "@/store/api/bars/bars.types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export interface IBarInventoryCartProps {
  id: string | number | null | undefined;
  image: string | null | undefined;
  title: string | null | undefined;
  subtitle: string | null | undefined;
  link: string;
}

function BarInventoryCard({ item }: { item: TBar }) {
  const { name, slug, media, productCount } = item;
  return (
    <Link href={`/en/inventory/inventory-management/bar-inventory/${slug}`}>
      <Card className="w-full cursor-pointer overflow-hidden rounded-xl hover:border-primary">
        <div className="relative aspect-[1/0.6] w-full">
          <Image
            src={media?.url ?? "/placeholder-image.png"}
            alt={name || "Inventory Image"}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
          />
        </div>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <p className="text-sm text-default-500">{productCount} Product</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default BarInventoryCard;
