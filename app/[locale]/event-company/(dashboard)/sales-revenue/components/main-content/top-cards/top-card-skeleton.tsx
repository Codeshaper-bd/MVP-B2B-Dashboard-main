import RevenueCardSkeleton from "@/components/skeleton/revenue-card-skeleton";

function TopCardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <RevenueCardSkeleton />
      <RevenueCardSkeleton />
    </div>
  );
}

export default TopCardSkeleton;
