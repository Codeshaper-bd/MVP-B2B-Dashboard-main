export type ICustomerFormType = {
  customerName: string;
  email: string;
  phoneNumber: string;
  gender: "male" | "female";
  address?: string;
};
