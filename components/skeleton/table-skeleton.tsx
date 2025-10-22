interface ITableSkeletonProps {
  length?: number;
}

function TableSkeleton({ length = 10 }: ITableSkeletonProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-default-100">
      <div className="grid grid-cols-7 gap-5 bg-default-50 p-5">
        <div className="h-2.5 w-5 animate-pulse rounded bg-default-300" />
        <div className="h-2.5 w-12 animate-pulse rounded bg-default-300" />
        <div className="h-2.5 w-12 animate-pulse rounded bg-default-300" />
        <div className="h-2.5 w-20 animate-pulse rounded bg-default-300" />
        <div className="h-2.5 w-10 animate-pulse rounded bg-default-300" />
        <div className="h-2.5 w-8 animate-pulse rounded bg-default-300" />
        <div className="h-2.5 w-8 animate-pulse rounded bg-default-300" />
      </div>
      <div>
        {Array.from({ length }).map((_, i) => (
          <div
            className="grid grid-cols-7 gap-5 border-b border-default-100 px-5 py-7 last:border-b-0"
            key={i}
          >
            <div className="h-2.5 w-5 animate-pulse rounded bg-default-300" />
            <div className="h-2.5 w-12 animate-pulse rounded bg-default-300" />
            <div className="h-2.5 w-12 animate-pulse rounded bg-default-300" />
            <div className="h-2.5 w-20 animate-pulse rounded bg-default-300" />
            <div className="h-2.5 w-10 animate-pulse rounded bg-default-300" />
            <div className="h-2.5 w-8 animate-pulse rounded bg-default-300" />
            <div className="h-2.5 w-8 animate-pulse rounded bg-default-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableSkeleton;
