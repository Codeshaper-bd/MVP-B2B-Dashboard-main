import type { TPromoter } from "@/store/api/promoters/promoters.types";

export interface IShowListOfEventsModalProps {
  promoter: TPromoter | null;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export type TTabContentProps = {
  promoter: TPromoter | null;
  setTab: React.Dispatch<React.SetStateAction<TEventModalType>>;
};
export type TEventModalType = "list" | "assign";
