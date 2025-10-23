import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetPromotersTicketSoldQuery } from "@/store/api/promoter/promoter-api";
import { UserIcon as FemaleIcon } from "@/components/icons";
import { UserIcon as MaleIcon } from "@/components/icons";
import TierCard from "@/components/modules/tiers/TierCard";
import RenderData from "@/components/render-data";
import InputSkeleton from "@/components/skeleton/input-skeleton";

import RevenueChart from "./revenueChart";

export function GuestList() {
  const { getAParamValue } = useManageSearchParams<{
    ticketTierId?: string;
    eventId: string;
  }>();

  const ticketTierId = getAParamValue("ticketTierId");
  const eventId = getAParamValue("eventId");

  // Ticket Sold API
  const { data: getTicketSoldRes, ...getTicketSoldApiState } =
    useGetPromotersTicketSoldQuery({
      eventId,
      ticketTierId,
    });
  const getTicketSoldData = getTicketSoldRes?.data;

  return (
    <div>
      <RenderData
        expectedDataType="object"
        loadingSkeleton={
          <div className="my-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <InputSkeleton length={1} />
            <InputSkeleton length={1} />
            <InputSkeleton length={1} />
            <InputSkeleton length={1} />
          </div>
        }
        {...getTicketSoldApiState}
        data={getTicketSoldData}
      >
        <div className="my-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="">
            <TierCard
              title="Male"
              icon={<MaleIcon className="h-6 w-6 text-default-1000" />}
              ticketCount={getTicketSoldData?.attendees?.male || 0}
              iconWrapperClass="bg-[#263CFF]"
            />
          </div>
          <div className="">
            <TierCard
              title="Female"
              icon={<FemaleIcon className="h-6 w-6 text-default-1000" />}
              ticketCount={getTicketSoldData?.attendees?.female || 0}
              iconWrapperClass="!bg-[#D82ADC]"
            />
          </div>
          <div className="">
            <TierCard
              title="Neutral"
              icon={<div className="size-6 text-[#F5F5F6]">N/A</div>}
              ticketCount={
                getTicketSoldData?.attendees?.otherOrUnspecified || 0
              }
              iconWrapperClass="!bg-[#F79009]"
            />
          </div>
          <div className="">
            <TierCard
              title="Total Ticket Sales"
              ticketCount={getTicketSoldData?.totalSoldQty || 0}
            />
          </div>
        </div>
      </RenderData>
      <RevenueChart />
    </div>
  );
}
