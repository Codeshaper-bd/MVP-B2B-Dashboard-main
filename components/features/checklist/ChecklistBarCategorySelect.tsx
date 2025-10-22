import Image from "next/image";

import type { TNullish } from "@/store/api/common-api-types";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BarOption = {
  value: string;
  label: string;
  image?: string;
};

interface BarCategorySelectProps {
  value?: string | TNullish;
  onChange: (value: string) => void;
  options?: BarOption[];
  placeholder?: string;
  className?: string;
}

const DEFAULT_OPTIONS: BarOption[] = [
  {
    value: "mainbar",
    label: "Main Bar",
    image: "/assets/all/mainbar.png",
  },
  {
    value: "upperbar",
    label: "Upper Bar",
    image: "/assets/all/upperbar.png",
  },
  {
    value: "lowerbar",
    label: "Lower Bar",
    image: "/assets/all/lowerbar.png",
  },
  {
    value: "cover",
    label: "Cover",
  },
  {
    value: "bottleservice",
    label: "Bottle Service",
  },
];

function ChecklistBarCategorySelect({
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  placeholder = "Select category",
  className = "",
}: BarCategorySelectProps) {
  return (
    <Select value={value ?? ""} onValueChange={onChange}>
      <SelectTrigger
        className={`w-auto bg-default-50 md:min-w-60 ${className}`}
      >
        <SelectValue className="text-primary" placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-default">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.image ? (
              <div className="flex items-center gap-3">
                <Image
                  src={option.image}
                  alt={`${option.label} Image`}
                  width={32}
                  height={24}
                  className="rounded-[3px]"
                />
                <span className="min-w-auto text-start md:min-w-[154px]">
                  {option.label}
                </span>
                <Badge className="statusOrange">Pending</Badge>
              </div>
            ) : (
              option.label
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ChecklistBarCategorySelect;
