import { useParams } from "next/navigation";
import { useState } from "react";

import {
  useFetchEmployeePerformanceData,
  type TPageParams,
} from "@/hooks/data-fetch/useFetchEmployeePerformanceData";
import ActivityList from "@/components/modules/employees/ActivityList";
import BartendarCard from "@/components/modules/employees/compared/BartenderCard";
import DrinksSoldChart from "@/components/modules/employees/compared/DrinksSoldChart";
import EmployeeInfo from "@/components/modules/employees/compared/EmployeeInfo";
import GuestlistCard from "@/components/modules/employees/compared/GuestlistCard";
import TicketScanChart from "@/components/modules/employees/compared/TicketScanChart";
import ViewContent, {
  type TSelectedEvent,
} from "@/components/modules/employees/compared/ViewContent";
import RenderData from "@/components/render-data";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import EmployeeDetailsSkeleton from "@/components/skeleton/EmployeeDetailsSkeleton";
import { Separator } from "@/components/ui/separator";

function DefaultContent() {
  const [selectedEvent, setSelectedEvent] = useState<TSelectedEvent>(null);
  const [showActivity, setShowActivity] = useState<boolean>(false);
  const { employeeId } = useParams<TPageParams>();
  const { getAnEmployeePerformanceData, getAnEmployeePerformanceApiState } =
    useFetchEmployeePerformanceData({
      employeeId,
      eventId: selectedEvent?.value,
    });

  return (
    <RenderData
      expectedDataType="object"
      data={getAnEmployeePerformanceData}
      {...getAnEmployeePerformanceApiState}
      loadingSkeleton={<EmployeeDetailsSkeleton columns={1} />}
    >
      <div className="space-y-6">
        <EmployeeInfo
          showActivity={showActivity}
          setShowActivity={setShowActivity}
          eventId={selectedEvent?.value}
          employeeId={employeeId}
          employeeData={getAnEmployeePerformanceData}
        />

        {showActivity ? (
          <ViewContent
            title="Activity History"
            selectedEvent={selectedEvent ?? null}
            setSelectedEvent={
              setSelectedEvent as React.Dispatch<
                React.SetStateAction<IOption | null>
              >
            }
          >
            <Separator className="mb-5" />
            <ActivityList employeeId={employeeId} />
          </ViewContent>
        ) : (
          <ViewContent
            title="View Performance For"
            selectedEvent={selectedEvent ?? null}
            setSelectedEvent={
              setSelectedEvent as React.Dispatch<
                React.SetStateAction<IOption | null>
              >
            }
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <GuestlistCard
                eventId={selectedEvent?.value}
                employeeId={employeeId}
                employeeData={getAnEmployeePerformanceData}
              />

              <TicketScanChart
                eventId={selectedEvent?.value}
                employeeId={employeeId}
                employeeData={getAnEmployeePerformanceData}
              />

              <BartendarCard
                eventId={selectedEvent?.value}
                employeeId={employeeId}
                employeeData={getAnEmployeePerformanceData}
              />

              <DrinksSoldChart
                eventId={selectedEvent?.value}
                employeeId={employeeId}
                employeeData={getAnEmployeePerformanceData}
              />
            </div>
          </ViewContent>
        )}
      </div>
    </RenderData>
  );
}

export default DefaultContent;
