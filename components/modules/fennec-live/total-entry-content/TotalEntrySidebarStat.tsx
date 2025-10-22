import { useGetFennecLiveTotalGuestlistQuery } from "@/store/api/fennec-live/fennec-live-api";
import FemaleIcon from "@/components/icons/FemaleIcon";
import MaleIcon from "@/components/icons/MaleIcon";
import UserIcon from "@/components/icons/UserIcon";
import RenderData from "@/components/render-data";
import CardSkeleton from "@/components/skeleton/card-skeleton";

function TotalEntrySidebarStat() {
  const {
    data: getFennecLiveTotalGuestlistRes,
    ...getFennecLiveTotalGuestlistApiState
  } = useGetFennecLiveTotalGuestlistQuery();
  const getFennecLiveTotalGuestlistData = getFennecLiveTotalGuestlistRes?.data;

  return (
    <div className="w-full">
      <RenderData
        expectedDataType="object"
        data={getFennecLiveTotalGuestlistData}
        {...getFennecLiveTotalGuestlistApiState}
        loadingSkeleton={<CardSkeleton length={4} />}
      >
        <div className="grid grid-cols-2 gap-3 py-4">
          {getFennecLiveTotalGuestlistData?.ticketTierStats?.map(
            ({ name, checkedIn, ticketTierId }) => (
              <div
                className="w-full rounded-lg border border-secondary p-2"
                key={`ticketTierStats-${ticketTierId}`}
              >
                <p className="text-sm font-normal text-default-600">{name}</p>
                <p className="mt-2 flex items-center gap-2 text-default-1000">
                  <UserIcon className="h-4 w-4" />
                  {checkedIn}
                </p>
              </div>
            ),
          )}

          <div className="w-full rounded-lg border border-secondary p-2">
            <p className="text-sm font-normal text-default-600">
              Total Entered
            </p>
            <p className="mt-2 flex items-center gap-2 text-default-1000">
              <UserIcon className="h-4 w-4" />
              {getFennecLiveTotalGuestlistData?.totalEntered || 0}
            </p>
          </div>
          <div className="flex w-full items-center gap-2 rounded-lg border border-secondary p-2 py-3.5 text-default-1000">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#263CFF] text-default-1000">
              <MaleIcon className="h-5 w-5" />
            </div>
            {getFennecLiveTotalGuestlistData?.genderRatio || "N/A"}
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D82ADC] text-default-1000">
              <FemaleIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
        <p className="mt-2 text-lg font-semibold text-default-1000">
          Guestlist
        </p>
        <div className="grid grid-cols-3 gap-3 py-4">
          <div className="w-full rounded-lg border border-secondary p-2">
            <p className="text-sm font-normal text-default-600">Male</p>
            <p className="mt-2 flex items-center gap-2 text-default-1000">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#263CFF]">
                <MaleIcon className="h-4 w-4" />
              </div>
              {getFennecLiveTotalGuestlistData?.genderBreakdown?.male || 0}
            </p>
          </div>
          <div className="w-full rounded-lg border border-secondary p-2">
            <p className="text-sm font-normal text-default-600">Female</p>
            <p className="mt-2 flex items-center gap-2 text-default-1000">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D82ADC]">
                <FemaleIcon className="h-4 w-4" />
              </div>
              {getFennecLiveTotalGuestlistData?.genderBreakdown?.female || 0}
            </p>
          </div>
          <div className="w-full rounded-lg border border-secondary p-2">
            <p className="text-sm font-normal text-default-600">Neutral</p>
            <p className="mt-2 flex items-center gap-2 text-default-1000">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F79009]">
                <FemaleIcon className="h-4 w-4" />
              </div>
              {getFennecLiveTotalGuestlistData?.genderBreakdown?.unisex || 0}
            </p>
          </div>
          <div className="w-full rounded-lg border border-secondary p-2">
            <p className="text-sm font-normal text-default-600">Expecting</p>
            <p className="mt-2 flex items-center gap-2 text-default-1000">
              {getFennecLiveTotalGuestlistData?.totalAttendees || 0}
            </p>
          </div>
          <div className="w-full rounded-lg border border-secondary p-2">
            <p className="text-sm font-normal text-default-600">Entered</p>
            <p className="mt-2 flex items-center gap-2 text-default-1000">
              {getFennecLiveTotalGuestlistData?.totalEntered || 0}
            </p>
          </div>
        </div>
      </RenderData>
    </div>
  );
}

export default TotalEntrySidebarStat;
