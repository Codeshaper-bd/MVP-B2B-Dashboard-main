import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TNullish } from "@/store/api/common-api-types";
import type { TPromoter } from "@/store/api/promoters/promoters.types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

function PromoterAvatar({ promoter }: { promoter: TPromoter | TNullish }) {
  if (!promoter) {
    return null;
  }
  return (
    <div className="flex items-center gap-2 pb-4">
      <Avatar>
        <AvatarImage
          src={getImageFallback({
            src: promoter?.media?.url,
            fallbackImageSize: 100,
          })}
        />
      </Avatar>
      <h3 className="text-sm font-medium text-default-800">
        {promoter?.fullName} {promoter?.firstName} {promoter?.lastName}
      </h3>
    </div>
  );
}

export default PromoterAvatar;
