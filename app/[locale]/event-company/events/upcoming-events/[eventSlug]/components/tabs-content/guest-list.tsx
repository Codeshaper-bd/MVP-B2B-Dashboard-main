import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import BackButton from "@/components/Buttons/back-button";
import CheckInSummery from "@/components/modules/event/guest-list/CheckInSummery";
import GuestListTable from "@/components/modules/event/guest-list/tables/guest-list-table";
import RenderData from "@/components/render-data";

export default function GuestList() {
  const { getAnEventData, getAnEventApiState } = useFetchAnEventData();
  return (
    <RenderData
      expectedDataType="object"
      data={getAnEventData}
      {...getAnEventApiState}
    >
      <div className="space-y-6">
        <CheckInSummery getAnEventData={getAnEventData} />
        <GuestListTable
          getAnEventData={getAnEventData}
          getAnEventApiState={getAnEventApiState}
        />

        <div className="mt-6 flex justify-end gap-3">
          <BackButton />
        </div>
      </div>
    </RenderData>
  );
}
