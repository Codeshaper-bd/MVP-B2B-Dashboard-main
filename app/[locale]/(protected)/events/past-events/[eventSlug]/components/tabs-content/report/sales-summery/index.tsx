import OrderHistory from "./order-history";
import TopCards from "./top-cards";

function SalesSummeryContent() {
  return (
    <div className="space-y-6">
      <TopCards />
      <OrderHistory />
    </div>
  );
}

export default SalesSummeryContent;
