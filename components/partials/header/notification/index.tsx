"use client";

import { memo, useState } from "react";

import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { useNotifications } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";
import { selectAuthUser } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";
import NotificationBellIcon from "@/components/icons/NotificationBellIcon";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import TabCardList from "./TabCardList";
import TabCardList from "./TabCardList/CustomInfiniteDataFetching";
import useNotificationToast from "./useNotificationToast";

function Notifications() {
  // const { isOpen: isPopoverOpen, setState: setIsPopoverOpen } =
  //   useBooleanContext();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const authUser = useAppSelector(selectAuthUser);
  const userId = authUser?.id || -1;
  const { notifications } = useNotifications(userId);

  useNotificationToast({ notifications, userId });
  useLockBodyScroll(isPopoverOpen);

  // const { getAllParamValue } =
  //   useManageSearchParams<Exclude<TGetAllNotificationsArgs, void>>();
  // const { page, pageSize, isRead } = getAllParamValue();
  // const { data: getAllNotificationsRes, ...getAllNotificationsApiState } =
  //   useGetAllNotificationQuery({
  //     page: page || contentPerPageOptions.initialPage,
  //     pageSize: pageSize || contentPerPageOptions[10],
  //     isRead: isRead || false,
  //   });
  // const getAllNotificationsData = getAllNotificationsRes?.data || [];

  return (
    <div>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            size="40"
            className={cn(
              "focus:ring-none relative flex-col items-center justify-center rounded-lg border border-default-200 !bg-secondary text-default-700 hover:text-primary focus:outline-none md:flex md:bg-default-50",
              {
                "!bg-primary": isPopoverOpen,
              },
            )}
          >
            <NotificationBellIcon
              className={cn(
                "size-5 animate-tada",
                isPopoverOpen && "text-primary-foreground",
              )}
            />

            <div className="absolute -right-1 -top-1 size-2 animate-pulse rounded-full bg-primary" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          side="bottom"
          className="z-50 w-full border-none bg-[#0C111D] p-0 text-white shadow-none"
        >
          <div className="overflow-hidden">
            <div className="w-full rounded-xl border border-default-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold leading-7 text-white">
                  Notification
                </h3>
              </div>

              <Tabs defaultValue="home">
                <div className="relative z-[0]">
                  <div className="max-w-[90vw] overflow-x-auto px-6">
                    <TabsList className="shrink-0 flex-nowrap">
                      <TabsTrigger
                        value="all"
                        className="relative text-sm font-semibold leading-5 !text-default-600 before:absolute before:left-0 before:top-full before:h-px before:w-full data-[state=active]:!text-primary data-[state=active]:before:bg-primary"
                      >
                        All
                      </TabsTrigger>
                      <TabsTrigger
                        value="todoList"
                        className="relative text-sm font-semibold leading-5 !text-default-600 before:absolute before:left-0 before:top-full before:h-px before:w-full data-[state=active]:!text-primary data-[state=active]:before:bg-primary"
                      >
                        To Do List
                      </TabsTrigger>
                      <TabsTrigger
                        value="upcomingEvents"
                        className="relative text-sm font-semibold leading-5 !text-default-600 before:absolute before:left-0 before:top-full before:h-px before:w-full data-[state=active]:!text-primary data-[state=active]:before:bg-primary"
                      >
                        Upcoming Events
                      </TabsTrigger>
                      <TabsTrigger
                        value="inventory"
                        className="relative text-sm font-semibold leading-5 !text-default-600 before:absolute before:left-0 before:top-full before:h-px before:w-full data-[state=active]:!text-primary data-[state=active]:before:bg-primary"
                      >
                        Inventory
                      </TabsTrigger>
                      <TabsTrigger
                        value="refund"
                        className="relative text-sm font-semibold leading-5 !text-default-600 before:absolute before:left-0 before:top-full before:h-px before:w-full data-[state=active]:!text-primary data-[state=active]:before:bg-primary"
                      >
                        Refund{" "}
                        {/* <Badge
                          color="destructive"
                          className="ms-2 flex size-6 items-center justify-center bg-destructive p-0 text-destructive-foreground"
                        >
                          2
                        </Badge> */}
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="absolute bottom-[3px] left-0 right-0 z-[-1] w-full border-b border-b-[#1F242F]" />
                </div>

                <TabsContent value="all" className="mt-0">
                  <TabCardList />
                </TabsContent>
                <TabsContent value="todoList" className="mt-0">
                  <TabCardList type="TODO" />
                </TabsContent>
                <TabsContent value="upcomingEvents" className="mt-0">
                  <TabCardList type="EVENT" />
                </TabsContent>
                <TabsContent value="inventory" className="mt-0">
                  <TabCardList type="STOCK" />
                </TabsContent>
                <TabsContent value="refund" className="mt-0">
                  <TabCardList type="REFUND" />
                  {/* <RefundList /> */}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default memo(Notifications);
