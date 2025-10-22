"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";

import CrossIcon from "@/components/icons/CrossIcon";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import SidebarMenu from "./menu";

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseSidebarDrawer = () => setIsOpen(false);
  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="group py-2 pr-2" aria-label="Mobile Menu">
        <div className="flex w-6 flex-col justify-center gap-1.5">
          <span className="group-hover:bg-accent-500 h-0.5 w-full rounded-full bg-gray-300 transition-all" />
          <span className="group-hover:bg-accent-500 h-0.5 w-1/2 rounded-full bg-gray-300 transition-all group-hover:w-full" />
          <span className="group-hover:bg-accent-500 h-0.5 w-3/4 rounded-full bg-gray-300 transition-all group-hover:w-full" />
        </div>
      </DrawerTrigger>

      <DrawerPortal>
        <DrawerContent className="h-full w-full max-w-80">
          <DrawerTitle className="hidden" />
          <DrawerDescription className="hidden" />
          <div className="flex items-center justify-between border-b border-default-100 px-4 py-3">
            <Link
              href="/en/dashboard/dashboard"
              className="flex shrink-0 items-center"
            >
              <Image
                src="/assets/main-logo.png"
                alt="logo"
                width={147}
                height={40}
                priority
              />
            </Link>

            <DrawerClose className="hover:text-accent-500 -mr-4 p-3">
              <CrossIcon className="h-6 w-6 cursor-pointer transition-colors hover:text-primary" />
            </DrawerClose>
          </div>
          <SidebarMenu
            type="mobile"
            handleCloseSidebarDrawer={handleCloseSidebarDrawer}
          />
        </DrawerContent>
        <DrawerOverlay />
      </DrawerPortal>
    </Drawer>
  );
}

export default memo(MobileMenu);
