import Image from "next/image";

import { getRefundStatusColor } from "@/lib/get-status-colors";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { IRefundItem } from ".";

export interface IRefundDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: IRefundItem | null;
}
function RefundDialog({ open, setOpen, data }: IRefundDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="md:max-w-[512px]">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-center">Refund Details</DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden" />
        <div className="p-6">
          <Card className="overflow-hidden rounded-md border-none">
            <CardContent className="bg-secondary p-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-4">
                  <div className="flex w-full max-w-[124px] justify-between text-xs font-medium text-default-600">
                    <span>Customer</span>
                    <span>:</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-6">
                      <AvatarImage src="/assets/avatar/avatar-1.png" alt="" />
                      <AvatarFallback>PR</AvatarFallback>
                    </Avatar>
                    <p className="text-xs font-semibold text-[#F5F5F6]">
                      John Doe
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex w-full max-w-[124px] justify-between text-xs font-medium text-default-600">
                    <span>Event</span>
                    <span>:</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image
                      src="/assets/all/event.png"
                      alt=""
                      className="h-6 w-8"
                      width={48}
                      height={48}
                    />
                    <p className="text-xs font-semibold text-[#F5F5F6]">
                      Anadem Mobile Legends
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex w-full max-w-[124px] justify-between text-xs font-medium text-default-600">
                    <span>Status</span>
                    <span>:</span>
                  </div>
                  <Badge
                    className={cn(getRefundStatusColor(data?.status || ""))}
                  >
                    {data?.status}
                  </Badge>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex w-full max-w-[124px] justify-between text-xs font-medium text-default-600">
                    <span>Tickets Tier</span>
                    <span>:</span>
                  </div>
                  <span className="text-xs text-default-700">Regular</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex w-full max-w-[124px] justify-between text-xs font-medium text-default-600">
                    <span>Ticket Quantity</span>
                    <span>:</span>
                  </div>
                  <span className="text-xs text-default-700">2</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex w-full max-w-[124px] justify-between text-xs font-medium text-default-600">
                    <span>Reason </span>
                    <span>:</span>
                  </div>
                  <span className="text-xs text-default-700">
                    Customer unable to attend due to emergency
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <DialogFooter>
            <div className="mt-8">
              {data?.status === "pending" ? (
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    fullWidth
                    color="secondary"
                    className="text-[#F97066]"
                    size="lg"
                    onClick={() => setOpen(false)}
                  >
                    Deny Refund
                  </Button>
                  <Button
                    type="button"
                    fullWidth
                    size="lg"
                    color="primary"
                    onClick={() => setOpen(false)}
                  >
                    Approve Refund
                  </Button>
                </div>
              ) : (
                <Button
                  color="secondary"
                  type="button"
                  fullWidth
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
              )}
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RefundDialog;
