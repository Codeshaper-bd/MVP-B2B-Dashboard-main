import { memo } from "react";
import { DeviceFrameset } from "react-device-frameset";

import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import type { IApiStateInfo } from "@/components/render-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import EventView from "./event-view";
import TicketingView from "./ticketing-view";
export interface IEventViewProps {
  getAnEventData: TEvent | TNullish;
  getAnEventApiState: IApiStateInfo;
  isEventCompany?: boolean;
}
function EventPhoneView({
  getAnEventData,
  getAnEventApiState,
  isEventCompany,
}: IEventViewProps) {
  return (
    <Tabs defaultValue="eventView" className="mx-auto max-w-[470px]">
      <TabsList className="grid w-full grid-cols-2 border border-default-100">
        <TabsTrigger value="eventView">Event View</TabsTrigger>
        <TabsTrigger value="ticketingView">Ticketing View</TabsTrigger>
      </TabsList>

      <TabsContent
        value="eventView"
        className="mt-4 rounded-[12px] border border-default-100 p-6"
      >
        <DeviceFrameset device="iPhone X">
          <EventView
            getAnEventData={getAnEventData}
            getAnEventApiState={getAnEventApiState}
            isEventCompany={isEventCompany}
          />
        </DeviceFrameset>
      </TabsContent>

      <TabsContent
        value="ticketingView"
        className="mt-4 rounded-[12px] border border-default-100 p-6"
      >
        <DeviceFrameset device="iPhone X">
          <div className="bg-[#121212] py-10">
            <div className="flex items-center px-2.5">
              <div className="flex flex-1 items-center gap-3.5">
                <ChevronRightIcon className="size-6 text-default-1000" />
                <span className="text-lg font-medium text-default-1000">
                  All Ticket
                </span>
              </div>

              <div className="flex-none">
                <SearchIcon className="size-6 text-default-1000" />
              </div>
            </div>

            <ScrollArea className="h-[710px]">
              <TicketingView
                getAnEventData={getAnEventData}
                getAnEventApiState={getAnEventApiState}
                isEventCompany={isEventCompany}
              />
            </ScrollArea>
          </div>
        </DeviceFrameset>
      </TabsContent>
    </Tabs>
  );
}

export default memo(EventPhoneView);
