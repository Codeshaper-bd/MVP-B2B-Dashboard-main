import { type TTicketFormType } from "./types";

export const initialTicketFormValues: TTicketFormType = {
  eventId: -1,
  name: "",
  price: 0,
  maxQty: 0,
  isPrivate: false,
  isEditMode: false,
  type: undefined,
  startDate: undefined,
  endDate: undefined,
  maxTicketsPerCustomer: 1,
  // Auto Release
  isAutoRelease: false,
};
