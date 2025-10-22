function BarInventorySkeleton() {
  return (
    <div className="relative w-full rounded-2xl border border-default-100 bg-default-50">
      <div className="col-span-3 h-[189px] w-full animate-pulse rounded-tl-lg rounded-tr-lg bg-default-300" />
      <div className="px-4 py-5">
        <div className="mb-5 h-4 w-56 animate-pulse rounded bg-default-300" />
        <div className="h-2 w-40 animate-pulse rounded bg-default-300" />
      </div>
    </div>
  );
}

export default BarInventorySkeleton;
