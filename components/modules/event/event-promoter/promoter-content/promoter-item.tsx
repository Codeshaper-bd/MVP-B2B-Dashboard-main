import Link from "next/link";

import useIsEventCompany from "@/hooks/feature/useIsEventCompany";
import { generateQueryString } from "@/lib/query-management/generate-query-string";
import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import type { TLinkTracking } from "@/store/api/link-tracking/link-tracking.types";
import { CopyInput } from "@/components/copy-input";
import DeleteIcon from "@/components/icons/DeleteIcon";
import LinkIcon from "@/components/icons/LinkIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export interface IPromoterItem {
  getAnPromoterItem: TLinkTracking;
  deletePromoterHandler?: (id: TIdOrSlugOrIdentifier<"id">["id"]) => void;
  getAnEventData: TEvent | TNullish;
  isPastEvent?: boolean;
}
function PromoterItem({
  getAnPromoterItem,
  deletePromoterHandler,
  getAnEventData,
  isPastEvent,
}: IPromoterItem) {
  const isEventCompany = useIsEventCompany();
  const eventSlug = getAnEventData?.details?.slug;
  const { promoter, displayShortURL } = getAnPromoterItem;
  const queryData = {
    promoterId: promoter?.id,
  };
  const { queryString } = generateQueryString(queryData, {
    stringifyToPreserveTypes: true,
  });

  const getPromoterOverviewURL = () => {
    const basePath = isEventCompany ? "/en/event-company/events" : "/en/events";
    const eventType = isPastEvent ? "past-events" : "upcoming-events";

    return `${basePath}/${eventType}/${eventSlug}/promoter-overview${queryString}`;
  };

  const promoterOverviewURL = getPromoterOverviewURL();
  return (
    <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center">
      <Button
        asChild
        color="secondary"
        size="lg"
        fullWidth
        className="justify-start px-2 md:px-3"
      >
        <div>
          <Avatar className="size-6">
            <AvatarImage src={promoter?.media?.[0]?.url || ""} />
            <AvatarFallback>{promoter?.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="ms-2 text-base font-medium">{promoter?.name}</span>
        </div>
      </Button>
      <CopyInput
        type="text"
        value={displayShortURL ?? ""}
        leftContent={<LinkIcon className="size-5 text-default-500" />}
        color="secondary"
        className="h-11 w-full border-default-200 bg-secondary lg:w-[294px]"
        copySuccessMessage="Promoter link copied to clipboard"
        copyErrorMessage="Failed to copy promoter link"
      />

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          type="button"
          color="primary"
          size="lg"
          className="flex-none"
          asChild
        >
          <Link href={promoterOverviewURL}>View Details</Link>
        </Button>
        {deletePromoterHandler && (
          <Button
            size="icon"
            variant="ghost"
            color="destructive"
            className="flex-none"
            onClick={() => deletePromoterHandler?.(promoter?.id)}
          >
            <DeleteIcon className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default PromoterItem;
