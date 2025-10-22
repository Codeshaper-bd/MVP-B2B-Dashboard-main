import ServiceCard, {
  type TServiceCardProps,
} from "@/app/[locale]/(protected)/social/event/components/view-analytics/ServiceCard";
import BoxClosedIcon from "@/components/icons/BoxClosedIcon";
import NetworkBarIcon from "@/components/icons/NetworkBarIcon";
import NotificationTextIcon from "@/components/icons/NotificationTextIcon";

const inventoryServices: TServiceCardProps[] = [
  {
    id: crypto.randomUUID(),
    title: "Inventory Tracking",
    description:
      "Keep a real-time overview of your stock levels and ensure efficient inventory management.",
    icon: <BoxClosedIcon className="size-8" />,
    iconShapeColor: "blue-2",
  },
  {
    id: crypto.randomUUID(),
    title: "Power Notifications",
    description:
      "Receive timely alerts when inventory levels drop below your predefined thresholds to prevent stockouts.",
    icon: <NotificationTextIcon className="size-8" />,
    iconShapeColor: "orange",
  },
  {
    id: crypto.randomUUID(),
    title: "Analytics",
    description:
      "Analyze inventory trends and data to make informed decisions and optimize your stock management.",
    icon: <NetworkBarIcon className="size-8 text-[#E9D7FE]" />,
    iconShapeColor: "green-2",
  },
];
function InventoryServices() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {inventoryServices?.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  );
}

export default InventoryServices;
