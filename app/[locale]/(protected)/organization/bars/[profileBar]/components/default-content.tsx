import BarHeader from "./bar-header";
// import InventoryTable from "./inventory-table";
import RevenueGraph from "./revenue-graph";
import StockInventoryTable from "./stock-inventory-table";
import { useGetProfileBarSlug } from "../hooks/useGetProfileBarSlug";

function DefaultContent() {
  const { barSlug, isValidSlug } = useGetProfileBarSlug();
  return (
    <div className="space-y-6">
      <BarHeader barSlug={barSlug} isValidSlug={isValidSlug} />
      <RevenueGraph barSlug={barSlug} isValidSlug={isValidSlug} />
      <StockInventoryTable barSlug={barSlug} />
    </div>
  );
}

export default DefaultContent;
