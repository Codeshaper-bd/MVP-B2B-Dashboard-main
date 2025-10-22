"use client";
import { useState } from "react";

import { cn } from "@/lib/utils";
import type { TNullish } from "@/store/api/common-api-types";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import EventSearch from "../../event/event-search";
import type { IEventSearchProps } from "../../event/event-search/types";

type TTab = "overall" | "byEvent";
export type TSelectedEvent = IOption | TNullish;

export type TViewContent = {
  children: React.ReactNode;
  title: string;
} & IEventSearchProps;
function ViewContent({
  children,
  title,
  selectedEvent,
  setSelectedEvent,
}: TViewContent) {
  const [tab, setTab] = useState<TTab>(selectedEvent ? "byEvent" : "overall");

  return (
    <div className="space-y-6">
      <Card className="shadow-none">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-6">
            <div className="whitespace-nowrap text-default-1000">{title}</div>
            <div className="flex w-full flex-col gap-2 sm:w-auto lg:flex-row">
              <Card className="grid grid-cols-2 gap-1 rounded-md border p-1 sm:inline-flex">
                <Button
                  type="button"
                  onClick={() => {
                    setTab("overall");
                    setSelectedEvent(null);
                  }}
                  color="secondary"
                  className={cn("h-9 border-none", {
                    "text-primary hover:text-primary": tab === "overall",
                  })}
                  variant={tab === "overall" ? "default" : "ghost"}
                >
                  Overall
                </Button>
                <Button
                  type="button"
                  onClick={() => setTab("byEvent")}
                  color="secondary"
                  className={cn("h-9 border-none", {
                    "text-primary hover:text-primary": tab === "byEvent",
                  })}
                  variant={tab === "byEvent" ? "default" : "ghost"}
                >
                  By Event
                </Button>
              </Card>
              {tab === "byEvent" && (
                <EventSearch
                  selectedEvent={selectedEvent}
                  setSelectedEvent={setSelectedEvent}
                />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}

export default ViewContent;
