import React from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function Tipout() {
  return (
    <Card className="shadow-none">
      <CardTitle className="p-6">Tip Out</CardTitle>
      <Separator />
      <CardContent className="space-y-6 !p-6 text-default-700">
        <h2>Bartender</h2>
        <div className="flex justify-between">
          <span>Total Sales :</span>
          <span>$1000</span>
        </div>
        <div className="flex justify-between">
          <span>Total Tip Out (5%)</span>
          <span>$50</span>
        </div>
        <div className="space-y-2 rounded-[10px] bg-default-50 p-3 px-4">
          <div className="flex justify-between">
            <span> - Manager on Duty (2%) :</span>
            <span>$20</span>
          </div>
          <div className="flex justify-between">
            <span> - Bar Back (2%) :</span>
            <span>$20</span>
          </div>
          <div className="flex justify-between">
            <span> - Security (1%) :</span>
            <span>$10</span>
          </div>
        </div>

        <Separator />

        <h2>Bottle Girls</h2>
        <div className="flex justify-between">
          <span>Total Sales :</span>
          <span>$2000</span>
        </div>
        <div className="flex justify-between">
          <span>Total Tip Out (6%)</span>
          <span>$120</span>
        </div>
        <div className="space-y-2 rounded-[10px] bg-default-50 p-3 px-4">
          <div className="flex justify-between">
            <span> - Manager on Duty (2%) :</span>
            <span>$40</span>
          </div>
          <div className="flex justify-between">
            <span> - Bar Back (2%) :</span>
            <span>$40</span>
          </div>
          <div className="flex justify-between">
            <span> - Security (1%) :</span>
            <span>$20</span>
          </div>
          <div className="flex justify-between">
            <span> - VIP Host (1%) :</span>
            <span>$20</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Tipout;
