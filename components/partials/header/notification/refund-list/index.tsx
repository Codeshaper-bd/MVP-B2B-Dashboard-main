import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import RefundDialog from "./refund-dialog";
import RefundItem from "./refund-item";

export interface IRefundItem {
  id: number;
  name: string;
  status: string;
  media: string;
}
const refundsData: IRefundItem[] = [
  {
    id: 1,
    name: "John Doe",
    status: "pending",
    media: "/assets/avatar/avatar-1.png",
  },
  {
    id: 2,
    name: "Jesse Doe",
    status: "accepted",
    media: "/assets/avatar/avatar-2.png",
  },
  {
    id: 3,
    name: "Diana Roses",
    status: "rejected",
    media: "/assets/avatar/avatar-3.png",
  },
  {
    id: 4,
    name: "Nehemiah",
    status: "pending",
    media: "/assets/avatar/avatar-4.png",
  },
  {
    id: 5,
    name: "Diana Roses",
    status: "pending",
    media: "/assets/avatar/avatar-3.png",
  },
  {
    id: 6,
    name: "Nehemiah",
    status: "pending",
    media: "/assets/avatar/avatar-4.png",
  },
  {
    id: 7,
    name: "Diana Roses",
    status: "pending",
    media: "/assets/avatar/avatar-3.png",
  },
  {
    id: 8,
    name: "Nehemiah",
    status: "pending",
    media: "/assets/avatar/avatar-4.png",
  },
  {
    id: 9,
    name: "Diana Roses",
    status: "pending",
    media: "/assets/avatar/avatar-3.png",
  },
  {
    id: 10,
    name: "Nehemiah",
    status: "pending",
    media: "/assets/avatar/avatar-4.png",
  },
];
function RefundList() {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<IRefundItem | null>(null);
  return (
    <>
      <ScrollArea className="h-[320px] lg:h-[512px]">
        {refundsData?.map((refundItem) => (
          <RefundItem
            key={refundItem.id}
            id={refundItem?.id}
            name={refundItem?.name}
            status={refundItem?.status}
            media={refundItem?.media ?? ""}
            onClick={setData}
            setOpen={setOpen}
          />
        ))}
      </ScrollArea>
      <RefundDialog open={open} setOpen={setOpen} data={data} />
    </>
  );
}

export default RefundList;
