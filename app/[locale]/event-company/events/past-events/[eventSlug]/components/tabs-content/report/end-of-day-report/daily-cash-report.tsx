import SalesChart from "./charts/sales-chart";
import CreditCardInfoTable from "./components/credit-card-info-table";
import SectionWrapper from "./components/section-wrapper";
import OverageShortageTable from "./overage-shortage-table";
import SalesReportTable from "./sales-report-table";

function DailyCashReport() {
  const creditCardInfoRows = [
    { category: "Total Sales", amount: "$8,412.75" },
    { category: "Less Atm", amount: "$54.75" },
    { category: "Less Visa", amount: "$2154.75" },
    { category: "Less Mastercard", amount: "$1894.2" },
    { category: "Less App $", amount: "$312.50" },
    { category: "Less Gift Certificate", amount: "$450.00" },
    { category: "Less Debit", amount: "$1,077.65" },
    { category: "Credit Card Total", amount: "$2484.20" },
  ];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <div className="my-auto h-[1px] w-full bg-default-200" />
        <h2 className="text-nowrap text-xl font-semibold text-default-900">
          DAILY CASH REPORT
        </h2>
        <div className="my-auto h-[1px] w-full bg-default-200" />
      </div>
      <SectionWrapper title="Sales">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
          <SalesReportTable />
          <div>
            <SalesChart />
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper title="OVERAGE/SHORTAGE">
        <OverageShortageTable />
      </SectionWrapper>

      <SectionWrapper title="INTERAC / CREDIT CARDS (By Station)">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <CreditCardInfoTable
            url="/images/all-img/product1.png"
            title="Main Bar - INTERAC / CREDIT CARDS"
            rows={creditCardInfoRows}
            creditCardTotal="$7231.01"
            cashOnHandTotal="$1,181.74"
          />
          <CreditCardInfoTable
            url="/images/all-img/product1.png"
            title="Upper Bar - INTERAC / CREDIT CARDS"
            rows={creditCardInfoRows}
            creditCardTotal="$7231.01"
            cashOnHandTotal="$1,181.74"
          />
          <CreditCardInfoTable
            url="/images/all-img/product1.png"
            title="Lower Bar - INTERAC / CREDIT CARDS"
            rows={creditCardInfoRows}
            creditCardTotal="$7231.01"
            cashOnHandTotal="$1,181.74"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <CreditCardInfoTable
            title="Bottle Girl 1  - INTERAC / CREDIT CARDS"
            rows={creditCardInfoRows}
            creditCardTotal="$7231.01"
            cashOnHandTotal="$1,181.74"
          />
          <CreditCardInfoTable
            title="Bottle Girl 1  - INTERAC / CREDIT CARDS"
            rows={creditCardInfoRows}
            creditCardTotal="$7231.01"
            cashOnHandTotal="$1,181.74"
          />
        </div>
      </SectionWrapper>
    </div>
  );
}

export default DailyCashReport;
