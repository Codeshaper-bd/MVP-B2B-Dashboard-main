import Image from "next/image";
import Link from "next/link";

import useIsEventCompany from "@/hooks/feature/useIsEventCompany";
import { convertToNumber } from "@/lib/data-types/number";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import type { TNullish } from "@/store/api/common-api-types";
import type { TPromoterEvents } from "@/store/api/promoters/promoters.types";
import CopyButton from "@/components/Buttons/copy-button";
import { ArrowLeftIcon as ArrowLeftIcon } from "@/components/icons";
import { CheckIcon as CheckIcon } from "@/components/icons";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import LinkIcon from "@/components/icons/LinkIcon";
import SquareArrowIcon from "@/components/icons/SquareArrowIcon";
import VerticalThreeDotIcon from "@/components/icons/VerticalThreeDotIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getEventLink, getPromoterOverviewLink } from "./utils";

export interface IEventCardProps {
  details: TPromoterEvents["details"];
  onClick?: (id: number) => void;
  onDelete?: (id: number) => void;
  selectedId?: number;
  promoterLink?: string;
  disableRedirect?: boolean;
  promoterId?: string | number | TNullish;
}
function EventCard({
  disableRedirect,
  details,
  selectedId,
  onClick,
  onDelete,
  promoterLink,
  promoterId,
}: IEventCardProps) {
  const isEventCompany = useIsEventCompany();
  const eventId = convertToNumber({
    value: details?.id,
    digit: 2,
  });

  const eventLink = getEventLink({ details, isEventCompany });

  const eventDetailsLink = getPromoterOverviewLink({
    details,
    promoterId,
    isEventCompany,
  });

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border-2 border-solid border-default-100 bg-default transition-all duration-300 ease-in-out hover:cursor-pointer hover:border-primary",
        {
          "cursor-pointer border-primary": details?.id === selectedId,
        },
      )}
      onClick={() => {
        onClick?.(eventId);
      }}
    >
      {details?.id === selectedId && (
        <span className="absolute right-2 top-2 grid size-6 place-content-center rounded-full bg-primary text-[#0C111D]">
          <CheckIcon className="size-3" />
        </span>
      )}

      <Link
        href={disableRedirect ? "#" : eventLink}
        className="block h-[200px] w-full"
      >
        <Image
          src={getImageFallback({
            src: details?.media?.find((media) => media?.isFeatured)?.url,
            fallbackImageSize: 100,
          })}
          alt={details?.name || "Event Image"}
          width={266}
          height={200}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex gap-2 px-4 pb-4 pt-3">
        <div className="flex-1">
          <h3 className="mb-1.5 max-w-[100px] truncate text-base font-semibold leading-6 text-default-1000 hover:text-primary">
            <Link href={eventLink}>{details?.name}</Link>
          </h3>

          <p className="text-sm font-normal leading-5 text-default-700">
            {convertUTCToLocal({
              utcDateTime: details?.startTime,
              format: "DD MMM YYYY",
            })}
          </p>
        </div>
        <div className="flex-none">
          <Badge
            className={cn("!border-[#9E165F] !bg-[#4E0D30] !text-[#FAA7E0]", {
              "!border-[#455A64] !bg-[#053321] !text-[#FAA7E0]":
                !details?.isRecurring,
            })}
          >
            {details?.isRecurring ? "Recurring" : "One Time"}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4 pb-4">
        <Button color="secondary" className="h-9 flex-1" fullWidth asChild>
          <Link href={promoterLink ?? "#"} target="_blank">
            Tracking Link
            <SquareArrowIcon className="ms-1 size-4" />
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              color="secondary"
              className="flex-none cursor-pointer"
              size="icon"
            >
              <VerticalThreeDotIcon className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top">
            <DropdownMenuItem className="cursor-pointer focus:bg-primary/10 focus:text-primary">
              <CopyButton
                text={promoterLink || "#"}
                copySuccessMessage="Tracking link copied to clipboard."
              >
                <>
                  <LinkIcon className="size-5" /> Copy Tracking Link{" "}
                </>
              </CopyButton>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer focus:bg-primary/10 focus:text-primary">
              <Link
                className="flex items-center gap-1"
                href={eventDetailsLink ?? "#"}
              >
                <ArrowLeftIcon className="size-5 rotate-180" /> View Details
              </Link>
            </DropdownMenuItem>
            {onDelete && (
              <DropdownMenuItem
                className="cursor-pointer focus:bg-destructive/10 focus:text-destructive"
                onClick={() => onDelete?.(eventId)}
              >
                <DeleteIcon className="me-1 size-5" /> Unassign Event
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default EventCard;
