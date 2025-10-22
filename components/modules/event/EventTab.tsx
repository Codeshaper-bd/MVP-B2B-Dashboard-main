import React, { memo } from "react";

import { cn } from "@/lib/utils";
import type {
  TOptionValue,
  TTabCardProps,
  TTabOption,
} from "@/components/tab-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type TTabItem<T extends TOptionValue = string> = {
  tabContent: React.JSX.Element;
  labelIcon?: React.JSX.Element;
} & TTabOption<T>;

export type TTabProps<T extends TOptionValue = string> = Omit<
  TTabCardProps<T>,
  "tabs"
> & {
  tabs?: TTabItem<T>[];
  renderTabContent?: (tab: TTabItem<T>) => React.ReactNode;
  extraContent?: React.ReactNode;
};

function EventTab<T extends TOptionValue = string>({
  tabs,
  setTab,
  value,
  className,
  TabListClassName,
  renderTabContent,
  extraContent,
}: TTabProps<T>) {
  const validValue = tabs
    ?.find((tab) => tab?.value?.toString?.() === value?.toString?.())
    ?.value?.toString?.();

  const handleTabChange = (val: string) => {
    const selectedTab = tabs?.find(
      (tab) => tab?.value?.toString?.() === val?.toString?.(),
    );

    if (selectedTab) {
      setTab?.(selectedTab);
    }
  };

  return (
    <Tabs
      className={cn("w-full", className)}
      value={validValue}
      onValueChange={handleTabChange}
    >
      <div className={`custom-scrollbar w-full overflow-x-auto`}>
        <TabsList
          className={cn("w-fit border border-default-100", TabListClassName)}
        >
          {tabs?.map((tab) => (
            <TabsTrigger
              key={tab?.value}
              value={tab?.value?.toString?.()}
              className="font-normal"
            >
              {tab?.label}
              {tab?.labelIcon}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {extraContent && <div>{extraContent}</div>}
      <div className="mt-8">
        {tabs?.map((tab) => (
          <TabsContent key={tab?.value} value={tab.value?.toString?.()}>
            {typeof renderTabContent === "function"
              ? renderTabContent?.(tab)
              : tab?.tabContent}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}

export default memo(EventTab) as typeof EventTab;
