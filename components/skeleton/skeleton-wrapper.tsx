import React from "react";

function SkeletonWrapper({
  size = 1,
  children,
  className,
}: {
  size?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      {Array.from({ length: size }).map((_, i) => (
        <React.Fragment key={i}>{children}</React.Fragment>
      ))}
    </div>
  );
}

export default SkeletonWrapper;
