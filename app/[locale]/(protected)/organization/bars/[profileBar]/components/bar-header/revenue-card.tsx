import { useState } from "react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import DollarRoundedIcon from "@/components/icons/DollarRoundedIcon";
import StarIcon from "@/components/icons/StarIcon";
import WineIcon from "@/components/icons/WineIcon";
import { Card, CardContent } from "@/components/ui/card";

import { useGetProfileBarSlug } from "../../hooks/useGetProfileBarSlug";
import TopTenDrinksDialog from "../modals/top-ten-drinks";
import TopTenEventsDialog from "../modals/top-ten-events";

export type TRevenueCard = {
  revenue: number;
  totalProductSold: number;
  stockQuantity: number;
  popularDrink: string;
  popularEvent: string;
  inventoryLastUpdate: string;
};
function RevenueCard({
  revenue,
  totalProductSold,
  stockQuantity,
  popularDrink,
  popularEvent,
  inventoryLastUpdate,
}: TRevenueCard) {
  const [openPopularDrinkDialog, setOpenPopularDrinkDialog] =
    useState<boolean>(false);
  const [openEventDialog, setOpenEventDialog] = useState<boolean>(false);
  const { barSlug } = useGetProfileBarSlug();

  return (
    <>
      <Card className="bg-secondary">
        <CardContent className="px-5 py-4">
          <ul className="space-y-4 text-default-600">
            <li className="flex flex-wrap items-center gap-2">
              <span className="flex flex-1 items-center gap-2 whitespace-nowrap">
                <CalenderIcon className="size-4" /> Inventory Last Updated:
              </span>
              <span className="flex-none text-default-700">
                {convertUTCToLocal({
                  utcDateTime: inventoryLastUpdate,
                  format: "DD/MM/YYYY",
                })}
              </span>
            </li>
            <li className="flex flex-wrap items-center gap-2">
              <span className="flex flex-1 items-center gap-2 whitespace-nowrap">
                <DollarRoundedIcon className="size-4" /> Revenue:
              </span>
              <span className="flex-none text-default-700"> ${revenue}</span>
            </li>

            <li className="flex flex-wrap items-center gap-2">
              <span className="flex flex-1 items-center gap-2 whitespace-nowrap">
                <WineIcon className="size-4" /> Products Sold:
              </span>
              <span className="flex-none text-default-700">
                {totalProductSold}
              </span>
            </li>

            {/* <li className="flex flex-wrap items-center gap-2">
              <span className="flex flex-1 items-center gap-2 whitespace-nowrap">
                <CubeIcon className="size-4" /> Inventory
              </span>
              <span className="flex-none text-default-700">
                {stockQuantity}% stock left
              </span>
            </li> */}

            <li className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="flex flex-1 cursor-pointer items-center gap-2 whitespace-nowrap underline"
                onClick={() => setOpenPopularDrinkDialog(true)}
              >
                <StarIcon className="size-4" /> Most Popular Drink
              </button>
              <span className="flex-none text-default-700">{popularDrink}</span>
            </li>

            <li className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="flex flex-1 cursor-pointer items-center gap-2 whitespace-nowrap underline"
                onClick={() => setOpenEventDialog(true)}
              >
                <StarIcon className="size-4" /> Most Popular Event
              </button>
              <span className="flex-none text-default-700">{popularEvent}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <TopTenDrinksDialog
        open={openPopularDrinkDialog}
        setOpen={setOpenPopularDrinkDialog}
        slug={barSlug}
      />

      <TopTenEventsDialog
        open={openEventDialog}
        setOpen={setOpenEventDialog}
        slug={barSlug}
      />
    </>
  );
}

export default RevenueCard;
