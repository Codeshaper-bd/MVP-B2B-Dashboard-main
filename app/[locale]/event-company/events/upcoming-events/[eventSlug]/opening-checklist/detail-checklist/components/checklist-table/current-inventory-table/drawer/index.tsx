"use client";

import { useState } from "react";

import CrossIcon from "@/components/icons/CrossIcon";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

import RecountDrawerContent from "./drawer-content";

function RecountDrawer({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = (data) => {
    toast({
      title: "Successfully End Previous Tier",
      description: "Congratulations! You have successfully Ended Tier.",
    });
    setOpen(false);
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="group py-2 pr-2" aria-label="">
        <Button
          color="secondary"
          className="border-primary text-primary hover:text-primary"
        >
          Recount
        </Button>
      </DrawerTrigger>

      <DrawerPortal>
        <DrawerContent className="bottom-0 left-auto right-0 h-full w-full max-w-[520px] rounded-t-none">
          <div className="flex items-center justify-between gap-4 border-b border-default-100 px-6 py-4">
            <h3 className="text-xl font-semibold text-default-1000">Product</h3>
            <DrawerTrigger className="group" aria-label="">
              <Button
                size="icon"
                className="size-11 rounded-full"
                color="secondary"
              >
                <CrossIcon className="size-5" />
              </Button>
            </DrawerTrigger>
          </div>
          <ScrollArea className="h-screen">
            <RecountDrawerContent />
          </ScrollArea>
          <div className="border-t-[2px] border-default-100 px-6 pb-8 pt-6">
            <Button className="h-11" fullWidth color="primary">
              Recount
            </Button>
          </div>
        </DrawerContent>
        <DrawerOverlay />
      </DrawerPortal>
    </Drawer>
  );
}

export default RecountDrawer;
