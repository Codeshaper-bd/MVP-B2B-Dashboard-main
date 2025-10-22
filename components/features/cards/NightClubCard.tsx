"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TOrganizationPromoter } from "@/store/api/promoter/promoter.types";
import LocationIcon from "@/components/icons/LocationIcon";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface INightClubCardProps {
  promoter: TOrganizationPromoter;
}
function NightClubCard({ promoter }: INightClubCardProps) {
  const { name, media, address, description, slug } = promoter;
  const mediaUrl = useMemo(() => {
    if (!media) {
      return null;
    }
    return media[0]?.url || null;
  }, [media]);
  return (
    <Card className="group relative overflow-hidden rounded-2xl bg-[#161B26] transition-all duration-200 hover:shadow-hover">
      <Link
        href={`/en/promoter/clubs/${slug}`}
        className="relative block !aspect-[1.454166] h-fit w-full overflow-hidden"
      >
        <Image
          src={getImageFallback({
            src: mediaUrl,
            fallbackImageSize: 300,
          })}
          alt={"image of event"}
          width={415}
          height={300}
          className="!aspect-[1.454166] h-full w-full !object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <CardContent className="px-6 pb-6 pt-4">
        <CardTitle className="line-clamp-1 text-lg font-semibold leading-7 text-white hover:text-primary">
          <Link href={`/en/promoter/clubs/${slug}`}>{name}</Link>
        </CardTitle>

        <div className="mb-2 mt-4 flex items-center gap-2">
          <LocationIcon className="h-4 w-4 shrink-0 text-default-700" />

          <h5 className="line-clamp-1 text-sm font-medium not-italic leading-5 text-default-700">
            {address || "No address found"}
          </h5>
        </div>

        <p className="line-clamp-2 text-sm font-normal not-italic leading-5 text-default-700">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

export default NightClubCard;
