import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import { useGetAnEmployeePerformanceQuery } from "@/store/api/employees/employees-api";
import type { TGetAnEmployeePerformanceData } from "@/store/api/employees/employees.types";
import { useGetAnEmployeeActivityQuery } from "@/store/api/employees-logs/employees-log-api";
import type { TGetAnEmployeeActivityData } from "@/store/api/employees-logs/employees-log.types";
import type { IApiStateInfo } from "@/components/render-data";

export type TPageParams = Params & {
  locale: string;
  employeeId: TIdOrSlugOrIdentifier<"id">["id"];
};

export type TUseFetchEmployeePerformanceDataArgs = {
  employeeId?: TIdOrSlugOrIdentifier<"id">["id"];
  eventId?: TIdOrSlugOrIdentifier<"id">["id"];
  employeeData?: TGetAnEmployeePerformanceData | TNullish;
};
export type TUseFetchEmployeePerformanceReturnType = {
  getAnEmployeePerformanceData: TGetAnEmployeePerformanceData | TNullish;
  getAnEmployeePerformanceApiState: IApiStateInfo;

  getAnEmployeeActivityData: TGetAnEmployeeActivityData[];
  getAnEmployeeActivityApiState: IApiStateInfo;
};

export const useFetchEmployeePerformanceData = ({
  employeeId,
  eventId,
}: TUseFetchEmployeePerformanceDataArgs): TUseFetchEmployeePerformanceReturnType => {
  const {
    data: getAnEmployeePerformanceRes,
    ...getAnEmployeePerformanceApiState
  } = useGetAnEmployeePerformanceQuery({
    employeeId,
    eventId: eventId ? eventId : undefined,
  });

  const { data: getAnEmployeeActivityRes, ...getAnEmployeeActivityApiState } =
    useGetAnEmployeeActivityQuery(
      { employeeId, eventId: eventId ? eventId : undefined },
      { skip: !employeeId },
    );
  const getAnEmployeePerformanceData = getAnEmployeePerformanceRes?.data;
  const getAnEmployeeActivityData = getAnEmployeeActivityRes?.data ?? [];

  return {
    getAnEmployeePerformanceData,
    getAnEmployeePerformanceApiState,
    getAnEmployeeActivityData,
    getAnEmployeeActivityApiState,
  };
};
