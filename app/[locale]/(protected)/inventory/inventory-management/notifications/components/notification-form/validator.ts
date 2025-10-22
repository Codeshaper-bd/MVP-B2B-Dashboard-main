import * as Yup from "yup";

export const notificationFormValidationSchema = Yup.object().shape({
  thresholds: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number()
          .required("Threshold value is required")
          .min(1, "Threshold value must be greater than 0"),
      }),
    )
    .min(1, "At least one threshold value is required")
    .required("Thresholds are required")
    .test("unique-thresholds", "", function (values) {
      if (!values) {
        return true;
      }

      const duplicateIndexes: number[] = [];
      const valueMap: Record<number, number> = {};

      values.forEach((item, index) => {
        if (item && item.value !== undefined) {
          if (valueMap[item.value] !== undefined) {
            duplicateIndexes.push(index);
            duplicateIndexes.push(valueMap[item.value]);
          } else {
            valueMap[item.value] = index;
          }
        }
      });

      const uniqueDuplicateIndexes = Array.from(new Set(duplicateIndexes));

      if (uniqueDuplicateIndexes.length > 0) {
        return this.createError({
          path: `${this.path}.${uniqueDuplicateIndexes[0]}.value`,
          message: `Threshold value at field(s) ${uniqueDuplicateIndexes
            .map((index) => index + 1)
            .join(", ")} must be unique`,
        });
      }

      return true;
    }),

  notify_email: Yup.boolean().required("Notify Email is required"),
  notify_phone: Yup.boolean().required("Notify Phone is required"),

  emails: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string()
          .email("Invalid email address")
          .required("Email is required")
          .nullable(),
      }),
    )
    .test("unique", "Duplicate email addresses are not allowed", (emails) => {
      const emailSet = new Set(emails?.map((email) => email.value));
      return emailSet.size === emails?.length;
    })
    .when("notify_email", {
      is: true,
      then: (schema) =>
        schema.min(
          1,
          "At least one email is required when Notify Email is true",
        ),
      otherwise: (schema) => schema.optional(),
    }),

  phone_numbers: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string().required("Phone number is required").nullable(),
      }),
    )
    .test(
      "unique",
      "Duplicate phone numbers are not allowed",
      (phoneNumbers) => {
        const phoneNumberSet = new Set(
          phoneNumbers?.map((phone) => phone.value),
        );
        return phoneNumberSet.size === phoneNumbers?.length;
      },
    )
    .when("notify_phone", {
      is: true,
      then: (schema) =>
        schema.min(
          1,
          "At least one phone number is required when Notify Phone is true",
        ),
      otherwise: (schema) => schema.optional(),
    })
    .optional(),
});
