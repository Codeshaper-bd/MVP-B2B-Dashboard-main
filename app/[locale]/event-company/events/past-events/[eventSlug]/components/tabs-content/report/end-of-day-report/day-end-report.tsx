import AdjustmentListTable from "./adjustment-list-table";
import CategorySummaryTable from "./category-summary-table";
import CategorySummaryChart from "./charts/category-summary-chart";
import HourlyRevenueChart from "./charts/hourly-revenue-chart";
import CreditCardInfoTable from "./components/credit-card-info-table";
import PerformanceSummaryCard from "./components/performance-summary-card";
import SectionWrapper from "./components/section-wrapper";
import SummaryCard from "./components/Summary-card";
import SalesTicketSummary from "./sales-ticket-summary-table";
import TimeActivitySummaryTable from "./time-activity-summary-table";

function DayEndReport() {
  const summaryCardRows = [
    { label: "Net Sales", value: "$6,397.50" },
    { label: "Sales + GC + PPT", value: "$6,747.50" },
    { label: "Gress Sales", value: "$7,025.00" },
    { label: "Less Product Discounts", value: "$627.50" },
    { label: "Sales GC+PPT(Net)", value: "$6,747.50" },
  ];
  const storeSalesCardRows = [
    {
      label:
        "NET SALES + TAXES + GIFT CERT + PREPAID TOP-UP + INTER-STORE SALES",
      value: "$6,397.50",
    },
    { label: "Non Sales", value: "$175.50" },
    { label: "Gress Sales", value: "$7,025.00" },
    { label: "TOTAL COLLECTABLE", value: "$7,534.78" },
  ];
  const collectableCardRows = [
    { label: "Net Sales", value: "$6,397.50" },
    { label: "Less Non-Product Discount", value: "$150.00" },
    { label: "Net Sales Before Taxes", value: "$6,247.50" },
    { label: "Gift Certificate", value: "$200.00" },
    { label: "Taxes", value: "$562.28" },
    { label: "NET SALES + TAXES", value: "$6,959.78 " },
  ];

  const creditCardInfoRows = [
    { category: "Cost of Products Sold", value: "$8,412.75" },
    { category: "Profit Margin", value: "66.5%" },
    { category: "Checks No. (Guests No.)", value: "140 (305)" },
    { category: "Checks Avg (Guests Avg.)", value: "2.18" },
  ];
  const tipOutInfoRows = [
    { description: "Total Sales", amount: "-" },
    { description: "Total Tip Out (5%)", amount: "-" },
    { description: "- Manager on Duty (2%)", amount: "-" },
    { description: "- Bar Back (2%)", amount: "-" },
    { description: "- Security (1%)", amount: "-" },
  ];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <div className="my-auto h-[1px] w-full bg-default-200" />
        <h2 className="text-nowrap text-xl font-semibold text-default-900">
          END OF DAY REPORT
        </h2>
        <div className="my-auto h-[1px] w-full bg-default-200" />
      </div>
      <div className="space-y-12">
        <SectionWrapper title="SALES TICKET SUMMARY">
          <SalesTicketSummary />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <SummaryCard title="SUMMARY" rows={summaryCardRows} />
            <SummaryCard title="COLLECTABLE" rows={collectableCardRows} />
            <SummaryCard
              title="INTER-STORE SALES TOTAL"
              rows={storeSalesCardRows}
            />
          </div>
        </SectionWrapper>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SectionWrapper title="AVERAGE TICKET & GUEST SUMMARY">
            <PerformanceSummaryCard
              totalRevenueLoss="$290.50"
              rows={creditCardInfoRows}
            />
          </SectionWrapper>
          <SectionWrapper title="LOST REVENUE">
            <PerformanceSummaryCard
              totalRevenueLoss="$290.50"
              rows={creditCardInfoRows}
            />
          </SectionWrapper>
        </div>
        <SectionWrapper title="CATEGORY SUMMARY">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 xl:col-span-8">
              <CategorySummaryTable />
            </div>

            <div className="col-span-12 xl:col-span-4">
              <CategorySummaryChart />
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper title="TIME ACTIVITY SUMMARY">
          <TimeActivitySummaryTable />
        </SectionWrapper>
        <div>
          <HourlyRevenueChart />
        </div>
        <SectionWrapper title="ADJUSTMENT LIST">
          <AdjustmentListTable />
        </SectionWrapper>
        <SectionWrapper title="TIP OUT">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <CreditCardInfoTable
              url="/images/all-img/product1.png"
              title="Main Bar"
              rows={tipOutInfoRows}
            />
            <CreditCardInfoTable
              url="/images/all-img/product1.png"
              title="Upper Bar"
              rows={tipOutInfoRows}
            />
            <CreditCardInfoTable
              url="/images/all-img/product1.png"
              title="Lower Bar"
              rows={tipOutInfoRows}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CreditCardInfoTable title="Bottle Girl 1" rows={tipOutInfoRows} />
            <CreditCardInfoTable title="Bottle Girl 1" rows={tipOutInfoRows} />
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}

export default DayEndReport;
