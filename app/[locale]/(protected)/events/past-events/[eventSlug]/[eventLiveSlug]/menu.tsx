"use client";

import FoodSelectContent from "@/components/FoodSelectContent";
import type { TFoodCardProps } from "@/components/FoodSelectContent/FoodCardList/FoodCard";
import { useRouter } from "@/components/navigation";
import { CardTitle } from "@/components/ui/card";

export default function Menu() {
  const router = useRouter();

  const onChange = (
    _: React.MouseEvent<HTMLDivElement>,
    item: TFoodCardProps | null | undefined,
  ) => {
    router.push(`/inventory/bar-menu/${item?.categorySlug}/${item?.slug}`);
  };

  return (
    <div>
      <CardTitle className="mb-4">Menu Summary</CardTitle>

      <FoodSelectContent
        className={"px-0"}
        onSelectFood={onChange}
        selectedFoodId={undefined}
        gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      />
    </div>
  );
}
