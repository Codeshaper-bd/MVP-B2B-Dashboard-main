import AlCoholicIcon from "@/components/icons/AlCoholicIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import NonAlcoholicIcon from "@/components/icons/NonAlcoholicIcon";

import QuickLinksCard, { type IQuickLinksCardProps } from "./QuickLinksCard";

const quickLinksCardData: IQuickLinksCardProps[] = [
  {
    id: crypto.randomUUID(),
    title: "Alcoholic Inventory",
    icon: <AlCoholicIcon className="size-6 text-foreground" />,
    link: "/en/inventory/inventory-management/alcoholic",
    type: "ALCOHOLIC",
  },
  {
    id: crypto.randomUUID(),
    title: "Non-Alcoholic Inventory",
    icon: <NonAlcoholicIcon className="size-6 text-foreground" />,
    link: "/en/inventory/inventory-management/non-alcoholic",
    type: "NON_ALCOHOLIC",
  },
  {
    id: crypto.randomUUID(),
    title: "Transfer History",
    icon: <ClockIcon className="size-6 text-foreground" />,
    link: "/en/inventory/inventory-management/transfer/transfer-history",
    type: "TRANSFER_HISTORY",
  },
];

function QuickLinksCardList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {quickLinksCardData.map((card) => (
        <QuickLinksCard key={card.id} {...card} />
      ))}
    </div>
  );
}

export default QuickLinksCardList;
