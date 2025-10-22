import HomeIcon from "@/components/icons/HomeIcon";
import CustomerIcon from "@/components/icons/sidebar/CustomerIcon";
import EventIcon from "@/components/icons/sidebar/EventIcon";
import OrganizationIcon from "@/components/icons/sidebar/OrganizationIcon";

export const eventCompanyMenu = (pathname: string) => [
  {
    menusName: "eventManagement",
    menusGroup: [
      {
        groupLabel: "Event Management",
        id: "dashboard-group",
        menus: [
          {
            id: "dashboard",
            href: "/event-company/dashboard",
            label: "Dashboard",
            searchLabel: "Event Dashboard",
            active: pathname.includes("/dashboard"),
            icon: HomeIcon,
            submenus: [
              {
                href: "/event-company/dashboard/",
                label: "Dashboard",
                searchLabel: "Event dashboard",
                active:
                  pathname.includes("/event-company/dashboard") ||
                  pathname.includes("/event-company/dashboard/todo-list"),
                icon: "",
                children: [],
              },
              {
                href: "/event-company/sales-revenue",
                label: "Sales Revenue",
                searchLabel: "Event Sales Revenue",
                active: pathname.includes("/event-company/sales-revenue"),
                icon: "",
                children: [],
              },
            ],
          },
          {
            id: "events",
            href: "/event-company/events/host-event",
            searchLabel: "Host an Event",
            label: "Events",
            active: pathname.includes("/event"),
            icon: EventIcon,
            submenus: [
              {
                href: "/event-company/events/host-event",
                label: "Host an Event",
                active: pathname === "/event-company/events/host-event",
                icon: "",
                children: [],
              },
              {
                href: "/event-company/events/upcoming-events",
                label: "Upcoming Events",
                active: pathname.startsWith(
                  "/event-company/events/upcoming-events",
                ),
                icon: "",
                children: [],
              },
              {
                href: "/event-company/events/past-events",
                label: "Past Events",
                active: pathname.startsWith(
                  "/event-company/events/past-events",
                ),
                icon: "",
                children: [],
              },
              {
                href: "/event-company/events/billing-and-account",
                label: "Billing & Account",
                active:
                  pathname === "/event-company/events/billing-and-account",
                icon: "",
                children: [],
              },
            ],
          },
          {
            id: "customer",
            href: "/event-company/customers/customer-lookup",
            label: "Customer",
            active: pathname.includes("/customers"),
            icon: CustomerIcon,
            submenus: [
              {
                href: "/event-company/customers/customer-lookup",
                label: "Customer Lookup",
                active: pathname.startsWith(
                  "/event-company/customers/customer-lookup",
                ),
                icon: "",
                children: [],
              },

              {
                href: "/event-company/customers/loyalty-program",
                label: "Loyalty Program",
                active: pathname === "/event-company/customers/loyalty-program",
                icon: "",
                children: [],
              },
              {
                href: "/event-company/customers/feedback",
                label: "Feedback",
                active: pathname === "/event-company/customers/feedback",
                icon: "",
                children: [],
              },
            ],
          },
          {
            id: "organization",
            href: "/event-company/organization/employees",
            label: "Organization",
            active: pathname.includes("/organization"),
            icon: OrganizationIcon,
            submenus: [
              {
                href: "/event-company/organization/employees",
                label: "Employees",
                active: pathname.startsWith(
                  "/event-company/organization/employees",
                ),
                icon: "",
                children: [],
              },
              {
                href: "/event-company/organization/promoter-management",
                label: "Promoter",
                active:
                  pathname ===
                  "/event-company/organization/promoter-management",
                icon: "",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];
