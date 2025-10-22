import Image from "next/image";

import type { TNullish } from "@/store/api/common-api-types";

import Counter from "./counter";

interface IAddonItemProps {
  icon: string | TNullish;
  title: string;
  price: number;
  countAddon: number;
}
function AddonItem({ icon, title, price, countAddon }: IAddonItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <div className="flex-none">
            <Image width={24} height={24} src={icon || ""} alt="icon" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-medium text-default-1000">{title}</h3>
            <p className="text-sm font-medium text-default-1000/50">${price}</p>
          </div>
        </div>
      </div>

      <div className="flex-none">
        <Counter count={countAddon} />
      </div>
    </div>
  );
}

export default AddonItem;
