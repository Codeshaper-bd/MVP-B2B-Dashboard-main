import CalendarIcon from "@/components/icons/CalendarIcon";
import ChooseTemplateIcon from "@/components/icons/ChooseTemplateIcon";
import EditPenIcon from "@/components/icons/EditPenIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import ImageIcon from "@/components/icons/ImageIcon";
import ThemeIcon from "@/components/icons/ThemeIcon";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

import type { StepperItemProps } from "./types";

export const steps: StepperItemProps[] = [
  { label: "Select Theme", icon: <ThemeIcon className="h-7 w-7" /> },
  { label: "Event Information", icon: <CalendarIcon className="h-7 w-7" /> },
  {
    label: "Choose a Template",
    icon: <ChooseTemplateIcon className="h-7 w-7" />,
  },
  { label: "Generated Images", icon: <ImageIcon className="h-7 w-7" /> },
  { label: "Edit Images", icon: <EditPenIcon className="h-7 w-7" /> },
  { label: "Post Preview", icon: <EyeIcon className="h-7 w-7" /> },
];
// ChooseTemplateIcon
export const eventTypeOptions: IOption[] = [
  {
    label: "Chirstmas",
    value: "Chirstmas",
  },
  {
    label: "Halloween",
    value: "Halloween",
  },
  {
    label: "New Year",
    value: "New Year",
  },
  {
    label: "Valentine's Day",
    value: "Valentine's Day",
  },
  {
    label: "Easter",
    value: "Easter",
  },
  {
    label: "Thanksgiving",
    value: "Thanksgiving",
  },
  {
    label: "Independence Day",
    value: "Independence Day",
  },
  {
    label: "Birthday",
    value: "Birthday",
  },
  {
    label: "Wedding",
    value: "Wedding",
  },
  {
    label: "Anniversary",
    value: "Anniversary",
  },
  {
    label: "Baby Shower",
    value: "Baby Shower",
  },
  {
    label: "Graduation",
    value: "Graduation",
  },
  {
    label: "Prom",
    value: "Prom",
  },
  {
    label: "Retirement",
    value: "Retirement",
  },
  {
    label: "House Warming",
    value: "House Warming",
  },
  {
    label: "Farewell",
    value: "Farewell",
  },
  {
    label: "Engagement",
    value: "Engagement",
  },
  {
    label: "Bachelor Party",
    value: "Bachelor Party",
  },
  {
    label: "Bachelorette Party",
    value: "Bachelorette Party",
  },
  {
    label: "Reunion",
    value: "Reunion",
  },
  {
    label: "Fundraiser",
    value: "Fundraiser",
  },
  {
    label: "Concert",
    value: "Concert",
  },
  {
    label: "Festival",
    value: "Festival",
  },
  {
    label: "Conference",
    value: "Conference",
  },
  {
    label: "Expo",
    value: "Expo",
  },
  {
    label: "Convention",
    value: "Convention",
  },
  {
    label: "Trade Show",
    value: "Trade Show",
  },
  {
    label: "Seminar",
    value: "Seminar",
  },
  {
    label: "Workshop",
    value: "Workshop",
  },
];

export const colorOptions: string[] = [
  "#E93A7D",
  "#FDB022",
  "#9E77ED",
  "#47CD89",
  "#2E90FA",
  "#717BBC",
];
