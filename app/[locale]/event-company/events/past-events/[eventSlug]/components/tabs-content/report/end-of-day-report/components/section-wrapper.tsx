import React from "react";

interface SectionWrapperProps {
  title: string;
  children?: React.ReactNode;
}

function SectionWrapper({ title, children }: SectionWrapperProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-default-900">{title}</h3>
      {children}
    </div>
  );
}

export default SectionWrapper;
