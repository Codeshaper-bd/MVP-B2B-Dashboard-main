import type { TCreateBankDetailsArgs } from "@/store/api/bank-details/bank-details.types";

export const initialState: TCreateBankDetailsArgs = {
  bankAccountNumber: "",
  transitNumber: "",
  institutionNumber: "",
  bankName: "",
  country: "",
  province: "",
  postalCode: "",
  email: "",
};
