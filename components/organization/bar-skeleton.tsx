function BarSkeleton() {
  return (
    <div className="md:border-gray-0 relative grid w-full grid-cols-12 items-center gap-8 rounded-2xl border border-default-100 bg-default-100 p-3">
      <div className="col-span-3 h-full min-h-[184px] w-full animate-pulse rounded-lg bg-default-300" />
      <div className="col-span-9">
        <div className="mb-7 h-5 w-56 animate-pulse rounded bg-default-300" />
        <div className="mb-4 flex w-80 justify-between gap-2.5">
          <div className="h-3 w-32 animate-pulse rounded bg-default-300" />
          <div className="h-3 w-12 animate-pulse rounded bg-default-300" />
        </div>
        <div className="mb-4 flex w-80 justify-between gap-2.5">
          <div className="h-3 w-28 animate-pulse rounded bg-default-300" />
          <div className="h-3 w-12 animate-pulse rounded bg-default-300" />
        </div>
        <div className="flex w-80 justify-between gap-2.5">
          <div className="h-3 w-32 animate-pulse rounded bg-default-300" />
          <div className="h-3 w-24 animate-pulse rounded bg-default-300" />
        </div>
      </div>
    </div>
  );
}

export default BarSkeleton;
