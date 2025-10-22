import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo } from "react";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TBar } from "@/store/api/bars/bars.types";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import CubeIcon from "@/components/icons/CubeIcon";
import DollarRoundedIcon from "@/components/icons/DollarRoundedIcon";
import WineIcon from "@/components/icons/WineIcon";
import { Card, CardContent } from "@/components/ui/card";

type TBarCardProps = TBar & {};

function BarCard(props: TBarCardProps) {
  const { name, slug, media, revenue, productsSold, reamingStock } = props;
  const router = useRouter();

  return (
    <Card
      className="group cursor-pointer bg-secondary"
      onClick={() => router.push(`/en/organization/bars/${slug}`)}
    >
      <CardContent className="p-3">
        <div className="grid grid-cols-12 items-center sm:gap-8">
          <div className="col-span-12 lg:col-span-3">
            <div className="mb-6 h-[184px] w-full sm:mb-0">
              <Image
                src={getImageFallback({
                  src: media?.url,
                  fallbackImageSize: 500,
                })}
                alt={name}
                width={300}
                height={300}
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          </div>
          <div className="col-span-12 flex items-center gap-4 lg:col-span-9">
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-semibold text-[#F5F5F6] group-hover:text-primary">
                {name}
              </h3>
              <ul className="space-y-3 text-default-600 md:max-w-[320px]">
                <li className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <DollarRoundedIcon className="size-4" /> Revenue:
                  </span>
                  <span className="text-default-700"> ${revenue}</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <WineIcon className="size-4" /> Products Sold:
                  </span>
                  <span className="text-default-700"> {productsSold}</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <CubeIcon className="size-4" /> Inventory
                  </span>
                  <span className="text-default-700">
                    {reamingStock}% stock left
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex-none pe-4">
              <Link href={`/en/organization/bars/${slug}`}>
                <ChevronLeftIcon className="size-5 text-default-700 group-hover:text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(BarCard);
