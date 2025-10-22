import EyeIcon from "@/components/icons/EyeIcon";
import InfoIcon from "@/components/icons/InfoIcon";
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
  { label: "Review", icon: <EyeIcon className="h-5 w-5 md:h-7 md:w-7" /> },
];
