import type { TDataProps } from "./columns";

export const data: TDataProps[] = [
  {
    checklist: "1",
    task: "Check and close all beer taps",
    status: "done",
    note: "Make sure no taps are leaking or remain open to avoid wastage.",
    id: crypto.randomUUID(),
  },
  {
    checklist: "2",
    task: "Clean all surfaces and bar floors.",
    status: "",
    note: "Use appropriate cleaning solutions and ensure all accessible areas are thoroughly cleaned.",
    id: crypto.randomUUID(),
  },
  {
    checklist: "3",
    task: "Lock all cabinets and alcohol storage areas.",
    status: "done",
    note: "Couble check to make sure all cabinets are locked properly for security and theft prevention.",
    id: crypto.randomUUID(),
  },
  {
    checklist: "4",
    task: "Total Glassware Broken",
    status: "input",
    note: "Make sure all beverages sold have been entered into the system before closing the cashier.",
    id: crypto.randomUUID(),
  },
];
