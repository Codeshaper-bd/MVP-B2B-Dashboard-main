import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import { useGetPastEventGuestListOverviewQuery } from "@/store/api/past-event/past-event-api";
import { UserIcon as FemaleIcon } from "@/components/icons";
import { UserIcon as MaleIcon } from "@/components/icons";
import RenderData from "@/components/render-data";

import StatCard from "./StatCard";
interface INonGuestListStat {
  eventSlug: string | TNullish;
}
function NonGuestListStat({ eventSlug }: INonGuestListStat) {
  const isSlugValid = checkIsValidId(eventSlug, { type: "string" });

  const {
    data: getPastEventGuestListOverviewRes,
    ...getPastEventGuestListOverviewApiState
  } = useGetPastEventGuestListOverviewQuery(
    { slug: eventSlug },
    { skip: !isSlugValid },
  );
  const getFennecLiveTotalGuestlistData =
    getPastEventGuestListOverviewRes?.data;
  const { nonGuestlistEntries } = getFennecLiveTotalGuestlistData || {};
  return (
    <div className="w-full">
      <RenderData
        expectedDataType="object"
        data={getFennecLiveTotalGuestlistData}
        {...getPastEventGuestListOverviewApiState}
      >
        <div className="grid grid-cols-3 gap-3 py-4">
          <StatCard
            icon={<MaleIcon className="h-4 w-4 text-default-1000" />}
            name="Male"
            value={nonGuestlistEntries?.genderDistribution?.male || 0}
          />
          <StatCard
            icon={<FemaleIcon className="h-4 w-4 text-default-1000" />}
            iconWrapperClass="bg-[#D82ADC]"
            name="Female"
            value={nonGuestlistEntries?.genderDistribution?.female || 0}
          />
          <StatCard
            icon={
              <div className="text-sm font-semibold text-default-1000">N/A</div>
            }
            iconWrapperClass="bg-[#F79009]"
            name="N/A"
            value={nonGuestlistEntries?.genderDistribution?.unisex || 0}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="w-full rounded-lg border border-secondary p-5">
            <p className="text-sm font-normal text-default-600">
              Total Non-GL Entries
            </p>
            <p className="mt-2 flex items-center gap-2 text-base font-semibold text-default-1000">
              {nonGuestlistEntries?.total || 0}
            </p>
          </div>
        </div>
      </RenderData>
    </div>
  );
}

export default NonGuestListStat;
