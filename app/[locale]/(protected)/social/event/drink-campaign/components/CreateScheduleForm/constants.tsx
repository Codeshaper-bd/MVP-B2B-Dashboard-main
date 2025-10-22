import ChooseTemplateIcon from "@/components/icons/ChooseTemplateIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import GlobeIcon from "@/components/icons/GlobeIcon";
import ImageIcon from "@/components/icons/ImageIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

import type { StepperItemProps } from "./types";

export const steps: StepperItemProps[] = [
  { label: "Drink Information", icon: <InfoIcon className="h-7 w-7" /> },
  {
    label: "Choose a Template",
    icon: <ChooseTemplateIcon className="h-7 w-7" />,
  },
  { label: "Image Generation", icon: <ImageIcon className="h-7 w-7" /> },
  { label: "Select Channel", icon: <GlobeIcon className="h-7 w-7" /> },
  { label: "Preview", icon: <EyeIcon className="h-7 w-7" /> },
];

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
