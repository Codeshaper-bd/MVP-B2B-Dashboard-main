"use client";
import Image from "next/image";
import { useParams } from "next/navigation";

import BackButton from "@/components/Buttons/back-button";
import RefreshIcon from "@/components/icons/RefreshIcon";
import { Button } from "@/components/ui/button";

function CampaignTopBar() {
  const { campaignId } = useParams();
  return (
    <div className="mb-6 flex flex-wrap justify-between gap-2">
      <BackButton />
      <div className="flex flex-none items-center gap-2 rounded-lg border-2 border-border bg-default-50 p-1">
        <div className="flex items-center gap-2 px-3">
          <Image
            src="/assets/all/instagram.png"
            alt="image"
            height={24}
            width={24}
            className="size-6"
          />
          <span className="text-sm font-semibold capitalize text-default-1000">
            {campaignId}
          </span>
        </div>
        <Button
          type="button"
          color="secondary"
          className="size-9 flex-none rounded-full bg-default-100 p-0 text-default-600 md:p-0"
        >
          <RefreshIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
}

export default CampaignTopBar;
