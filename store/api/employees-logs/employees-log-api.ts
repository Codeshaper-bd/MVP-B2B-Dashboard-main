import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TGetAnEmployeeActivityArgs,
  TGetAnEmployeeActivityRes,
} from "./employees-log.types";

export const employeesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnEmployeeActivity: builder.query<
      TGetAnEmployeeActivityRes,
      TGetAnEmployeeActivityArgs
    >({
      query: ({ employeeId, ...args }) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/activity-logs/employee/${employeeId}${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAnEmployeeActivity"],
    }),
  }),
});

export const { useGetAnEmployeeActivityQuery } = employeesApi;
