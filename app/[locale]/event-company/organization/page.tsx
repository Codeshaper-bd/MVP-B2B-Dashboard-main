"use client";
import { redirect } from "@/components/navigation";
function OrganizationPage() {
  redirect("./organization/employees");
  return null;
}

export default OrganizationPage;
