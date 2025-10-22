import Image from "next/image";

import CalendarIcon from "@/components/icons/CalendarIcon";
import DownloadIcon from "@/components/icons/DownloadIcon";
import { Button } from "@/components/ui/button";

import type { DetailsCardProps } from "./data";

function HistoryCard({
  title,
  date,
  time,
  image,
  downloadFileLink,
}: DetailsCardProps) {
  return (
    <div className="flex flex-1 flex-col gap-8 px-6 py-5 sm:flex-row sm:items-center">
      <div className="h-[152px] w-[257px]">
        <Image
          src={image}
          alt={title}
          width={257}
          height={152}
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-default-900">{title}</h3>
          <div className="text-md flex items-center gap-2 text-default-600">
            <CalendarIcon className="size-5" />
            <span>{date}</span> <span>{time}</span>
          </div>
        </div>
        <div>
          <Button size="md" color="secondary" asChild>
            <a href={downloadFileLink} download={"event.csv"} target="_blank">
              <DownloadIcon className="me-1 size-4" />
              <span> Download Post Event Inventory Summary</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;
