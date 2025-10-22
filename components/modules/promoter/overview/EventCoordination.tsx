"use client";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import { useGetPromoterPermissionsQuery } from "@/store/api/promoter/promoter-api";
import { EGuestListType } from "@/store/api/promoters/promoters.types";
import ComingSoon from "@/components/templates/coming-soon";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { GuestList } from "./GuestList";

type TTabValue = "guestList" | "tableManagement";
type TTabState = { tab?: TTabValue };

type TTabOption = {
  value: TTabValue;
  label: string;
};

interface IEventCoordinationProps {
  event: TEvent | TNullish;
  ticketTierId?: string;
  promoterId?: TIdOrSlugOrIdentifier<"id">["id"];
}
function EventCoordination({
  event,
  ticketTierId,
  promoterId,
}: IEventCoordinationProps) {
  const eventId = event?.details?.id;
  const { getAParamValue, updateAParam } = useManageSearchParams<
    TTabState & {
      eventId: TIdOrSlugOrIdentifier<"id">["id"];
    }
  >();
  const tab: TTabValue = getAParamValue("tab") || "guestList";

  const { data: getPromoterPermissionsRes, ...getPromoterPermissionsApiState } =
    useGetPromoterPermissionsQuery(
      {
        eventId,
      },
      {
        skip: !checkIsValidId(eventId, {
          type: "number",
        }),
      },
    );
  const getPromoterPermissionsData = getPromoterPermissionsRes?.data;
  const hasTableManagement = getPromoterPermissionsData?.permissions?.includes(
    EGuestListType.TableManagement,
  );
  const tabs: TTabOption[] = [
    {
      label: "Guest List",
      value: "guestList",
    },
    ...(hasTableManagement
      ? [
          {
            label: "Table Management",
            value: "tableManagement" as TTabValue,
          },
        ]
      : []),
  ];
  return (
    <div>
      <Tabs defaultValue={tab} className="w-full">
        <TabsList className="w-fit border border-secondary">
          {tabs?.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="font-normal"
              onClick={() =>
                updateAParam({
                  key: "tab",
                  value: tab?.value === "guestList" ? undefined : tab?.value,
                })
              }
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-4">
          {tab === "guestList" && (
            <GuestList
              event={event}
              ticketTierId={ticketTierId}
              promoterId={promoterId}
            />
          )}
          {tab === "tableManagement" && <ComingSoon />}
        </div>
      </Tabs>
    </div>
  );
}

export default EventCoordination;
