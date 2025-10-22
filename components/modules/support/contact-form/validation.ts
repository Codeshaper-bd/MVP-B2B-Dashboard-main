import * as Yup from "yup";

import type {
  TSupportTicketPriority,
  TSupportTicketSubjectType,
  TSupportTicketType,
} from "@/store/api/support-tickets/support-tickets.types";

const contactFormValidationSchema = Yup.object().shape({
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long"),
  subject: Yup.string<TSupportTicketSubjectType>().required(
    "Subject is required",
  ),
  tags: Yup.array().required("Tags are required"),
  type: Yup.string<TSupportTicketType>().required("Type is required"),
  priority: Yup.string<TSupportTicketPriority>().required(
    "Priority is required",
  ),
});

export default contactFormValidationSchema;
