import { memo } from "react";

import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export type TOptionValue = string | number;
export type TTabOption<T extends TOptionValue = string> = {
  label: string | number;
  value: T;
};

export type TTabCardProps<T extends TOptionValue = string> = {
  tabs?: TTabOption<T>[];
  value?: T | null | undefined;
  setTab?: (tab: TTabOption<T>) => void;
  className?: string;
  TabListClassName?: string;
  triggerClassName?: string;
};

function TabCard<T extends TOptionValue = string>({
  tabs,
  value,
  setTab,
  className,
  triggerClassName,
}: TTabCardProps<T>) {
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
      className={cn("w-fit", className)}
      value={validValue}
      onValueChange={handleTabChange}
    >
      <TabsList className="w-full border border-default-100">
        {tabs?.map((tab) => (
          <TabsTrigger
            key={tab?.value}
            value={tab?.value?.toString?.()}
            className={triggerClassName}
          >
            {tab?.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default memo(TabCard) as typeof TabCard;
