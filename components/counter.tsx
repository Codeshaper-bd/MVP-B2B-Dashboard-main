"use client";

import { cn } from "@/lib/utils";
import MinusIcon from "@/components/icons/MinusIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DollarIcon from "./icons/DollarIcon";

interface CounterProps {
  className?: string;
  value: { value: number; option: string };
  onChange: (value: { value: number; option: string }) => void;
  spending?: boolean;
}

function Counter({ className, value, onChange, spending }: CounterProps) {
  const handleIncrement = () => {
    onChange({ ...value, value: value.value + 1 });
  };

  const handleDecrement = () => {
    if (value.value > 0) {
      onChange({ ...value, value: value.value - 1 });
    }
  };

  return (
    <div
      className={cn("flex rounded-[8px] border border-default-200", className)}
    >
      <div className="flex flex-1 items-center border-r border-default-200 px-2">
        <div
          className="flex h-5 w-5 flex-none cursor-pointer items-center justify-center rounded-full bg-[#85888E]"
          onClick={handleDecrement}
        >
          <MinusIcon className="h-4 w-3 text-default-100" />
        </div>

        {spending ? (
          <div className="flex flex-1 items-center justify-center text-default-700">
            <div
              className={cn(
                "flex justify-end",
                value.value.toString().length < 5 ? "w-1/2" : "w-fit",
              )}
            >
              <DollarIcon className="-pr-[2px]" width={15} height={15} />
            </div>
            <div
              className={cn(
                value.value.toString().length < 8 ? "w-1/2" : "w-full",
              )}
            >
              <input
                type="number"
                className="w-full border-transparent bg-transparent text-default-700 focus:border-none focus:outline-none"
                value={value.value}
                onChange={(e) => {
                  onChange({ ...value, value: Number(e.target.value) });
                }}
              />
            </div>
          </div>
        ) : (
          <input
            type="number"
            className="w-full flex-1 border-transparent bg-transparent text-center text-default-700 focus:border-none focus:outline-none"
            value={value.value}
            onChange={(e) => {
              onChange({ ...value, value: Number(e.target.value) });
            }}
          />
        )}
        <div
          className="flex h-5 w-5 flex-none cursor-pointer items-center justify-center rounded-full bg-default-900"
          onClick={handleIncrement}
        >
          <PlusIcon className="h-3 w-3 text-default-100" />
        </div>
      </div>
      <div className="flex-none">
        <Select
          value={value.option}
          onValueChange={(option) => onChange({ ...value, option })}
        >
          <SelectTrigger className="w-[150px] rounded-l-none rounded-r-[8px] border-none bg-default-50 focus:ring-transparent data-[state=open]:ring-transparent">
            <SelectValue placeholder="More Than" />
          </SelectTrigger>
          <SelectContent className="border border-default-100 bg-default">
            <SelectItem className="mb-1" value="moreThan">
              More than
            </SelectItem>
            <SelectItem value="lessThan">Less than</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Counter;
