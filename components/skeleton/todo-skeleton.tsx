function TodoSkeleton() {
  return (
    <div className="md:border-gray-0 relative flex w-full gap-2.5">
      <div className="h-4 w-4 shrink-0 animate-pulse rounded-full bg-default-300" />
      <div className="mt-0.5 grow">
        <div className="mb-2.5 h-3 w-44 animate-pulse rounded bg-default-300" />
        <div className="h-1.5 w-72 animate-pulse rounded bg-default-300" />
        <div className="mt-4 flex justify-between gap-2">
          <div className="flex gap-2.5">
            <div className="h-4 w-16 animate-pulse rounded-full bg-default-300" />
            <div className="h-4 w-14 animate-pulse rounded-full bg-default-300" />
            <div className="h-4 w-14 animate-pulse rounded-full bg-default-300" />
          </div>
          <div className="mt-0.5 h-3 w-20 animate-pulse rounded bg-default-300" />
        </div>
      </div>
    </div>
  );
}

export default TodoSkeleton;
