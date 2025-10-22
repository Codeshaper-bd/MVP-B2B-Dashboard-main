"use client";
import { redirect } from "@/components/navigation";

function CustomersPage() {
  redirect("/customers/customer-lookup");
  return null;
}

export default CustomersPage;
