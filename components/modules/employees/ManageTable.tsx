"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import DemoCard from "./DemoCard";

function ManageTable() {
  const [active, setActive] = useState(false);

  return (
    <Card className="mt-6">
      <CardHeader className="mb-0">
        <div className="flex items-center gap-4">
          <Switch
            color="success"
            id="switch"
            checked={active}
            onCheckedChange={setActive}
          />
          <Label htmlFor="switch" className="mb-0 text-lg">
            Table Management System (coming soon)
          </Label>
        </div>
      </CardHeader>
      {active && (
        <CardContent>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            <DemoCard name="Bottle Girls" userCount={"N/A"} />
            <DemoCard name="VIP Hosts" userCount={"N/A"} />
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default ManageTable;
