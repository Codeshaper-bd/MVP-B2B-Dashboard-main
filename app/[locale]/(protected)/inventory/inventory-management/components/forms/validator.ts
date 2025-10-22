import * as Yup from "yup";

export const barStockFormSchema = Yup.object({
  currentStock: Yup.number()
    .typeError("Stock must be a number")
    .required("Stock is required")
    .moreThan(0, "Stock must be greater than 0"),
});
