"use client";
import { useState } from "react";

import ChecklistBarCategorySelect from "@/components/features/checklist/ChecklistBarCategorySelect";
import { ChecklistItemCard } from "@/components/features/checklist/checklistItemCard";
import ChecklistPanelCard from "@/components/features/checklist/ChecklistPanelCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import AdminChecklistTable from "./admin-checklist-table";

function Admin() {
  const [categoryState, setCategoryState] = useState<string | null>("mainbar");
  return (
    <div className="space-y-4">
      <ChecklistPanelCard title="Admin Opening Checklist" status="Pending" />
      <Card>
        <CardTitle className="p-5">Checklist</CardTitle>
        <CardContent>
          <ChecklistItemCard
            stepNumber={1}
            title="Enter Opening Float"
            description="Ensure all denominations are counted and logged correctly. Total should match the expected opening float"
            status="Pending"
          >
            <div className="flex justify-between gap-5">
              <ChecklistBarCategorySelect
                value={categoryState}
                onChange={setCategoryState}
              />
              <Button
                className="bg-default-100 hover:bg-primary hover:text-default"
                variant="ghost"
              >
                Save
              </Button>
            </div>
            <AdminChecklistTable />
          </ChecklistItemCard>
        </CardContent>
      </Card>
    </div>
  );
}

export default Admin;
