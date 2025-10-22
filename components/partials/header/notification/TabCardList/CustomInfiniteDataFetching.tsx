import { memo } from "react";
import { Virtuoso } from "react-virtuoso";

import useManageStateParams from "@/hooks/useManageStateParams";
import { getSocialFormattedTimeFromNow } from "@/lib/date-time/get-social-formatted-time-from-now";
import {
  useGetIntervalNotificationsQuery,
  useGetMoreNotificationsQuery,
  useGetNotificationsQuery,
} from "@/store/api/notifications/notifications-api";
import type { TGetAllNotificationsArgs } from "@/store/api/notifications/notifications.types";
import RenderData from "@/components/render-data";

import NotificationFooter from "./NotificationFooter";
import TabCard, { type ITabCardProps } from "./TabCard";
import RefundItem from "../refund-list/refund-item";

const INITIAL_PAGE: number = 1;
const INITIAL_PAGE_SIZE: number = 10;

const parsePageParams = (arg: TGetAllNotificationsArgs) => {
  let pageNumber: number = Number(arg?.page || INITIAL_PAGE);
  pageNumber = Number.isNaN(pageNumber)
    ? INITIAL_PAGE
    : pageNumber || INITIAL_PAGE;
  let pageSize: number = Number(arg?.pageSize || INITIAL_PAGE_SIZE);
  pageSize = Number.isNaN(pageSize)
    ? INITIAL_PAGE_SIZE
    : pageSize || INITIAL_PAGE_SIZE;

  return {
    pageNumber,
    pageSize,
  };
};

interface ITabCardListProps {
  type?: ITabCardProps["type"];
}

function TabCardList({ type }: ITabCardListProps) {
  const { getAllParamValue, updateMultipleParam } =
    useManageStateParams<Exclude<TGetAllNotificationsArgs, undefined | void>>();
  const queryArgs = getAllParamValue();

  /* custom infinite query start */
  const args: TGetAllNotificationsArgs = {
    ...queryArgs,
    type,
    page: queryArgs?.page || INITIAL_PAGE,
    pageSize: 10,
    isRead: false,
  };
  const { pageNumber, pageSize } = parsePageParams(args);
  const { data: customInfiniteNotificationRes, ...getNotificationsApiState } =
    useGetNotificationsQuery({
      ...args,
      page: INITIAL_PAGE,
      pageSize: pageSize || INITIAL_PAGE_SIZE,
    });
  const customInfiniteNotificationData = customInfiniteNotificationRes?.data;
  const customInfiniteNotificationDataLength =
    customInfiniteNotificationData?.length || 0;
  const hasMore: boolean =
    Number(customInfiniteNotificationRes?.pagination?.page || 1) <
    Number(customInfiniteNotificationRes?.pagination?.totalPages || 1);
  const getMoreNotifications = useGetMoreNotificationsQuery(
    {
      ...args,
      page: pageNumber,
      pageSize: pageSize || INITIAL_PAGE_SIZE,
    },
    {
      skip: pageNumber < 2 || !pageNumber,
    },
  );
  useGetIntervalNotificationsQuery(
    {
      ...args,
      page: INITIAL_PAGE,
      pageSize: pageSize || INITIAL_PAGE_SIZE,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 30 * 1000,
    },
  );
  const apiState = {
    isLoading: getNotificationsApiState.isLoading,
    isFetching:
      getNotificationsApiState.isFetching ||
      getMoreNotifications?.isLoading ||
      getMoreNotifications?.isFetching,
    isSuccess:
      getNotificationsApiState.isSuccess || getMoreNotifications?.isSuccess,
    isError: getNotificationsApiState.isError || getMoreNotifications?.isError,
    error: getNotificationsApiState.error || getMoreNotifications?.error,
  };

  return (
    <RenderData
      {...apiState}
      isFetching={false}
      expectedDataType="array"
      // data={customInfiniteNotificationData}
      data={[]}
    >
      <Virtuoso
        style={{ height: window.innerHeight - 350 }}
        context={{ hasMore }}
        className="transition-linear custom-scrollbar dark:custom-scrollbar-darkMode grid w-full gap-0.5 overflow-y-auto overflow-x-hidden scroll-smooth"
        data={
          Array.isArray(customInfiniteNotificationData)
            ? customInfiniteNotificationData
            : []
        }
        endReached={() => {
          if (hasMore && !apiState?.isFetching) {
            updateMultipleParam({
              page: pageNumber + 1,
              pageSize: pageSize || INITIAL_PAGE_SIZE,
            });
          }
        }}
        // increaseViewportBy={200}
        itemContent={(index, item) => {
          switch (item?.type) {
            case "TODO":
              return (
                <TabCard
                  key={item?.id}
                  id={item?.id}
                  type="TODO"
                  title={item?.metadata?.title}
                  descriptionFirstPart="Due in: "
                  descriptionSecondPart={getSocialFormattedTimeFromNow(
                    item?.metadata?.dueDate,
                  )}
                  descriptionReverse
                />
              );

            case "EVENT":
              return (
                <TabCard
                  key={item?.id}
                  id={item?.id}
                  type="EVENT"
                  title={item?.metadata?.name}
                  descriptionFirstPart="Due in: "
                  descriptionSecondPart={getSocialFormattedTimeFromNow(
                    item?.metadata?.dueDate,
                  )}
                  descriptionReverse
                />
              );

            case "STOCK":
              return (
                <TabCard
                  key={item?.id}
                  id={item?.id}
                  type="STOCK"
                  title={item?.metadata?.name}
                  descriptionFirstPart={item?.metadata?.currentStock || 0}
                  descriptionSecondPart={item?.metadata?.message}
                />
              );

            case "REFUND":
              return (
                <RefundItem
                  key={item?.id}
                  id={item?.id}
                  name={item?.metadata?.customerName}
                  status={item?.metadata?.status}
                  media={item?.metadata?.media?.url ?? ""}
                  // onClick={setData}
                  // setOpen={setOpen}
                />
              );
          }
        }}
        components={{ Footer: NotificationFooter }}
      />
    </RenderData>
  );
}

export default memo(TabCardList);
