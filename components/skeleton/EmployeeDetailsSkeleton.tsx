import React from "react";

import AreaChartSkeleton from "./area-chart-skeleton";
import CardSkeleton from "./card-skeleton";
import InputSkeleton from "./input-skeleton";

interface EmployeeDetailsSkeletonProps {
  columns?: 1 | 2;
}

function EmployeeDetailsSkeleton({
  columns = 1,
}: EmployeeDetailsSkeletonProps) {
  const Wrapper =
    columns === 2
      ? ({ children }: { children: React.ReactNode }) => (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {children}
          </div>
        )
      : ({ children }: { children: React.ReactNode }) => (
          <div className="space-y-6">{children}</div>
        );

  const block = (
    <div className="space-y-6">
      <CardSkeleton length={3} />
      <div className="space-y-6 rounded-2xl border border-default-100 p-4 md:p-6">
        <InputSkeleton length={1} />
        <CardSkeleton length={2} />
        <AreaChartSkeleton />
        <CardSkeleton length={3} />
        <AreaChartSkeleton />
      </div>
    </div>
  );

  return (
    <Wrapper>
      {columns === 2
        ? [0, 1].map((i) => <React.Fragment key={i}>{block}</React.Fragment>)
        : block}
    </Wrapper>
  );
}

export default EmployeeDetailsSkeleton;
