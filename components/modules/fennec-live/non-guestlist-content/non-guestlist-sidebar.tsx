import { useGetFennecLiveNonGuestlistQuery } from "@/store/api/fennec-live/fennec-live-api";
import FemaleIcon from "@/components/icons/FemaleIcon";
import MaleIcon from "@/components/icons/MaleIcon";
import RenderData from "@/components/render-data";
import CardSkeleton from "@/components/skeleton/card-skeleton";

function NonGuestListSidebar() {
  const {
    data: getFennecLiveNonGuestlistRes,
    ...getFennecLiveNonGuestlistApiState
  } = useGetFennecLiveNonGuestlistQuery();
  const getFennecLiveNonGuestlistData = getFennecLiveNonGuestlistRes?.data;
  return (
    <RenderData
      expectedDataType="object"
      data={getFennecLiveNonGuestlistData}
      {...getFennecLiveNonGuestlistApiState}
      loadingSkeleton={<CardSkeleton length={2} />}
    >
      <div className="grid grid-cols-2 gap-3 py-4">
        <div className="rounded-lg border border-secondary p-2">
          <p className="text-sm font-normal text-default-600">Male</p>
          <p className="mt-2 flex items-center gap-2 text-default-1000">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#263CFF]">
              <MaleIcon className="h-4 w-4" />
            </div>
            {getFennecLiveNonGuestlistData?.male || 0}
          </p>
        </div>
        <div className="rounded-lg border border-secondary p-2">
          <p className="text-sm font-normal text-default-600">Female</p>
          <p className="mt-2 flex items-center gap-2 text-default-1000">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D82ADC]">
              <FemaleIcon className="h-4 w-4" />
            </div>
            {getFennecLiveNonGuestlistData?.female || 0}
          </p>
        </div>
        <div className="rounded-lg border border-secondary p-2">
          <p className="text-sm font-normal text-default-600">Neutral</p>
          <p className="mt-2 flex items-center gap-2 text-default-1000">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F79009]">
              <FemaleIcon className="h-4 w-4" />
            </div>
            {getFennecLiveNonGuestlistData?.unisex || 0}
          </p>
        </div>
        <div className="rounded-lg border border-secondary p-2">
          <p className="text-sm font-normal text-default-600">
            Total Non-GL Entries
          </p>
          <p className="mt-2 flex items-center gap-2 text-default-1000">
            {getFennecLiveNonGuestlistData?.total || 0}
          </p>
        </div>
      </div>
    </RenderData>
  );
}

export default NonGuestListSidebar;
