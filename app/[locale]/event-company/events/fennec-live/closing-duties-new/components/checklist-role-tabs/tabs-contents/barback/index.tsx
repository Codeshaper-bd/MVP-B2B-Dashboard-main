"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { getRefundStatusColor } from "@/lib/get-status-colors";
import ChecklistEmployeeCard from "@/components/features/checklist/ChecklistEmployeeCard";
import { ChecklistItemCard } from "@/components/features/checklist/checklistItemCard";
import ChecklistPanelCard from "@/components/features/checklist/ChecklistPanelCard";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import PackageIcon from "@/components/icons/PackageIcon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

function Barback() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    return params.toString() ? `?${params.toString()}` : "";
  }, [searchParams]);
  const newPath = `${pathname}/detail-checklist${search}`;
  const employeeData = [
    {
      name: "Nanda",
      status: "Checked In",
      media: [{ url: "/images/avatar/avatar-1.png" }],
    },
    {
      name: "Emily",
      status: "Checked In",
      media: [{ url: "/images/avatar/avatar-2.png" }],
    },
    {
      name: "Kamisato",
      status: "Not Checked In",
      media: [{ url: "/images/avatar/avatar-3.png" }],
    },
    {
      name: "Brandon  Mattew",
      status: "Checked In",
      media: [{ url: "" }],
    },
    {
      name: "Jesse",
      status: "Not Checked In",
      media: [{ url: "/images/avatar/avatar-7.png" }],
    },
    {
      name: "Amel ",
      bar: "Main Bar",
      status: "Checked In",
      media: [{ url: "/images/avatar/avatar-4.png" }],
    },
  ];
  return (
    <div className="space-y-4">
      <ChecklistPanelCard title="Barback Opening Checklist" status="Pending" />
      <Card>
        <CardTitle className="p-5 text-sm font-medium">Employee (6)</CardTitle>
        <CardContent className="grid grid-cols-1 gap-4 !px-5 md:grid-cols-2 lg:grid-cols-3">
          {employeeData.map((employee, idx) => (
            <ChecklistEmployeeCard key={idx} {...employee} />
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardTitle className="p-5">Default Checklist</CardTitle>
        <CardContent>
          <ChecklistItemCard
            stepNumber={1}
            title="Inventory Tracking"
            description="Count and record all unopened bottles and canned goods, and measure the weight of all opened alcohol bottles and beverages in each bar."
            status="Pending"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {["Main Bar", "Upper Bar", "lower Bar"].map((bar, idx) => (
                <Link key={bar} href={newPath}>
                  <Card className="flex items-center justify-between gap-3 bg-default-100 p-3">
                    <Image
                      width={32}
                      height={24}
                      src={"/assets/all/mainbar.png"}
                      alt="bar image"
                    />
                    <p className="flex-1">{bar}</p>
                    <Badge className={getRefundStatusColor("Approved")}>
                      Approved
                    </Badge>
                    <span className="h-full w-1 border-r-[2px] bg-default-100"></span>
                    <span className="flex size-4 items-center justify-center rounded-[5px] bg-default-600 text-default">
                      <ChevronLeftIcon className="size-3" />
                    </span>
                  </Card>
                </Link>
              ))}
              <Card className="flex items-center justify-between gap-3 bg-default-100 p-3">
                <PackageIcon className="size-6 text-primary" />
                <p className="flex-1">Stock Room</p>
                <Badge className={getRefundStatusColor("Approved")}>
                  Approved
                </Badge>
                <span className="h-full w-1 border-r-[2px] bg-default-100"></span>
                <span className="flex size-4 items-center justify-center rounded-[5px] bg-default-600 text-default">
                  <ChevronLeftIcon className="size-3" />
                </span>
              </Card>
            </div>
          </ChecklistItemCard>
        </CardContent>
      </Card>
      <Card>
        <CardTitle className="p-5">Custom Checklist</CardTitle>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}

export default Barback;
