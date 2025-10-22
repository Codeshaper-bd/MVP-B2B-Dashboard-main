import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import { useGetPastEventGuestListOverviewQuery } from "@/store/api/past-event/past-event-api";
import FemaleIcon from "@/components/icons/FemaleIcon";
import MaleIcon from "@/components/icons/MaleIcon";
import UserIcon from "@/components/icons/UserIcon";
import RenderData from "@/components/render-data";
import { Card, CardContent } from "@/components/ui/card";

import StatCard from "./StatCard";

interface IPastTotalEntryStat {
  eventSlug: string | TNullish;
}
function PastTotalEntryStat({ eventSlug }: IPastTotalEntryStat) {
  const {
    data: getPastEventGuestListOverviewRes,
    ...getPastEventGuestListOverviewApiState
  } = useGetPastEventGuestListOverviewQuery(
    { slug: eventSlug },
    {
      skip: !checkIsValidId(eventSlug, { type: "string" }),
    },
  );
  const getFennecLiveTotalGuestlistData =
    getPastEventGuestListOverviewRes?.data;

  const {
    totalEntries,
    totalAttendees,
    guestlistEntries,
    nonGuestlistEntries,
  } = getFennecLiveTotalGuestlistData || {};

  return (
    <div className="w-full">
      <RenderData
        expectedDataType="object"
        data={getFennecLiveTotalGuestlistData}
        {...getPastEventGuestListOverviewApiState}
      >
        <div className="grid grid-cols-1 gap-3 py-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-normal text-default-600">
                Total Entered
              </p>
              <p className="mt-2 flex items-center gap-2 text-default-1000">
                <UserIcon className="h-4 w-4" />
                {totalAttendees || 0}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex">
                <div className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#263CFF] text-default-1000">
                    <MaleIcon className="h-5 w-5" />
                  </div>
                  <div className="flex w-full">
                    <span className="flex-1 text-center">
                      {totalEntries?.genderDistribution?.male}
                    </span>
                    <span className="flex-none">:</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D82ADC] text-default-1000">
                    <FemaleIcon className="h-5 w-5" />
                  </div>
                  <div className="flex w-full">
                    <span className="flex-1 text-center">
                      {totalEntries?.genderDistribution?.female}
                    </span>
                    <span className="flex-none">:</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F79009] font-semibold text-default-1000">
                    N/A
                  </div>
                  {totalEntries?.genderDistribution?.unisex}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <p className="mt-2 text-lg font-semibold text-default-1000">
          Guestlist
        </p>
        <div className="grid grid-cols-3 gap-3 py-4">
          <StatCard
            icon={<MaleIcon className="h-4 w-4 text-default-1000" />}
            name="Male"
            value={guestlistEntries?.genderDistribution?.male || 0}
          />
          <StatCard
            icon={<FemaleIcon className="h-4 w-4 text-default-1000" />}
            iconWrapperClass="bg-[#D82ADC]"
            name="Female"
            value={guestlistEntries?.genderDistribution?.female || 0}
          />
          <StatCard
            icon={
              <div className="text-sm font-semibold text-default-1000">N/A</div>
            }
            iconWrapperClass="bg-[#F79009]"
            name="N/A"
            value={guestlistEntries?.genderDistribution?.unisex || 0}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="w-full rounded-lg border border-secondary p-5">
            <p className="text-sm font-normal text-default-600">Expecting</p>
            <p className="mt-2 flex items-center gap-2 text-base font-semibold text-default-1000">
              {totalAttendees}
            </p>
          </div>
          <div className="w-full rounded-lg border border-secondary p-5">
            <p className="text-sm font-normal text-default-600">Entered</p>
            <p className="mt-2 flex items-center gap-2 text-base font-semibold text-default-1000">
              {guestlistEntries?.total}
            </p>
          </div>
        </div>
      </RenderData>
    </div>
  );
}

export default PastTotalEntryStat;
