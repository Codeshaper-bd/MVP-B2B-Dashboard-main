import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { memo, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { getSocialFormattedTimeFromNow } from "@/lib/date-time/get-social-formatted-time-from-now";
import { cn } from "@/lib/utils";
import type { TNullish, TPagination } from "@/store/api/common-api-types";
import { useGetAllNotificationsInfiniteQuery } from "@/store/api/notifications/notifications-api";
import type {
  TGetAllNotificationsArgs,
  TNotification,
} from "@/store/api/notifications/notifications.types";
import LoadingIcon from "@/components/icons/LoadingIcon";
import RenderData from "@/components/render-data";

import TabCard, { type ITabCardProps } from "./TabCard";
import RefundItem from "../refund-list/refund-item";
dayjs.extend(relativeTime);

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
  /* custom infinite query start */
  // const [page, setPage] = useState(1);
  // const args: TGetAllNotificationsArgs = {
  //   page,
  //   pageSize: 10,
  //   isRead: false,
  // };
  // const { pageNumber, pageSize } = parsePageParams(args);
  // const { data: customInfiniteNotificationRes } = useGetNotificationsQuery({
  //   ...args,
  //   page: INITIAL_PAGE,
  //   pageSize: pageSize || INITIAL_PAGE_SIZE,
  // });
  // const customInfiniteNotificationData = customInfiniteNotificationRes?.data;
  // // console.log(
  // //   "🚀 ~ TabCardList ~ customInfiniteNotificationRes:",
  // //   customInfiniteNotificationRes,
  // // );
  // useGetMoreNotificationsQuery(
  //   {
  //     ...args,
  //     page: pageNumber,
  //     pageSize: pageSize || INITIAL_PAGE_SIZE,
  //   },
  //   {
  //     skip: pageNumber < 2 || !pageNumber,
  //   },
  // );

  // const interValRef = useRef<NodeJS.Timeout | null>(null);
  // useEffect(() => {
  //   interValRef.current = setInterval(() => {
  //     console.log("fetching notifications");
  //     setPage((prev) => {
  //       if (prev < 51) {
  //         fetchNextPage();
  //         return prev + 1;
  //       }
  //       return prev;
  //     });
  //   }, 300);

  //   return () => {
  //     if (interValRef.current) {
  //       clearInterval(interValRef.current);
  //       interValRef.current = null;
  //     }
  //   };
  // }, []);

  /* custom infinite query end */

  const {
    data: getNotificationsPages,
    fetchNextPage,
    ...getNotificationsApiState
  } = useGetAllNotificationsInfiniteQuery({
    type,
  });

  const {
    data: infiniteNotificationData,
    pagination,
    dataLength,
    hasMore,
  } = useMemo(() => {
    const data: TNotification[] = [];
    const totalPages: number = getNotificationsPages?.pages?.length || 0;
    const lastIndex: number = totalPages > 0 ? totalPages - 1 : 0;
    const lastPaginationInfo: TPagination | TNullish =
      getNotificationsPages?.pages?.[lastIndex]?.pagination || null;

    const hasMore: boolean =
      (lastPaginationInfo?.page || 1) < (lastPaginationInfo?.totalPages || 1);

    for (let index = 0; index < totalPages; index++) {
      const page = getNotificationsPages?.pages?.[index];
      if (page?.data) {
        data.push(...page.data);
      }
    }

    return {
      data,
      dataLength: data?.length || 0,
      hasMore,
      pagination: {
        page: Number(lastPaginationInfo?.page || 1),
        pageSize: Number(
          lastPaginationInfo?.pageSize || lastPaginationInfo?.totalCount || 10,
        ),
        totalPages: Number(lastPaginationInfo?.totalPages || 1),
        totalCount: Number(lastPaginationInfo?.totalCount || 0),
      },
    };
  }, [getNotificationsPages?.pages]);

  return (
    <RenderData
      {...getNotificationsApiState}
      isFetching={false}
      expectedDataType="array"
      data={infiniteNotificationData}
    >
      <InfiniteScroll
        height={window.innerHeight - 350}
        dataLength={dataLength}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={
          <div className="flex w-full items-center justify-center gap-2 pb-2">
            <LoadingIcon className="transition-linear h-4 w-4 !animate-spin text-default-900" />

            <p className="text-sm text-default-900">Loading...</p>
          </div>
        }
        endMessage={
          <p className="flex w-full justify-center pb-2 text-sm text-default-900">
            No more todo to load.
          </p>
        }
        className={cn(
          "transition-linear custom-scrollbar dark:custom-scrollbar-darkMode grid w-full gap-0.5 overflow-y-auto overflow-x-hidden scroll-smooth",
        )}
      >
        {infiniteNotificationData?.map((item) => {
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
        })}
      </InfiniteScroll>
    </RenderData>
  );
}

export default memo(TabCardList);
