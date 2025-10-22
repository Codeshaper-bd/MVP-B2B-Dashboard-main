export interface IFormInput {
  customerName: string;
  email: string;
  phoneNumber: string;
  customerId: string;
  gender: "male" | "female";
  address?: string;
  dateOfBirth: Date;
}
export interface IOptionType {
  value: string;
  label: string;
}
