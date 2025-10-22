import React from "react";

interface TaskDescriptionProps {
  title: string;
  subtitle?: string;
  description?: string;
}

function ChecklistDetailsHeader({
  title,
  subtitle,
  description,
}: TaskDescriptionProps) {
  return (
    <div>
      <h5 className="text-sx font-semibold text-default-600">{title}</h5>
      <h4 className="font-medium">{subtitle}</h4>
      <div className="mt-4 space-y-1 font-medium">
        <h5 className="text-xs text-default-600">Description</h5>
        <p className="min-h-[72px] rounded-lg bg-default-50 px-4 py-3 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ChecklistDetailsHeader;
