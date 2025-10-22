import { cn } from "@/lib/utils";

import ItemCard from "./ItemCard";

export interface IItemCardListProps {
  children?: React.ReactNode;
  className?: string;
}

function ItemCardList({ children, className }: IItemCardListProps) {
  return (
    <div
      className={cn(
        "grid gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

ItemCardList.ItemCard = ItemCard;

export default ItemCardList;
