"use client";

// import MobileMenu from "@/components/partials/layouts/sidebar/mobile-menu";
import dynamic from "next/dynamic";
import { memo, Suspense } from "react";

import BooleanContext from "@/contexts/BooleanContext";
import Logo from "@/components/logo";

import Messages from "../../header/messages";
import Notifications from "../../header/notification";
const MobileMenu = dynamic(
  () => import("@/components/partials/layouts/sidebar/mobile-menu"),
);

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      <div className="relative flex flex-none items-center justify-between bg-header px-4 py-3 shadow-base backdrop-blur-lg md:px-6">
        <Suspense>
          <MobileMenu />
        </Suspense>

        <Logo className="p-0" />
        <div className="nav-tools flex shrink-0 items-center gap-3">
          <Messages />

          <BooleanContext>
            <Notifications />
          </BooleanContext>
        </div>
      </div>
    </header>
  );
}

export default memo(SiteHeader);
