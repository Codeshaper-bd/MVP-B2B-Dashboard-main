import Image from "next/image";

import type { TBarMenuItem } from "@/store/api/bar-menu-item/bar-menu-item.types";
import { useRouter } from "@/components/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function ProductCard({
  item,
  pageSlug,
}: {
  item: TBarMenuItem;
  pageSlug: string;
}) {
  const {
    name,
    subTitle,
    price = 0,
    media,
    // currentStock,
    volume = 0,
    slug,
    unit,
    type,
  } = item;
  const router = useRouter();

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute bottom-9 right-2 z-10 h-[250px] w-[80px]">
        <Image
          src={media?.[0]?.url || "/assets/placeholders/product-background.png"}
          alt={name}
          width={80}
          height={280}
          className="h-full w-full object-contain"
        />
      </div>

      <Image
        src={
          type === "ALCOHOLIC"
            ? "/images/all-img/bg-alcoholic.png"
            : "/images/all-img/bg-non-alcoholic.png"
        }
        alt={name}
        layout="fill"
      />

      <CardContent
        className="group relative cursor-pointer"
        onClick={() => router.push(`./${pageSlug}/${item?.slug}`)}
      >
        <div className="relative min-h-[290px]">
          <div className="max-w-[70%] space-y-4">
            <div className="relative pt-5">
              {/* {currentStock < 5 && (
                <div className="absolute start-0 top-5 inline-flex items-center gap-1 rounded-md bg-[#F04438] p-1 px-1.5 text-xs font-medium text-[#F5F5F6]">
                  <span className="block size-1.5 rounded-full bg-foreground"></span>
                  Low stock
                </div>
              )} */}

              <div className="max-w-[200px] space-y-2 pt-11">
                <h3 className="text-2xl font-semibold uppercase text-foreground group-hover:text-primary">
                  {name}
                </h3>
                <p className="mt-2 font-medium text-primary">{subTitle}</p>
              </div>
            </div>

            <p className="mt-1 text-xl font-medium text-foreground">
              {volume}
              {unit}
            </p>
          </div>

          {/* <div className="absolute right-0 top-0 h-[250px] min-w-[130px]">
            <Image
              src={media?.[1]?.url || "/assets/all/product1.png"}
              alt={name}
              width={131}
              height={250}
              className="object-fit h-full w-full rounded-t-lg"
            />
          </div> */}
        </div>
      </CardContent>

      <CardFooter className="absolute bottom-0 z-50 w-full bg-[#293445] py-3">
        <div className="flex w-full items-end text-default-foreground">
          <div className="flex flex-1 flex-col">
            {/* <span className="text-sm font-medium text-foreground">Stock</span>
            <span className="text-base font-semibold">{currentStock}2</span> */}
          </div>
          <div className="flex items-end gap-4 self-end">
            <span className="font-semibold text-primary">${price}</span>
            {/* <span className="text-2xl font-semibold text-foreground line-through">
              ${purchasePrice}
            </span> */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
