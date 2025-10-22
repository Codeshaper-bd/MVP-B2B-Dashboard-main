export const data = [
  {
    id: crypto.randomUUID(),
    category: "LIQUOR",
    orders: "32",
    percentage: "36.2%",
    grossSales: "$5,440.00",
    netSales: "$5,200.00",
    avgOrderPercentage: "28.0%",
  },
  {
    id: crypto.randomUUID(),
    category: "LIQUOR",
    orders: "32",
    percentage: "36.2%",
    grossSales: "$5,440.00",
    netSales: "$5,200.00",
    avgOrderPercentage: "28.0%",
  },
  {
    id: crypto.randomUUID(),
    category: "LIQUOR",
    orders: "32",
    percentage: "36.2%",
    grossSales: "$5,440.00",
    netSales: "$5,200.00",
    avgOrderPercentage: "28.0%",
  },
  {
    id: crypto.randomUUID(),
    category: "Total",
    orders: "890",
    percentage: "100%",
    grossSales: "$11,970.00",
    netSales: "$11,550.00",
    avgOrderPercentage: "61.9%",
  },
];
export type TDataProps = (typeof data)[0];
