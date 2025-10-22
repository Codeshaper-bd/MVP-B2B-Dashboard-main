import {
  createApi,
  fetchBaseQuery,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
  type QueryReturnValue,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

import { clientEnv } from "@/config/client-config";
import { compareDateTimes } from "@/lib/date-time/compare-date-times";
import { getUserTimeZone } from "@/lib/date-time/utc-date";

// Need to use the React-specific entry point to import `createApi`

import type { TRootState } from "..";
import { logout, updateToken } from "../features/auth";
import type { TRefreshTokenRes } from "./auth/auth.types";

type TFetchBaseQueryReturnType = ReturnType<typeof fetchBaseQuery>;

const baseQuery: TFetchBaseQueryReturnType = fetchBaseQuery({
  baseUrl: clientEnv.API_BASE_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const state = getState() as TRootState;
    const token = state?.authSlice?.authInfo?.accessToken;
    if (!token) {
      headers.delete("Authorization");
      return headers;
    }

    headers.set("Authorization", `Bearer ${token}`);
    headers.set("X-User-Timezone", getUserTimeZone());

    return headers;
  },
});

const baseQueryWithReAuth: TFetchBaseQueryReturnType = async (
  args,
  api,
  extraOptions,
) => {
  let result: QueryReturnValue<
    unknown,
    FetchBaseQueryError,
    FetchBaseQueryMeta
  > = await baseQuery(args, api, extraOptions);
  const { authSlice } = api.getState() as TRootState;

  const isRefreshTokenExpired =
    !!authSlice?.authInfo &&
    !!authSlice?.authInfo?.refreshToken &&
    !!authSlice?.authInfo?.refreshExpiresAt &&
    compareDateTimes({
      providedDateTime: authSlice?.authInfo?.refreshExpiresAt,
      comparisonUnit: "seconds",
    })?.status !== "after";

  if (authSlice?.authInfo !== null && isRefreshTokenExpired) {
    api.dispatch(logout());
    api.dispatch(apiSlice?.util?.resetApiState());
    Cookies.remove("authTokens");
    Cookies.remove("userInfo");
  }

  const isAccessTokenExpired =
    !!authSlice?.authInfo &&
    !!authSlice?.authInfo?.accessToken &&
    !!authSlice?.authInfo?.accessExpiresAt &&
    compareDateTimes({
      providedDateTime: authSlice?.authInfo?.accessExpiresAt,
      comparisonUnit: "seconds",
    })?.status !== "after";

  if (
    result?.error?.status === 401 &&
    !isRefreshTokenExpired &&
    isAccessTokenExpired
  ) {
    const refreshTokenApiRes = (await baseQuery(
      {
        url: "/api/v1/auth/refresh-token",
        method: "POST",
        body: {
          refreshToken: authSlice?.authInfo?.refreshToken,
        },
      },
      api,
      extraOptions,
    )) as {
      data: TRefreshTokenRes;
    };
    const refreshTokenApiData = refreshTokenApiRes?.data?.data;

    api.dispatch(
      updateToken({
        accessToken: refreshTokenApiData?.accessToken,
        accessExpiresAt: refreshTokenApiData?.accessExpiresAt,
      }),
    );
    result = await baseQuery(args, api, extraOptions);
    return result;
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  tagTypes: [
    // dashboard
    "getDashboardUpcomingEvents",
    "getDashboardRevenueAndPoints",
    // Sales Revenue
    "getAllSalesRevenue",
    "getSalesRevenueComparison",
    "getLatestRevenue",
    "getSalesRevenueOverviewGraph",
    "getSalesRevenueChart",
    "getSalesRevenueBarGraph",
    // todo
    "getNotCompletedTodos",
    "getCompletedTodos",
    "getOverviewTodo",
    "getATodo",
    "getAllTodoTags",

    // challenge
    "getAllChallenge",
    "getAChallenge",
    "getRevenueByChallenges",
    "getTopChallenges",
    "getTotalEngagementByChallenges",
    "getAChallengeActiveEvents",

    // promotion
    "getAllPromotion",
    "getAPromotion",
    "getTopPromotions",
    "getTotalEngagementByPromotions",
    "getMonthlyPromotionRevenue",
    "getAPromotionActiveEvents",

    // bar menu
    "getAllBarMenu",
    "getABarMenu",

    // bar menu item
    "getAllBarMenuItem",
    "getBarMenuItem",
    "getAllBarMenuItemByBarMenuSlug",
    "getABarMenuItemStats",

    // inventory item
    "getAllInventoryItem",
    "getAllGroupTypeInventoryItem",
    "getAnInventoryItem",
    "getAllInventoryItemIncludingBar",

    // inventory transfer
    "getAnInventoryTransferHistory",
    "getInventoryTransferHistory",

    // employee
    "getAllEmployee",
    "getAEmployee",
    "getAnEmployeePerformance",
    "getAnEmployeeActivity",

    // customer
    "getAllCustomer",
    "getACustomer",
    "getAllInvitedCustomers",
    "getUserEventJoined",
    "getUserOrdersByMonth",
    "getCustomersStatistics",

    // media
    "getAllMedia",
    "getAMedia",

    // Roles
    "getAllRoles",
    "getARole",
    "getShipment",

    // venues
    "getAllVenue",
    "getAVenue",

    // ticket tiers
    "getAllTicketTier",
    "getATicketTier",
    "getTicketTiersDetails",

    // group discount
    "getAllGroupDiscount",
    "getAGroupDiscount",

    // discount
    "getAllDiscount",
    "getADiscount",

    // add-ons
    "getAllAddOn",
    "getAnAddOn",

    // transactions
    "getAllTransactions",
    "getATransaction",

    // link tracking
    "getAllLinkTracking",
    "getALinkTracking",

    // events
    "getAllEvent",
    "getAnEvent",
    "getAnEventOrders",
    "getAnEventOrderDetails",
    "getEventHourlyRevenue",
    "getTicketTiers",
    "getGuestList",
    "getCheckInSummery",
    "getAnEventRevenue",
    "getAnEventPayout",

    // Past Event
    "getPastEventRevenueOverview",
    "getPastEventChallenges",
    "getPastEventPromotions",
    "getPastEventGuestListCheckIn",
    "getPastEventGuestListOverview",
    "getPastEventOrders",
    "getPastEventTransactions",
    "getPastEventTicketOverview",
    "getPastEventCheckInSummery",
    "getPastEventHourlyRevenue",

    // bar
    "getAllBars",
    "getABar",
    "getPastEventBar",

    // bar inventory
    "getBarInventoryItem",

    // Feedback
    "getAllFeedback",
    "getAFeedback",

    // inventory
    "getANotificationSettings",
    "getAllInventoryProducts",
    "getAnInventoryProduct",

    // inventory category
    "getAllInventoryCategory",
    "getAnInventoryCategory",

    // support Ticket
    "getAllSupportTickets",
    "getASupportTicket",

    // profile
    "getAuthenticatedUserProfile",

    // organization
    "getAuthenticatedUserOrganizationDetails",

    // customer lookup
    "getAllCustomerLookup",
    "getACustomerLookup",

    // loyalty program
    "getALoyaltyProgram",
    "createLoyaltyProgramPoints",

    // Notifications
    "getAllNotifications",

    // sales report
    "getSalesReportByItemList",
    "getSalesReportByAnEvent",
    "getSalesReportByAnEventAndBar",

    // fennec live
    "getFennecLiveB2B",
    "getFennecLiveB2BChallenges",
    "getFennecLiveB2BGuestList",
    "getFennecLiveB2BPromotions",
    "getFennecLiveBarStatistics",
    "getFennecLiveRevenueOverview",
    "getFennecLiveRevenueOverTime",
    "getFennecLiveBarRevenueOverTime",
    "getFennecLiveTotalGuestlist",
    "getFennecLiveNonGuestlist",
    "getFennecLiveGuestlistDetails",
    "getFennecLiveNonGuestlistDetails",

    // Promoters
    "getAllPromoters",
    "getAnPromoterEvents",
    "getAllAvailablePromoters",
    "getAllUnassignedPromoters",
    "getPromoterRevenue",
    "getAPromoterDetails",
    "getAPromoterTicketSold",
    "getAPromoterTicketSoldRevenue",
    "getPromotersTrackingLink",

    // Promoter Portal
    "getAllPromotersInOrganization",
    "getAllEventsInOrganization",
    "getAllAssignedEvents",
    "getPromoterTicketTiers",
    "getAPromoterEventDetails",
    "getPromoterTicketSold",
    "getPromoterTicketSoldRevenue",
    "getPromotersTicketSoldList",

    // Bank details
    "getAllBankDetails",
    "getABankDetails",

    // stripe
    "getAStripePaymentStatus",
  ],
});

export type TApiSlice = typeof apiSlice;
