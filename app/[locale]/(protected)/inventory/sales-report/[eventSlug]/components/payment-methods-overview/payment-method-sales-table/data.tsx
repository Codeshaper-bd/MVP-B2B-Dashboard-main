import type { TDataProps } from "./columns";

export const data: TDataProps[] = [
  {
    id: crypto.randomUUID(),
    rank: 1,
    paymentMethod: "Credit Card",
    totalTransactions: 150,
    totalRevenue: "7,500",
    totalPercentage: "50%",
    logo: "/images/all-img/visa-card.png",
  },
  {
    id: crypto.randomUUID(),
    rank: 2,
    paymentMethod: "Cash",
    totalTransactions: 80,
    totalRevenue: "3,200",
    totalPercentage: "21%",
    logo: "/images/all-img/cash.png",
  },
  {
    id: crypto.randomUUID(),
    rank: 3,
    paymentMethod: "PayPal",
    totalTransactions: 60,
    totalRevenue: "2,400",
    totalPercentage: "16%",
    logo: "/images/all-img/paypal.png",
  },
  {
    id: crypto.randomUUID(),
    rank: 4,
    paymentMethod: "Affirm",
    totalTransactions: 40,
    totalRevenue: "1,600",
    totalPercentage: "10%",
    logo: "/images/all-img/affirm.png",
  },
  {
    id: crypto.randomUUID(),
    rank: 5,
    paymentMethod: "Klarna",
    totalTransactions: 20,
    totalRevenue: "800",
    totalPercentage: "3%",
    logo: "/images/all-img/klarna.png",
  },
];
