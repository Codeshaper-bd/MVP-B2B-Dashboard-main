import { type CellContext } from "@tanstack/react-table";

import type { TInventoryTransferHistoryData } from "@/store/api/transfer-history/inventory-transfer.types";
import { ArrowLeftIcon as ArrowLeftIcon } from "@/components/icons";
import { CrossIcon as CrossIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerPortal,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

import TransferDetails from "../TransferDetails";
function HistoryAction({
  row: { original },
}: CellContext<TInventoryTransferHistoryData, unknown>) {
  const id = original?.id;
  return (
    <div>
      <Drawer direction="right">
        <DrawerTrigger className="group py-2 pr-2">
          <Button
            variant="ghost"
            color="secondary"
            className="text-primary hover:text-primary"
          >
            <ArrowLeftIcon className="size-5 rotate-180" />
          </Button>
        </DrawerTrigger>

        <DrawerPortal>
          <DrawerContent className="bottom-0 left-auto right-0 h-full w-full max-w-[520px] rounded-t-none border-l bg-[#161B26]/40 shadow-[inset_0_2px_4px_0_#FFFFFF66,inset_0_-2px_4px_0_#00000033] backdrop-blur-[8px] [border-image:linear-gradient(to_bottom,#FFFFFF1A,#FFFFFF14,#FFFFFF0D)_1]">
            <div className="flex items-center justify-between gap-4 border-b-[2px] border-default-200 px-6 py-4">
              <h3 className="text-xl font-semibold text-default-1000">
                Transfer Details {id}
              </h3>
              <DrawerTrigger className="group">
                <Button
                  size="icon"
                  className="size-11 rounded-full border-none !bg-[#3337415C]"
                  color="secondary"
                >
                  <CrossIcon className="size-5" />
                </Button>
              </DrawerTrigger>
            </div>
            <ScrollArea className="h-screen">
              <TransferDetails />
            </ScrollArea>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  );
}

export default HistoryAction;
