import { useFetchEmployeePerformanceData } from "@/hooks/data-fetch/useFetchEmployeePerformanceData";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import RenderData from "@/components/render-data";

import ActivityItem from "./ActivityItem";

interface IActivityListProps {
  employeeId: TIdOrSlugOrIdentifier<"id">["id"];
}
function ActivityList({ employeeId }: IActivityListProps) {
  const { getAnEmployeeActivityData, getAnEmployeeActivityApiState } =
    useFetchEmployeePerformanceData({
      employeeId,
    });
  return (
    <RenderData
      data={getAnEmployeeActivityData}
      expectedDataType="array"
      {...getAnEmployeeActivityApiState}
    >
      <ol className="space-y-3 text-sm text-default-900">
        {getAnEmployeeActivityData.map((activity, index) => (
          <ActivityItem key={index} activity={activity} />
        ))}
      </ol>
    </RenderData>
  );
}

export default ActivityList;
