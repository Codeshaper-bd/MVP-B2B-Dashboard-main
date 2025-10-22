import Image from "next/image";
import React from "react";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function TransferInfo() {
  return (
    <Card className="glass-card">
      <CardContent className="space-y-5 !p-4">
        <div className="flex items-center justify-between gap-2 text-base text-default-700">
          <span>Transfer ID</span>
          <span className="font-medium text-default-1000">#123456</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-base text-default-700">
          <span>Name</span>
          <div className="flex items-center gap-2 font-medium text-default-1000">
            <Image
              src={getImageFallback({
                src: "",
                fallbackImageSize: 100,
              })}
              alt="origin"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
            David Tandean
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 text-base text-default-700">
          <span>Role</span>
          <span className="font-medium text-default-1000">Admin</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-base text-default-700">
          <span>Origin</span>
          <span className="font-medium text-default-1000">Stock Room</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-base text-default-700">
          <span>Destination</span>
          <span className="font-medium text-default-1000">Main Bar</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-base text-default-700">
          <span>Time of Transfer</span>
          <span className="font-medium text-default-1000">
            12/02/2024 12:30PM
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 text-base text-default-700">
          <span>Status</span>
          <span className="font-medium text-default-1000">
            <Badge className="statusGreen">Complete</Badge>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
