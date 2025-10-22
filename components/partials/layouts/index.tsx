"use client";

import { memo } from "react";

import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";
import ChatAi from "@/components/chat-ai";
import SiteHeader from "@/components/partials/layouts/header";
import LayoutSidebar from "@/components/partials/layouts/sidebar";

import UserPresence from "./user-presence";

function SiteLayout({ children }: { children: React.ReactNode }) {
  const [config] = useConfig();

  return (
    <div className="flex min-h-svh w-full flex-col bg-default">
      <UserPresence />
      <div className="hidden xl:block">
        <LayoutSidebar />
      </div>

      <div className="block xl:hidden">
        <SiteHeader />
      </div>

      <ChatAi />
      <main
        className={cn(
          "!mb-14 flex-1 px-4 pb-10 md:mb-0 md:px-8 xl:ms-[280px]",
          {
            "xl:ms-[100px]": config.collapsed,
          },
        )}
      >
        {children}
      </main>
    </div>
  );
}

export default memo(SiteLayout);
