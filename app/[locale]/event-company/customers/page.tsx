"use client";
import { redirect } from "@/components/navigation";

function CustomersPage() {
  redirect("/event-company/customers/customer-lookup");
  return null;
}

export default CustomersPage;
