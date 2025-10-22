"use client";
import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import EventCoordination from "@/components/modules/promoter/overview/EventCoordination";
import EventsInfo from "@/components/modules/promoter/overview/EventsInfo";
import GuestListTables from "@/components/modules/promoter/overview/guest-list-tables";
import PrivateGuestList from "@/components/modules/promoter/overview/PrivateGuestlist";
import RenderData from "@/components/render-data";
import { Separator } from "@/components/ui/separator";

function PromoterOverview() {
  const { getAnEventData, getAnEventApiState } = useFetchAnEventData();
  const { getAParamValue } = useManageSearchParams<{
    ticketTierId?: string;
    promoterId?: string;
  }>();
  const ticketTierId = getAParamValue("ticketTierId");
  const promoterId = getAParamValue("promoterId");
  return (
    <RenderData
      expectedDataType="object"
      data={getAnEventData}
      {...getAnEventApiState}
    >
      <div className="space-y-8">
        <EventsInfo
          getAnEventData={getAnEventData}
          promoterId={promoterId}
          ticketTierId={ticketTierId}
        />
        <Separator className="bg-default-200" />
        <EventCoordination
          event={getAnEventData}
          ticketTierId={ticketTierId}
          promoterId={promoterId}
        />
        <GuestListTables
          getAnEventData={getAnEventData}
          promoterId={promoterId}
          ticketTierId={ticketTierId}
        />
        <PrivateGuestList
          getAnEventData={getAnEventData}
          promoterId={promoterId}
        />
      </div>
    </RenderData>
  );
}

export default PromoterOverview;
