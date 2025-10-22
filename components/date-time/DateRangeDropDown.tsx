// import dayjs from "dayjs";
// import { useCallback } from "react";
// import type { SelectRangeEventHandler } from "react-day-picker";

// import type { ISalesRevenueFilterContextProps } from "@/app/[locale]/(protected)/dashboard/sales-revenue/components/SalesRevenueFilterContext/types";
// import { useMediaQuery } from "@/hooks/use-media-query";
// import CalenderIcon from "@/components/icons/CalenderIcon";
// import { Calendar } from "@/components/ui/calendar";

// import FilterDropdown from "../app/[locale]/(protected)/dashboard/sales-revenue/components/FilterDropdown";
// import { useSalesRevenueFilterContext } from "../app/[locale]/(protected)/dashboard/sales-revenue/components/SalesRevenueFilterContext";

// type THandleSelectDate = ({
//   derived,
//   dropdowns,
//   modals,
//   values,
// }: ISalesRevenueFilterContextProps) => SelectRangeEventHandler;

// const defaultMonth = new Date(2022, 0, 20);

// function DateRangeDropDown() {
//   const filterContextValues = useSalesRevenueFilterContext();
//   const dateRange = filterContextValues?.values?.dateRange?.value;
//   const isSmallDevice = useMediaQuery("(max-width: 768px)");

//   let dateRangeContent: React.ReactNode = <div>Pick a date range</div>;

//   if (dateRange?.from || dateRange?.to) {
//     const fromDate = dateRange?.from
//       ? dayjs(dateRange.from).format("MMM DD, YYYY")
//       : "Select";
//     const toDate = dateRange?.to
//       ? dayjs(dateRange.to).format("MMM DD, YYYY")
//       : "Select";
//     dateRangeContent = (
//       <div>
//         {fromDate} - {toDate}
//       </div>
//     );
//   }

//   const handleSelectDate: THandleSelectDate = useCallback(
//     ({ values }) =>
//       (dateRange) => {
//         values?.dateRange?.set?.(dateRange);
//       },
//     [],
//   );

//   return (
//     <FilterDropdown
//       buttonContent={
//         <>
//           <CalenderIcon className="mr-2 h-[16.67px] w-[15px] text-default-700" />

//           {dateRangeContent}
//         </>
//       }
//       classNames={{
//         contentClassName: "w-auto",
//         // triggerClassName: "sm:w-[300px]",
//       }}
//       disableButtonRightIcon
//     >
//       <Calendar
//         initialFocus
//         mode="range"
//         defaultMonth={defaultMonth}
//         selected={dateRange ?? undefined}
//         onSelect={handleSelectDate(filterContextValues)}
//         numberOfMonths={isSmallDevice ? 1 : 2}
//       />
//     </FilterDropdown>
//   );
// }

// export default DateRangeDropDown;
