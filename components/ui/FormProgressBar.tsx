"use client";

import ProgressBar from "@/components/ui/ProgressBar";

interface FormProgressBarProps {
  progress: number;
  title?: string;
  showPercentage?: boolean;
  className?: string;
}

function FormProgressBar({
  progress,
  title = "Complete Your Profile",
  showPercentage = true,
  className = "",
}: FormProgressBarProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-default-1000">{title}</h4>
        {showPercentage && (
          <span
            className={`text-sm ${
              progress === 100 ? "text-success" : "text-default-600"
            }`}
          >
            {progress}%
          </span>
        )}
      </div>
      <ProgressBar value={progress}>
        <ProgressBar.ProgressArea className="h-2">
          <ProgressBar.ProgressArea.Progress
            className={progress === 100 ? "bg-success" : "bg-primary"}
          />
        </ProgressBar.ProgressArea>
      </ProgressBar>
    </div>
  );
}

export default FormProgressBar;
