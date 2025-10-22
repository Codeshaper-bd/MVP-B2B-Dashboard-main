import BarChartIcon from "@/components/icons/BarChartIcon";
import UserCircle2Icon from "@/components/icons/UserCircle2Icon";
import UserCircleIcon from "@/components/icons/UserCircleIcon";
import ChecklistCard, {
  type ChecklistCardProps,
} from "@/components/modules/employees/ChecklistCard";

const data: ChecklistCardProps[] = [
  {
    icon: <UserCircleIcon className="size-7 text-white" />,
    iconColor: "#EAAA08",
    title: "Configure Roles",
    description:
      "Set and customize employee roles to manage access rights and responsibilities within your organization.",
    link: "./employees/configure-roles",
    hasArrow: true,
  },
  {
    icon: <UserCircle2Icon className="size-7 text-white" />,
    iconColor: "#DD2590",
    title: "View All Employees",
    description:
      "View and manage all your employees' information from one location for efficient oversight.",
    link: "./employees/view-employees",
    hasArrow: true,
  },
  {
    icon: <BarChartIcon className="size-7 text-white" />,
    iconColor: "#1570EF",
    title: "View Employment Analytics",
    description:
      "Analyze employee performance in detail through visual data to make better decisions based on performance.",
    link: "./employees/view-employment-analytics",
    hasArrow: true,
  },
];
function LinkCards() {
  return (
    <div className="py-6">
      <h2 className="text-center text-2xl font-semibold text-white">
        Configure
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {data.map((item, index) => (
          <ChecklistCard
            key={index}
            icon={item.icon}
            iconColor={item.iconColor}
            title={item.title}
            description={item.description}
            link={item.link}
            hasArrow={item.hasArrow}
          />
        ))}
      </div>
    </div>
  );
}

export default LinkCards;
