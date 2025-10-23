import { PlusIcon as PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

const denominations = {
  COINS: ["$0.01", "$0.05", "$0.10"],
  BILLS: ["$1", "$2", "$5", "$10", "$20"],
};

const sharedRowClasses =
  "col-span-12 grid grid-cols-12 border-b border-default-100 py-2.5 px-5";
const inputClass = "h-fit w-[104px] p-2";

function Row({ label }: { label: string }) {
  return (
    <div className={sharedRowClasses}>
      <div className="col-span-6 flex items-center">{label}</div>
      <div className="col-span-3">
        <Input className={inputClass} value={0} />
      </div>
      <div className="col-span-3 flex items-center">-</div>
    </div>
  );
}

function AdminChecklistTable() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="mt-4 min-w-[600px] space-y-2">
        <div className="grid grid-cols-12 rounded-[8px] bg-default-100 px-5 py-2.5 text-xs font-medium text-default-700">
          <div className="col-span-6">Denomination</div>
          <div className="col-span-3">Quantity</div>
          <div className="col-span-3">Subtotal</div>
        </div>

        <div className="grid grid-cols-12 gap-2.5 rounded-[8px] bg-default py-2.5 text-xs font-medium text-default-700">
          {Object.entries(denominations).map(([section, values]) => (
            <div key={section} className="col-span-12">
              <div className="px-5 py-3.5">{section}</div>
              {values.map((value) => (
                <Row key={value} label={value} />
              ))}
            </div>
          ))}
          <div className="col-span-12">
            <div className="border-b border-default-100 px-5 py-3.5">Total</div>
            <div className="px-5 py-3.5">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    color="secondary"
                    size="lg"
                    className="bg-default-50 !px-3"
                    type="button"
                  >
                    <PlusIcon className="me-1 size-4" /> Add Denomination
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[320px] bg-default-50 px-3.5 py-1 text-default-700"
                  align="end"
                >
                  <ScrollArea className="max-h-[600px]">
                    <div className="space-y-3 py-4">
                      <div>Coins</div>
                      {denominations.COINS.map((coin, idx) => (
                        <Label
                          key={coin}
                          htmlFor={`coin${idx}`}
                          className="flex w-full cursor-pointer items-center justify-between gap-4 text-base font-normal text-default-700"
                        >
                          <span>{coin}</span>
                          <Checkbox id={`coin${idx}`} checked={false} />
                        </Label>
                      ))}
                      <div>Bills</div>
                      {denominations.BILLS.map((bills, idx) => (
                        <Label
                          key={bills}
                          htmlFor={`bills${idx}`}
                          className="flex w-full cursor-pointer items-center justify-between gap-4 text-base font-normal text-default-700"
                        >
                          <span>{bills}</span>
                          <Checkbox id={`bills${idx}`} checked={true} />
                        </Label>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminChecklistTable;
