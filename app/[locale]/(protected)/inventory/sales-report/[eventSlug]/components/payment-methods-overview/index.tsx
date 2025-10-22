import PaymentMethodSalesTable from "./payment-method-sales-table";
import TransactionRateTable from "./transaction-rate-table";

function PaymentMethodsOverview() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-7">
        <PaymentMethodSalesTable />
      </div>
      <div className="col-span-12 lg:col-span-5">
        <TransactionRateTable />
      </div>
    </div>
  );
}

export default PaymentMethodsOverview;
