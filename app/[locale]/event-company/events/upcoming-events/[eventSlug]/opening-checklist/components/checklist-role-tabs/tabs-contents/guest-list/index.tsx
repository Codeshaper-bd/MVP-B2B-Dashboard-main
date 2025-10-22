"use client";

import ChecklistPanelCard from "@/components/features/checklist/ChecklistPanelCard";

function GuestsList() {
  return (
    <div className="space-y-4">
      <ChecklistPanelCard
        title="Guest List Opening Checklist"
        status="Pending"
      />
    </div>
  );
}

export default GuestsList;
