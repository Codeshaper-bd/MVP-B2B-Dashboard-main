import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function FennecLiveInfo() {
  return (
    <div className="space-y-4">
      <h3>Fennec Live Information</h3>
      <Card className="glass-card border-[0.6px]">
        <CardContent className="space-y-5 !p-4">
          <div className="flex items-center justify-between gap-2 text-base text-default-700">
            <span>Fennec Live</span>
            <span className="font-medium text-default-1000">
              <Badge className="statusError">Not Active</Badge>
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 text-base text-default-700">
            <span>Event Name</span>
            <span className="font-medium text-default-1000">N/A</span>
          </div>
          <div className="flex items-center justify-between gap-2 text-base text-default-700">
            <span>Event Time</span>
            <span className="font-medium text-default-1000">N/A</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
