import HomeIcon from "@/components/icons/HomeIcon";
import CustomerIcon from "@/components/icons/sidebar/CustomerIcon";
import DashboardBarIcon from "@/components/icons/sidebar/DashboardBarIcon";
import DashboardGridIcon from "@/components/icons/sidebar/DashboardGridIcon";
import DashboardMeterIcon from "@/components/icons/sidebar/DashboardMeterIcon";
import DashboardOrderHistoryIcon from "@/components/icons/sidebar/DashboardOrderHistoryIcon";
import DashboardReportIcon from "@/components/icons/sidebar/DashboardReportIcon";
import DashboardWindowIcon from "@/components/icons/sidebar/DashboardWindowIcon";
import EventIcon from "@/components/icons/sidebar/EventIcon";
import InventoryIcon from "@/components/icons/sidebar/InventoryIcon";
import OrganizationIcon from "@/components/icons/sidebar/OrganizationIcon";
import UserIcon from "@/components/icons/UserIcon";

export const nightClubMenu = (pathname: string) => [
  {
    menusName: "eventManagement",
    menusGroup: [
      {
        groupLabel: "Event Management",
        id: "dashboard-group",
        menus: [
          {
            id: "dashboard",
            href: "/dashboard/dashboard",
            label: "Dashboard",
            searchLabel: "Event Dashboard",
            active: pathname.includes("/dashboard"),
            icon: HomeIcon,
            submenus: [
              {
                href: "/dashboard/dashboard",
                label: "Dashboard",
                searchLabel: "Event Dashboard",
                active:
                  pathname.includes("/dashboard/dashboard") ||
                  pathname.includes("/dashboard/todo-list"),
                icon: "",
                children: [],
              },
              {
                href: "/dashboard/sales-revenue",
                label: "Sales Revenue",
                active: pathname.startsWith("/dashboard/sales-revenue"),
                icon: "",
                children: [],
              },
              {
                href: "/dashboard/challenges",
                label: "Challenges",
                active: pathname.startsWith("/dashboard/challenges"),
                icon: "",
                children: [],
              },
              {
                href: "/dashboard/promotions",
                label: "Promotions",
                active: pathname.startsWith("/dashboard/promotions"),
                icon: "",
                children: [],
              },
            ],
          },

          {
            id: "events",
            href: "/events/host-event",
            searchLabel: "Host an Event",
            label: "Events",
            active: pathname.includes("/events"),
            icon: EventIcon,
            submenus: [
              {
                href: "/events/host-event",
                label: "Host an Event",
                active: pathname === "/events/host-event",
                icon: "",
                children: [],
              },
              {
                href: "/events/upcoming-events",
                label: "Upcoming Events",
                active: pathname.startsWith("/events/upcoming-events"),
                icon: "",
                children: [],
              },
              {
                href: "/events/past-events",
                label: "Past Events",
                active: pathname.startsWith("/events/past-events"),
                icon: "",
                children: [],
              },
              {
                href: "/events/billing-and-account",
                label: "Billing & Account",
                active: pathname === "/events/billing-and-account",
                icon: "",
                children: [],
              },
            ],
          },
          {
            id: "customer",
            href: "/customers/customer-lookup",
            label: "Customer",
            active: pathname.includes("/customers"),
            icon: CustomerIcon,
            submenus: [
              {
                href: "/customers/customer-lookup",
                label: "Customer Lookup",
                active: pathname.startsWith("/customers/customer-lookup"),
                icon: "",
                children: [],
              },

              {
                href: "/customers/loyalty-program",
                label: "Loyalty Program",
                active: pathname === "/customers/loyalty-program",
                icon: "",
                children: [],
              },
              {
                href: "/customers/feedback",
                label: "Feedback",
                active: pathname === "/customers/feedback",
                icon: "",
                children: [],
              },
            ],
          },
          {
            id: "Organization",
            href: "/organization/checklist",
            label: "Organization",
            active: pathname.includes("/organization"),
            icon: OrganizationIcon,
            submenus: [
              {
                href: "/organization/checklist",
                label: "Checklist",
                active: pathname.startsWith("/organization/checklist"),
                icon: "",
                children: [],
              },
              {
                href: "/organization/employees",
                label: "Employees",
                active: pathname.startsWith("/organization/employees"),
                icon: "",
                children: [],
              },
              {
                href: "/organization/promoter-management",
                label: "Promoter",
                active: pathname === "/organization/promoter-management",
                icon: "",
                children: [],
              },
              {
                href: "/organization/bars",
                label: "Bars",
                active: pathname.includes("/organization/bars"),
                icon: "",
                children: [],
              },
              {
                href: "/organization/devices",
                label: "Devices",
                active: pathname === "/organization/devices",
                icon: "",
                children: [],
              },
              {
                href: "/organization/floor-plan",
                label: "Floor Plan",
                active: pathname === "/organization/floor-plan",
                icon: "",
                children: [],
              },
            ],
          },
        ],
      },

      {
        groupLabel: "Auto Social Media Management",
        id: "social-event",
        skip: true,
        menus: [
          {
            id: "social-event",
            href: "/social/event",
            label: "Dashboard",
            active: pathname.includes("/social"),
            icon: DashboardGridIcon,
            submenus: [],
          },
        ],
      },

      {
        groupLabel: "Inventory management & POS",
        id: "inventory-dashboard",
        skip: true,
        menus: [
          {
            id: "inventory-dashboard",
            href: "/inventory",
            label: "Inventory Management",
            searchLabel: "Inventory Dashboard",
            active: pathname.includes("/inventory"),
            icon: InventoryIcon,
            submenus: [],
          },
        ],
      },
    ],
  },

  {
    menusName: "/social",
    menusGroup: [
      {
        groupLabel: "Event Management",
        id: "event-dashboard",
        skip: true,
        menus: [
          {
            id: "event-dashboard",
            href: "/dashboard/dashboard",
            label: "Dashboard",
            searchLabel: "Event Dashboard",
            active: pathname.includes("/dashboard"),
            icon: DashboardWindowIcon,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "A.I Generated Campaigns",
        id: "social-dashboard",
        skip: true,
        menus: [
          {
            id: "social-event",
            href: "/social/event",
            label: "Main Menu",
            active: pathname.includes("/social/event"),
            icon: DashboardGridIcon,
            submenus: [],
          },
          {
            id: "social-accounts",
            href: "/social/my-accounts",
            label: "My Accounts",
            active: pathname.includes("/social/my-accounts"),
            icon: UserIcon,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Inventory management & POS",
        id: "inventory-dashboard",
        skip: true,
        menus: [
          {
            id: "inventory-dashboard",
            href: "/inventory",
            label: "Dashboard",
            searchLabel: "Inventory Dashboard",
            active: pathname.includes("/inventory"),
            icon: DashboardMeterIcon,
            submenus: [],
          },
        ],
      },
    ],
  },

  {
    menusName: "inventory_management",
    menusGroup: [
      {
        groupLabel: "Event Management",
        id: "event-dashboard",
        skip: true,
        menus: [
          {
            id: "event-dashboard",
            href: "/dashboard",
            label: "Dashboard",
            searchLabel: "Inventory Dashboard",
            active: pathname.includes("/dashboard"),
            icon: DashboardWindowIcon,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "A.I Generated Campaigns",
        id: "social-event",
        skip: true,
        menus: [
          {
            id: "social-event",
            href: "/social/event",
            label: "Main Menu",
            active: pathname.includes("/social"),
            icon: DashboardGridIcon,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Inventory management & POS",
        id: "inventory-dashboard",
        menus: [
          {
            id: "inventory-dashboard",
            href: "/inventory/inventory-management",
            label: "Inventory Management",
            active: pathname.includes("/inventory/inventory-management"),
            icon: InventoryIcon,
            submenus: [],
          },
          {
            id: "inventory-bar-menu",
            href: "/inventory/bar-menu",
            label: "Bar Menu",
            active: pathname.includes("/inventory/bar-menu"),
            icon: DashboardBarIcon,
            submenus: [],
          },
          {
            id: "inventory-sales-report",
            href: "/inventory/sales-report",
            label: "Sales Reports",
            active: pathname.includes("/inventory/sales-report"),
            icon: DashboardReportIcon,
            submenus: [],
          },
          {
            id: "inventory-order-history",
            href: "/inventory/order-history",
            label: "Order History ",
            active: pathname.includes("/inventory/order-history"),
            icon: DashboardOrderHistoryIcon,
            submenus: [],
          },
        ],
      },
    ],
  },
];
