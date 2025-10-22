"use client";
import { useParams, useRouter } from "next/navigation";

import FoodSelectContent from "@/components/FoodSelectContent";
import type { TFoodCardProps } from "@/components/FoodSelectContent/FoodCardList/FoodCard";
import { CardTitle } from "@/components/ui/card";

export default function Menu() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();

  const onChange = (
    _: React.MouseEvent<HTMLDivElement>,
    item: TFoodCardProps | null | undefined,
  ) => {
    router.push(
      `/${locale}/inventory/bar-menu/${item?.categorySlug}/${item?.slug}`,
    );
  };

  return (
    <div>
      <CardTitle className="mb-4">Menu Summary</CardTitle>

      <FoodSelectContent
        className={"px-0"}
        onSelectFood={onChange}
        selectedFoodId={undefined}
        isNotInsideModal={true}
        gridClassName="w-full grid !grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4 p-2"
        skeletonClass="w-full grid !grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4 p-2"
      />
    </div>
  );
}
