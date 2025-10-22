import type { TDataProps } from "./columns";

export const data: TDataProps[] = [
  {
    id: crypto.randomUUID(),
    name: "Dimas Ariyanto",
    entryType: "Ticket - Early bird",
    sex: "Male",
    time: "2:55 PM",
    numberOfTickets: 12345,
  },
  {
    id: crypto.randomUUID(),
    name: "Jane Doe",
    entryType: "Ticket - Regular",
    sex: "Female",
    time: "3:10 PM",
    numberOfTickets: 67890,
  },
  {
    id: crypto.randomUUID(),
    name: "John Smith",
    entryType: "Ticket - VIP",
    sex: "Male",
    time: "4:00 PM",
    numberOfTickets: 54321,
  },
  {
    id: crypto.randomUUID(),
    name: "Alice Johnson",
    entryType: "Ticket - Early bird",
    sex: "Female",
    time: "1:30 PM",
    numberOfTickets: 98765,
  },
  {
    id: crypto.randomUUID(),
    name: "Bob Brown",
    entryType: "Ticket - Regular",
    sex: "Other",
    time: "5:45 PM",
    numberOfTickets: 11223,
  },
  {
    id: crypto.randomUUID(),
    name: "Charlie Davis",
    entryType: "Ticket - VIP",
    sex: "Male",
    time: "6:15 PM",
    numberOfTickets: 33445,
  },
];
