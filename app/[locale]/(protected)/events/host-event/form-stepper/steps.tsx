import AiMagicIcon from "@/components/icons/AiMagicIcon";
import CodeDiscountIcon from "@/components/icons/CodeDiscountIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import { InfoIcon as InfoIcon } from "@/components/icons";
import TableIcon from "@/components/icons/TableIcon";
import TicketIcon from "@/components/icons/TicketIcon";

export type StepperItemProps = {
  label: string;
  icon: React.ReactNode;
};

export const steps: StepperItemProps[] = [
  {
    label: "Event Details",
    icon: <InfoIcon className="h-5 w-5 md:h-7 md:w-7" />,
  },
  {
    label: "Ticketing",
    icon: <TicketIcon className="h-5 w-5 md:h-7 md:w-7" />,
  },
  { label: "Table", icon: <TableIcon className="h-5 w-5 md:h-7 md:w-7" /> },
  {
    label: "Challenges",
    icon: <AiMagicIcon className="h-5 w-5 md:h-7 md:w-7" />,
  },
  {
    label: "Promotions",
    icon: <CodeDiscountIcon className="h-5 w-5 md:h-7 md:w-7" />,
  },
  { label: "Review", icon: <EyeIcon className="h-5 w-5 md:h-7 md:w-7" /> },
];
