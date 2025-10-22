import type { TGetAnEmployeeActivityData } from "./../store/api/employees-logs/employees-log.types";

export function getActivityLink(activity: TGetAnEmployeeActivityData): string {
  if (
    !activity?.subjectType ||
    !activity?.properties ||
    activity.event.includes("delete")
  ) {
    return "#";
  }

  switch (activity.subjectType) {
    case "InventoryItem":
      return `/en/inventory/inventory-management/${activity.properties.type?.toLowerCase()}/${activity.properties.itemSlug}`;
    case "EmployeeItem":
      return `/en/organization/employees/view-employees/${activity.properties.itemId}`;
    default:
      return "#";
  }
}
