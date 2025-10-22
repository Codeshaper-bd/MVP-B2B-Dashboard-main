"use client";

import ChecklistEmployeeCard from "@/components/features/checklist/ChecklistEmployeeCard";
import { ChecklistItemCard } from "@/components/features/checklist/checklistItemCard";
import ChecklistPanelCard from "@/components/features/checklist/ChecklistPanelCard";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function Bartender() {
  const employeeData = [
    {
      name: "Olivia Rhye",
      bar: "Main Bar",
      status: "Checked In",
      media: [{ url: "/images/avatar/avatar-1.png" }],
    },
    {
      name: "Robert Opp",
      bar: "Upper Bar",
      status: "Checked In",
      media: [{ url: "/images/avatar/avatar-2.png" }],
    },
    {
      name: "Albert Neilsen",
      bar: "",
      status: "Not Checked In",
      media: [{ url: "/images/avatar/avatar-3.png" }],
    },
    {
      name: "Candice Wu",
      bar: "Main Bar",
      status: "Checked In",
      media: [{ url: "/images/avatar/avatar-4.png" }],
    },
    {
      name: "Demi Wilkinson",
      bar: "",
      status: "Not Checked In",
      media: [{ url: "/images/avatar/avatar-7.png" }],
    },
    {
      name: "Nahida ",
      bar: "Main Bar",
      status: "Checked In",
      media: [{ url: "" }],
    },
  ];
  const barData = [
    {
      title: "Is the bar area clean and ready?",
      description:
        "Ensure the entire bar area (counter, bottle shelves, floor) is clean and organized before service starts.",
      status: "Pending",
      stepNumber: "1",
    },
    {
      stepNumber: "2",
      title: "Is all glassware restocked?",
      description:
        "Check if all types of glasses are available and ready: wine glasses, highballs, rocks, and shot glasses.",
      status: "Pending",
    },
    {
      stepNumber: "3",
      title: "Is the garnish station set up?",
      description:
        "Make sure garnishes like lemon, lime, mint, and other fruits are prepped and placed properly.",
      status: "Pending",
    },
    {
      stepNumber: "4",
      title: "Is the POS system active and tested?",
      description:
        "Confirm the POS system is powered on, logged in, and functioning without errors.",
      status: "Pending",
    },
  ];
  return (
    <div className="space-y-4">
      <ChecklistPanelCard
        title="Bartender Opening Checklist"
        status="Pending"
      />
      <Card>
        <CardTitle className="p-5 text-sm font-medium">Employee (6)</CardTitle>
        <CardContent className="grid grid-cols-1 gap-4 !px-5 md:grid-cols-2 lg:grid-cols-3">
          {employeeData.map((employee, idx) => (
            <ChecklistEmployeeCard key={idx} {...employee} />
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardTitle className="p-5 text-[16px] font-semibold">
          Checklist
        </CardTitle>
        <CardContent className="space-y-4">
          {barData.map((barInfo, idx) => (
            <ChecklistItemCard key={idx} {...barInfo} />
          ))}
          <ChecklistItemCard
            stepNumber={5}
            title="Are all bar tools sanitized?"
            description="Ensure all bartending tools like shakers, jiggers, strainers, and muddlers are cleaned and ready to use."
            status="Completed"
          >
            <div className="ms-12 space-y-4">
              <Separator className="h-0.5" />

              <div className="flex gap-2">
                <Label
                  htmlFor="yes"
                  className="flex cursor-pointer flex-row items-center gap-2 text-base font-normal text-default-700"
                >
                  <Checkbox className="rounded-full" id="yes" checked={false} />
                  <span className="min-w-[56px] text-sm font-medium">Yes</span>
                </Label>
                <Label
                  htmlFor="no"
                  className="flex cursor-pointer flex-row items-center gap-2 text-base font-normal text-default-700"
                >
                  <Checkbox className="rounded-full" id="yes" checked={true} />
                  <span className="min-w-[56px] text-sm font-medium">No</span>
                </Label>
              </div>
              <div className="space-y-2">
                <h5 className="text-xs font-medium text-default-700">NOTES</h5>
                <div className="rounded-xl bg-default-100 p-4 text-sm font-normal text-default-900">
                  Tested and working fine, printer and scanner OK.
                </div>
              </div>
            </div>
          </ChecklistItemCard>
        </CardContent>
      </Card>
    </div>
  );
}

export default Bartender;
