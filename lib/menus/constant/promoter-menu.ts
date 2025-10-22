import HomeIcon from "@/components/icons/HomeIcon";
import OrganizationIcon from "@/components/icons/sidebar/OrganizationIcon";

export const promoterMenu = (pathname: string) => [
  {
    menusName: "promoterGroup",
    menusGroup: [
      {
        groupLabel: "PROMOTER PORTAL",
        id: "promoterGroup",
        menus: [
          {
            id: "clubs",
            href: "/promoter/clubs",
            label: "Nightclubs",
            active: pathname.includes("/promoter/clubs"),
            icon: OrganizationIcon,
            submenus: [],
          },
          {
            id: "promoter-events",
            href: "/promoter/upcoming-event",
            label: "Events",
            active: pathname.includes("/promoter/upcoming-event"),
            icon: HomeIcon,
            submenus: [
              {
                href: "/promoter/upcoming-event",
                label: "Upcoming Events",
                active: pathname.includes("/promoter/upcoming-event"),
                icon: HomeIcon,
                children: [],
              },
              {
                href: "/promoter/past-event",
                label: "Past Events",
                active: pathname.includes("/promoter/past-event"),
                icon: HomeIcon,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];
