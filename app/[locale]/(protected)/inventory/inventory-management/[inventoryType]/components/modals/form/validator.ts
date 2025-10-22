import * as Yup from "yup";

// Individual shipment validation schema
const shipmentSchema = Yup.object().shape({
  // selectedChildItemId: Yup.number()
  //   .typeError("Please select a volume")
  //   .required("Please select a volume")
  //   .positive("Please select a volume"),

  unitReceived: Yup.number().when("$soldBy", {
    is: "VOLUME",
    then: (schema) =>
      schema
        .typeError("Units received must be a number")
        .required("Units received is required")
        .moreThan(0, "Units received must be greater than 0"),
    otherwise: (schema) => schema.optional().notRequired(),
  }),

  casesReceived: Yup.number().when("$soldBy", {
    is: "UNIT",
    then: (schema) =>
      schema
        .typeError("Cases received must be a number")
        .required("Cases received is required")
        .moreThan(0, "Cases received must be greater than 0"),
    otherwise: (schema) => schema.optional().notRequired(),
  }),

  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .moreThan(0, "Price must be greater than 0"),

  currentStock: Yup.number().optional().notRequired(),
  unitPerCase: Yup.number().optional().notRequired(),
});

export const shipmentFormSchema = Yup.object().shape({
  soldBy: Yup.string().optional().notRequired(),
  currentStock: Yup.number().optional().notRequired(),
  unitReceived: Yup.number().optional().notRequired(),
  casesReceived: Yup.number().optional().notRequired(),
  unitPerCase: Yup.number().optional().notRequired(),
  price: Yup.number().optional().notRequired(),

  shipments: Yup.array()
    .of(shipmentSchema)
    .min(1, "At least one shipment is required")
    .required("Shipments are required"),
});
